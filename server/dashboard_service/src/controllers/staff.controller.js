import { Staff } from "../models/staff.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getStaff = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const staff = await Staff.find({
    user: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { staff }, "Fetched Successfully "));
});

const addStaff = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { name, contactInfo, position, roles } = req.body;

  if (!name || !contactInfo || !position || !roles)
    throw new ApiError(400, "Invalid fields");

  const existingStaff = await Staff.findOne({
    contactInfo: { email: contactInfo.email },
  });

  if (existingStaff) throw new ApiError(400, "Duplicate Staff");

  const staff = await Staff.create({
    name,
    contactInfo,
    roles,
    position,
    user: userId,
  });

  const savedStaff = await Staff.findOne({ _id: staff._id });

  if (!savedStaff)
    throw new ApiError(500, "Something went wrong while creating staff");

  return res
    .status(200)
    .json(new ApiResponse(200, { savedStaff }, "Staff creadted successfully"));
});

const updateStaff = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const staffId = req.params.id;

  const { name, roles, postion, contactInfo, status } = req.body;

  if (!staffId) throw new ApiError(404, "No staff id");

  const staff = await Staff.findOne({ _id: staffId, user: userId });
  if (!staff) throw new ApiError(404, "Staff not found");

  staffMember.name = name !== undefined ? name : staffMember.name;
  staffMember.position =
    position !== undefined ? position : staffMember.position;
  staffMember.contactInfo =
    contactInfo !== undefined ? contactInfo : staffMember.contactInfo;
  staffMember.status = status !== undefined ? status : staffMember.status;
  staffMember.roles = roles !== undefined ? roles : staffMember.roles;

  await staffMember.save();

  const updatedStaff = await await Staff.findOne({
    _id: staff._id,
    user: staff.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { updateStaff }, "Update success"));
});

export { getStaff, addStaff, updateStaff };
