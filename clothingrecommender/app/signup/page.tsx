'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Nunito } from 'next/font/google'
import { IoLogoAngular } from 'react-icons/io'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

const nunito = Nunito({ subsets: ['latin'] })

const fields = [
  { id: 'email', label: 'Email', type: 'email'},
  { id: 'username', label: 'Username', type: 'text'},
  { id: 'password', label: 'Password', type: 'password'},
]

function isFieldInvalid(id: string, value: string) {
  if (!value.trim()) return true
  if (id === 'email') return !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
  if (id === 'username') return value.trim().length < 2
  if (id === 'password') return value.length < 6
  return false
}

export default function SignupPage() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen flex-1 bg-[#D4C4A8]">
      <div className={`flex flex-col items-center bg-[#EFEAE3] rounded-xl p-8 w-96 shadow-lg font-bold animate-fade-in-up ${nunito.className}`}>
        <div className="flex items-center gap-2 mb-2">
          <IoLogoAngular size={40} className="text-[#B56311]"/>
          <h1 className="text-2xl font-bold text-[#B56311]">Create a new account</h1>
        </div>

        <form className="flex flex-col w-full gap-4">
          {fields.map(({ id, label, type}) => {
            const value = formData[id] || ''
            const showError = isFieldInvalid(id, value)
            const isPassword = id === 'password'
            return (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="text-sm font-bold text-[#171717]">
                  {label}
                  {showError && <span className="text-red-400 ml-1">*</span>}
                </label>
                <div className="relative">
                  <input
                    id={id}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#ccc] bg-white text-[#171717] focus:outline-none focus:border-[#B56311]"
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full px-2 flex items-center rounded-r-lg bg-[#ddd] bg-opacity-50 text-[#171717] opacity-50 hover:opacity-80 hover:bg-[#ccc] transition"
                    >
                      {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          <button type="submit" className="w-full py-2 mt-2 rounded-lg bg-[#B56311] text-white font-semibold hover:bg-[#934f0e] transition duration-200">
            Create Account
          </button>
        </form>

        <Link href="/login" className="text-sm text-[#B56311] font-bold mt-4 self-start hover:underline">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  )
}
