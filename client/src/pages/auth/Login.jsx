import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/Ecom-store';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handdleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handdleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Login Success')
    } catch (err) {
      const errMsg = err.response?.data?.msg
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      // navigate(-1) // กลับหน้าเดิมก่อน login
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6'>
      <div className='w-full max-w-md'>
        {/* Login Card */}
        <div className='bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-sm border border-gray-100'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-[#003366] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-[#003366] mb-2'>เข้าสู่ระบบ</h1>
            <p className='text-gray-500'>ยินดีต้อนรับกลับมา</p>
            <div className='h-1 w-16 bg-gradient-to-r from-[#003366] to-blue-500 mx-auto mt-3 rounded-full'></div>
          </div>

          {/* Login Form */}
          <form className='space-y-6' onSubmit={handdleSubmit}>
            {/* Email Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                </svg>
                อีเมล
              </label>
              <input
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white'
                onChange={handdleOnChange}
                name='email'
                type='email'
                placeholder="กรอกอีเมลของคุณ"
                required
              />
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
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white'
                onChange={handdleOnChange}
                name='password'
                type='password'
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r cursor-pointer from-[#003366] to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98]'
            >
              <span className='flex items-center justify-center gap-3'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                </svg>
                เข้าสู่ระบบ
              </span>
            </button>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-white text-gray-500'>หรือ</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            {/* <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                className='flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:bg-gray-50'
              >
                <svg className='w-5 h-5 text-red-500' viewBox='0 0 24 24'>
                  <path fill='currentColor' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                  <path fill='currentColor' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                  <path fill='currentColor' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
                  <path fill='currentColor' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
                </svg>
                <span className='text-sm font-medium'>Google</span>
              </button>
              <button
                type='button'
                className='flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:bg-gray-50'
              >
                <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
                <span className='text-sm font-medium'>Facebook</span>
              </button>
            </div> */}

            {/* Sign Up Link */}
            <div className='text-center text-sm text-gray-600'>
              ยังไม่มีบัญชี?
              <a href='/register' className='text-blue-600 hover:text-blue-800 font-medium ml-1 transition-colors'>
                สมัครสมาชิก
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login