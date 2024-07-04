import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { z } from "zod";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const UserType = z.object({
  username: z.string().min(3).toLowerCase().trim(),
  email: z.string().toLowerCase().email().trim(),
  organization: z.string().toLowerCase().trim(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, organization, password } = req.body;

  const response = await validateData(username, email, organization, password);

  if (!response.success) throw new ApiError(400, "Invaild filed data");

  const validatedData = {
    username: response.data.username,
    email: response.data.email,
    organization: response.data.organization,
    password: response.data.password,
  };

  const existingUser = await User.findOne({
    $or: [{ username: validatedData.username }, { email: validatedData.email }],
  });

  if (existingUser) throw new ApiError(409, "User already exists");

  const user = await User.create({
    username: validatedData.username,
    email: validatedData.email,
    organization: validatedData.organization,
    password: validatedData.password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while creating user");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !username)
    throw new ApiError(400, "Username or password is required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "Logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "Unacuthorized request");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", options)
      .cookie("refreshToken", options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const sendRecoveryMail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is requred");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "Invaid credential");

  const { passwordResetToken } = generatePasswordResetToken(user._id);

  const resetUrl = `${process.env.CLIENT_REDIRECT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset</p>
      <p>Click this link to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await sendEmail(mailOptions);
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Recovery email sent successfully"));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    throw new ApiError(500, "Error sending recovery email");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword)
    throw new ApiError(400, "Token and new password are required");

  const decodedToken = jwt.verify(
    token,
    process.env.PASSOWRD_RESET_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) throw new ApiError(404, "User not found");

  const passwordValidation = UserType.shape.password.safeParse(newPassword);

  if (!passwordValidation.success) throw new ApiError(400, "Invaid password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const generatePasswordResetToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const passwordResetToken = user.generatePasswordResetToken();

    user.resetPasswordToken = passwordResetToken;
    await user.save({ validateBeforeSave: false });

    return { passwordResetToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const validateData = async (username, organization, email, password) => {
  const result = UserType.safeParse({
    username,
    email,
    organization,
    password,
  });
  if (!result.success) throw new ApiError(400, "All fields must be valid");
  return result;
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  sendRecoveryMail,
  changePassword,
};
