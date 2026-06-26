import React, { useState } from "react";
import axios from "axios";
import { UserIcon, MailIcon, LockIcon, Apple } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  name: string;
  password: string | number;
};

const signUp = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });
      toast.success("Sign up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-zinc-900 text-zinc-100 border border-zinc-800",
        }}
      />
      <div className="w-full h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center font-sans">
        <div className="w-full max-w-md border border-zinc-800 bg-zinc-900/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Sign Up
            </h3>
            <p className="text-sm text-zinc-400 mt-1">Create a New Account</p>
          </div>

          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            {/* Name Input */}
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
              <UserIcon size={18} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder-zinc-600 font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
              <MailIcon size={18} className="text-zinc-500 shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder-zinc-600 font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
              <LockIcon size={18} className="text-zinc-500 shrink-0" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder-zinc-600 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-lg transition-all tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-6"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-zinc-800"></div>
              <span className="text-xs text-zinc-500 font-semibold">
                or continue with
              </span>
              <div className="flex-1 h-px bg-zinc-800"></div>
            </div>

            {/* Social Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 font-medium py-2.5 rounded-lg transition-all"
            >
              <Apple size={16} />
              Continue with Apple
            </button>
          </form>

          <p className="text-xs text-zinc-500 text-center mt-6">
            Already have an account?{" "}
            <a
              href="#"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default signUp;
