import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password ต้องมากกว่า 8 ตัวอักษร' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: 'Password ไม่ตรงกัน', path: ['confirmPassword'] })

const Register = () => {

  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5001/api/register', data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.msg
      toast.error(errMsg)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6'>
      <div className='w-full max-w-md'>
        {/* Register Card */}
        <div className='bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-sm border border-gray-100'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-[#003366] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-[#003366] mb-2'>สมัครสมาชิก</h1>
            <p className='text-gray-500'>สร้างบัญชีใหม่</p>
            <div className='h-1 w-16 bg-gradient-to-r from-[#003366] to-blue-500 mx-auto mt-3 rounded-full'></div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Email Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                </svg>
                อีเมล
              </label>
              <input
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${errors.email
                    ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:ring-blue-500 focus:border-transparent hover:border-gray-300'
                  }`}
                {...register("email")}
                type="text"
                placeholder="กรอกอีเมลของคุณ"
              />
              {errors.email && (
                <p className='text-red-500 text-sm flex items-center gap-1'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-1.333-2.694-1.333-3.464 0L.165 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
                รหัสผ่าน
              </label>
              <input
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${errors.password
                    ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:ring-blue-500 focus:border-transparent hover:border-gray-300'
                  }`}
                {...register("password")}
                type="password"
                placeholder="กรอกรหัสผ่าน"
              />

              {/* Password Strength Indicator */}
              {watch().password?.length > 0 && (
                <div className='space-y-2'>
                  <div className='flex gap-1'>
                    {Array.from(Array(5).keys()).map((item, index) => (
                      <div key={index} className='flex-1'>
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordScore <= 2
                              ? 'bg-red-400'
                              : passwordScore < 4
                                ? 'bg-yellow-400'
                                : 'bg-green-400'
                            }`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${passwordScore <= 2
                      ? 'text-red-500'
                      : passwordScore < 4
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                    ความแข็งแกร่งของรหัสผ่าน: {
                      passwordScore <= 2 ? 'อ่อน' : passwordScore < 4 ? 'ปานกลาง' : 'แข็งแกร่ง'
                    }
                  </p>
                </div>
              )}

              {errors.password && (
                <p className='text-red-500 text-sm flex items-center gap-1'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-1.333-2.694-1.333-3.464 0L.165 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                ยืนยันรหัสผ่าน
              </label>
              <input
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${errors.confirmPassword
                    ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:ring-blue-500 focus:border-transparent hover:border-gray-300'
                  }`}
                {...register("confirmPassword")}
                type="password"
                placeholder="ยืนยันรหัสผ่านอีกครั้ง"
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm flex items-center gap-1'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-1.333-2.694-1.333-3.464 0L.165 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className='flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100'>
              <input type='checkbox' className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5' required />
              <p className='text-sm text-gray-700'>
                ฉันยอมรับ
                <a href='#' className='text-blue-600 hover:text-blue-800 font-medium transition-colors mx-1'>
                  ข้อกำหนดการใช้งาน
                </a>
                และ
                <a href='#' className='text-blue-600 hover:text-blue-800 font-medium transition-colors ml-1'>
                  นโยบายความเป็นส่วนตัว
                </a>
              </p>
            </div>

            {/* Register Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r cursor-pointer from-[#003366] to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98]'
            >
              <span className='flex items-center justify-center gap-3'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                </svg>
                สมัครสมาชิก
              </span>
            </button>

            {/* Login Link */}
            <div className='text-center text-sm text-gray-600'>
              มีบัญชีอยู่แล้ว?
              <a href='/login' className='text-blue-600 hover:text-blue-800 font-medium ml-1 transition-colors'>
                เข้าสู่ระบบ
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register