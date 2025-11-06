"use client"

import { AuthProvider } from "@/app/context/AuthContext"
import Header from "./Header"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  )
}


