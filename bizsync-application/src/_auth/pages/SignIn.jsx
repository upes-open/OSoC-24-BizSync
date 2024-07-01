import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

// Define the schema using Zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const SignIp = () => {
  const {
    register,
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
      <div className="border-[#27272a] border rounded-md p-8 flex flex-col lg:w-1/3 space-y-3">
        <p className="font-bold text-2xl">Sign In</p>
        <i className="text-[#a1a1aa]">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-purple-400">
            Sing Up
          </Link>{" "}
        </i>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <div>
            <p className="text-lg">Email</p>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-transparent border border-[#27272a] rounded-md py-3 px-2 outline-none focus:border-white transition-all"
              placeholder="abc@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <p className="text-lg">Password</p>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-transparent border border-[#27272a] rounded-md py-3 px-2 outline-none focus:border-white transition-all"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <i className="text-sm w-full text-right">
            <Link to="/forgot-password">Forgort Password?</Link>
          </i>
          <button className="w-full mt-3 bg-white hover:bg-purple-400 hover:text-white text-black py-2 px-4 rounded transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIp;
