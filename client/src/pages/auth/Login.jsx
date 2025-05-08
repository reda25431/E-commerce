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
      navigate(-1)
    }
  }

  return (
    <div className='bg-gray-100 rounded-xs shadow-md w-full p-50 flex justify-center items-center'>
      <div className='bg-white p-10 w-100 rounded-xl shadow-md'>
        <p className='text-2xl font-bold text-center mb-10'>Login</p>
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
          <button className='bg-[#1A4D80] hover:bg-[#003366] w-full rounded-md text-white py-2 shadow-md cursor-pointer'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login