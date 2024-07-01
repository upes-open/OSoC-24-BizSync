import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema using Zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ResetPwd = () => {
  const {
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen min-h-screen bg-[#09090b] text-white flex items-center justify-center fixed">
      <div className="border-[#27272a] border rounded-md p-8 flex flex-col lg:w-[450px] space-y-3 w-full mx-4">
        <p className="font-bold text-2xl">Reset Password</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <div>
            <p className="text-lg">Email</p>
            <input
              type="email"
              {...resetField("email")}
              className="w-full bg-transparent border border-[#27272a] rounded-md py-3 px-2 outline-none focus:border-white transition-all"
              placeholder="abc@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button className="w-full mt-3 bg-white hover:bg-purple-400 hover:text-white text-black py-2 px-4 rounded transition-all">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
