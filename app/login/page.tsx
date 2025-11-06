"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/context/AuthContext"
import { Alert } from "@/components/ui/alert"
import { Chrome } from "lucide-react"

export default function LoginPage() {
  const { login, register, loginWithGoogle } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)
  const [error, setError] = React.useState<string>("")
  const [isLoginMode, setIsLoginMode] = React.useState(true)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    
    try {
      if (isLoginMode) {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err: any) {
      let errorMessage = "An error occurred"
      
      if (err.code === "auth/user-not-found") {
        errorMessage = "User not found. Please sign up first."
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password."
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please sign in instead."
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters."
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address."
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later."
      }
      
      // Append code for easier troubleshooting in production
      if (err?.code) {
        errorMessage += ` (${err.code})`
      }
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setIsGoogleLoading(true)
    
    try {
      await loginWithGoogle()
    } catch (err: any) {
      let errorMessage = "An error occurred"
      
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed."
      } else if (err.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked. Please allow popups and try again."
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email. Please use email/password sign-in."
      }
      // Show raw code for visibility
      if (err?.code) {
        errorMessage += ` (${err.code})`
      }
      setError(errorMessage)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white text-2xl text-center">
            {isLoginMode ? "Login" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                {error}
              </Alert>
            )}
            
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-gray-900/60 border-gray-700 text-gray-100"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-900/60 border-gray-700 text-gray-100"
                required
                minLength={6}
                disabled={isSubmitting}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-cyan-600 hover:bg-cyan-500"
            >
              {isSubmitting 
                ? (isLoginMode ? "Signing in..." : "Creating account...") 
                : (isLoginMode ? "Sign In" : "Sign Up")}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <Button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting || isGoogleLoading}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
            >
              {isGoogleLoading ? (
                "Signing in..."
              ) : (
                <>
                  <Chrome className="w-5 h-5 mr-2" />
                  Sign in with Google
                </>
              )}
            </Button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode)
                  setError("")
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                {isLoginMode 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}




