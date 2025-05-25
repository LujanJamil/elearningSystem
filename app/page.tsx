"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Admin credentials
      if (email === "admin@samacollege.com" && password === "admin123") {
        router.push("/admin/dashboard")
        return
      }

      // Student credentials
      if (email === "student@samacollege.com" && password === "student123") {
        router.push("/dashboard")
        return
      }

      // Mock student emails for testing
      const studentEmails = ["ahmed@student.com", "fatima@student.com", "ibrahim@student.com", "zainab@student.com"]

      if (studentEmails.includes(email) && password === "password") {
        router.push("/dashboard")
        return
      }

      setError("Invalid email or password")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001428] to-[#00101e] p-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-blue rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Sama Islamic Digital College"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-primary p-1"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">Sama Islamic Digital College</h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-4">{error}</div>
            )}

            <form onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control w-full pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="form-check-input" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:text-blue-400">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                    ) : (
                      <LogIn className="h-5 w-5 mr-2" />
                    )}
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:text-blue-400">
                  Contact administration
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
