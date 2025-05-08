import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handdleOnChange = (e) => {
    setForm({
      ...form,  //...form คัดลอกข้อมูลของ form มาไว้ในนี้
      [e.target.name]: e.target.value
    })
  }

  const handdleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match!!!')
    }

    try {
      const res = await axios.post('http://localhost:5001/api/register', form)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.msg
      toast.error(errMsg)
    }
  }

  return (
    <div className='bg-gray-100 rounded-xs shadow-md w-full p-50 flex justify-center items-center'>
      <div className='bg-white p-10 w-100 rounded-xl shadow-md'>
        <p className='text-2xl font-bold text-center mb-10'>Register</p>
        <form className='flex flex-col gap-4' onSubmit={handdleSubmit}>
          <input className='border rounded-sm'
            onChange={handdleOnChange}
            name='email'
            type='email'
            placeholder="Email"
          />
          <input className='border rounded-sm'
            onChange={handdleOnChange}
            name='password'
            type='text'
            placeholder="Password"
          />
          <input className='border rounded-sm'
            onChange={handdleOnChange}
            name='confirmPassword'
            type='text'
            placeholder="Confirm Password"
          />
          <button className='bg-[#1A4D80] hover:bg-[#003366] w-full rounded-md text-white py-2 shadow-md cursor-pointer'>
            register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register