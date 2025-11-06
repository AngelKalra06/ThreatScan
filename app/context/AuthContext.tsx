"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { auth } from "@/lib/firebase"

const googleProvider = new GoogleAuthProvider()

type AuthContextValue = {
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  userEmail: string | null
  userId: string | null
  isAuthReady: boolean
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const [userEmail, setUserEmail] = React.useState<string | null>(null)
  const [userId, setUserId] = React.useState<string | null>(null)
  const [isAuthReady, setIsAuthReady] = React.useState<boolean>(false)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserEmail(user.email)
        setUserId(user.uid)
      } else {
        setIsLoggedIn(false)
        setUserEmail(null)
        setUserId(null)
      }
      setIsAuthReady(true)
    })

    return () => unsubscribe()
  }, [])

  // Handle Google redirect sign-in completion
  React.useEffect(() => {
    // Only attempt to resolve redirect result on client after mount
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          router.push("/")
        }
      })
      .catch((error) => {
        // Surface in console for easier prod debugging
        console.error("Google redirect result error:", error)
      })
  }, [router])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/")
    } catch (error) {
      console.error("Google login error:", error)
      // Fallback to redirect if popup is blocked or unsupported
      const code = (error as any)?.code as string | undefined
      if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user" || code === "auth/operation-not-supported-in-this-environment") {
        await signInWithRedirect(auth, googleProvider)
        return
      }
      throw error
    }
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/")
      })
      .catch((error) => {
        console.error("Logout error:", error)
      })
  }

  const value: AuthContextValue = { isLoggedIn, login, register, loginWithGoogle, logout, userEmail, userId, isAuthReady }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function useRequireAuth() {
  const { isLoggedIn, isAuthReady } = useAuth()
  const router = useRouter()
  React.useEffect(() => {
    if (!isAuthReady) return
    if (!isLoggedIn) {
      router.replace("/login")
    }
  }, [isLoggedIn, isAuthReady, router])
}


