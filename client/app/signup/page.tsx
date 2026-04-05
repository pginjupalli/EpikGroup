'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Nunito } from 'next/font/google'
import { IoLogoAngular } from 'react-icons/io'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { supabase } from '../../lib/supabase'

const nunito = Nunito({ subsets: ['latin'] })

const fields = [
  { id: 'email', label: 'Email', type: 'email'},
  { id: 'username', label: 'Username', type: 'text'},
  { id: 'password', label: 'Password', type: 'password'},
]


function getFieldError(id: string, value: string): string {
  if (!value.trim()) return `${id.charAt(0).toUpperCase() + id.slice(1)} is required`
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)) return 'Enter a valid email address'
  if (id === 'username' && value.trim().length < 2) return 'Username must be at least 2 characters'
  if (id === 'password' && value.length < 6) return 'Password must be at least 6 characters'
  return ''
}

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    const hasErrors = fields.some(({ id }) => getFieldError(id, formData[id] || '') !== '')
    if (hasErrors) return

    setLoading(true)
    setAuthError('')
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { username: formData.username } },
    })
    setLoading(false)

    if (error) {
      setAuthError(error.message)
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setAuthError('An account with this email already exists. Please log in.')
    } else {
      router.push('/profile')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-1 bg-[#D4C4A8]">
      <div className={`flex flex-col items-center bg-[#EFEAE3] rounded-xl p-8 w-96 shadow-lg font-bold animate-fade-in-up ${nunito.className}`}>
        <div className="flex items-center gap-2 mb-2">
          <IoLogoAngular size={40} className="text-[#B56311]"/>
          <h1 className="text-2xl font-bold text-[#B56311]">Create a new account</h1>
        </div>

        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          {fields.map(({ id, label, type}) => {
            const value = formData[id] || ''
            const error = submitted ? getFieldError(id, value) : ''
            const isPassword = id === 'password'
            return (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="text-sm font-bold text-[#171717]">
                  {label}
                </label>
                <div className="relative">
                  <input
                    id={id}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border bg-white text-[#171717] focus:outline-none focus:border-[#B56311] ${error ? 'border-red-400' : 'border-[#ccc]'}`}
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
                {error && <span className="text-red-400 text-xs font-medium">{error}</span>}
              </div>
            )
          })}

          {authError && <span className="text-red-400 text-xs font-medium">{authError}</span>}

          <button type="submit" disabled={loading} className="w-full py-2 mt-2 rounded-lg bg-[#B56311] text-white font-semibold hover:bg-[#934f0e] transition duration-200 disabled:opacity-60">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <Link href="/login" className="text-sm text-[#B56311] font-bold mt-4 self-start hover:underline">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  )
}
