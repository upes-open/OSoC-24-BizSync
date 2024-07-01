import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema using Zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const Otp = () => {
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRef = useRef([]);
  const {
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleOnChange = (idx, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];

    newOtp[idx] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && idx < 3 && inputRef.current[idx + 1]) {
      inputRef.current[idx + 1].focus();
    }
  };
  const handleKeyDown = (idx, e) => {
    if (
      e.key === "Backspace" &&
      !otp[idx] &&
      idx > 0 &&
      inputRef.current[idx - 1]
    ) {
      inputRef.current[idx - 1].focus();
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#09090b] text-white flex items-center justify-center fixed">
      <div className="border-[#27272a] border rounded-md p-8 flex flex-col lg:w-[450px] space-y-3 w-full mx-4">
        <p className="font-bold text-2xl">Enter OTP</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <div className="flex justify-between">
            {otp.map((val, idx) => (
              <input
                type="text"
                {...resetField("email")}
                ref={(input) => (inputRef.current[idx] = input)}
                onChange={(e) => handleOnChange(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                value={val}
                className="w-16 bg-transparent border border-[#27272a] rounded-md py-4 px-3 outline-none focus:border-white transition-all text-lg font-semibold text-center"
              />
            ))}
          </div>
          {!isOtpValid && <p className="text-red-500 text-sm">Invalid OTP</p>}

          <button className="w-full mt-3 bg-white hover:bg-purple-400 hover:text-white text-black py-2 px-4 rounded transition-all">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
