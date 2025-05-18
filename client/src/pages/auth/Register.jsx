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
    <div className='min-h-screen flex items-center justify-center bg-gray-100 m-5'>
      <div className='w-full shadow-md bg-white rounded-md p-8 max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-10 text-[#003366]'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div className='BoxEmail'>
              <input
                className={`border w-full px-3 py-2 rounded 
                  focus:outline-none focus:ring-2 focus:ring-blue-500  
                  focus:border-transparent 
                  ${errors.email && 'border-red-500 '}
                `}
                {...register("email")}
                type="text"
                placeholder="Email"
              />
              {
                errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>
              }
            </div>
            <div className='BoxPassword'>
              <input
                className={`border w-full px-3 py-2 rounded 
                  focus:outline-none focus:ring-2 focus:ring-blue-500  
                  focus:border-transparent 
                  ${errors.password && 'border-red-500 '}
                `}
                {...register("password")}
                type="password"
                placeholder="password"
              />
              {
                errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>
              }
              {
                watch().password?.length > 0 &&
                <div className='flex mt-2'>
                  {
                    Array.from(Array(5).keys()).map((item, index) =>
                      <span className='w-1/5 px-1' key={index}>
                        <div
                          className={`h-2 rounded ${passwordScore <= 2
                            ? 'bg-red-500'
                            : passwordScore < 4
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                        >

                        </div>
                      </span>
                    )
                  }
                </div>
              }
            </div>
            <div className='BoxConfirmPassword'>
              <input
                className={`border w-full px-3 py-2 rounded 
                  focus:outline-none focus:ring-2 focus:ring-blue-500  
                  focus:border-transparent 
                  ${errors.confirmPassword && 'border-red-500 '}
                `}
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
              />
              {
                errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
              }
            </div>
            <button className='bg-[#1A4D80] hover:bg-[#003366] w-full rounded-md text-white py-2 shadow-md cursor-pointer'>
              register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register