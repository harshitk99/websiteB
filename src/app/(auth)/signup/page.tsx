"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Ripple } from "@/components/magicui/ripple";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to register the user
      console.log("Form submitted:", formData);
      // For now, just redirect to home
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-[1]">
        <Ripple 
          color="white"
          mainCircleSize={400}
          mainCircleOpacity={0.2}
          numCircles={8}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-[2] w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-white/10">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Create Account</h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.username ? "border-red-500" : "border-white/10"
                } text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.email ? "border-red-500" : "border-white/10"
                } text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.password ? "border-red-500" : "border-white/10"
                } text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.confirmPassword ? "border-red-500" : "border-white/10"
                } text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <ShimmerButton
              type="submit"
              className="w-full mt-8"
            >
              Sign Up
            </ShimmerButton>

            <p className="text-center text-white/60 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signin")}
                className="text-white hover:underline focus:outline-none"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}