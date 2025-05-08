import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../store/Ecom-store';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const MainNav = () => {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const actionLogout = useEcomStore((state) => state.actionLogout)
    const navigate = useNavigate()

    const [profileOpen, setProfileOpen] = useState(false)

    const toggleDropdown = () => {
        setProfileOpen(!profileOpen)
    }

    const logout = () => {
        actionLogout()
        navigate('/')
    }

    return (
        <nav className='bg-white shadow-md sticky top-0'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-4'>
                        <NavLink to={'/'} className='text-2xl font-bold text-[#003366]'>LOGO</NavLink>
                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-[#ff5733]'
                                    : 'text-[#003366] hover:text-[#ff5733]'
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to={'/shop'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-[#ff5733]'
                                    : 'text-[#003366] hover:text-[#ff5733]'
                            }
                        >
                            Shop
                        </NavLink >
                    </div>
                    <div className='flex items-center gap-4'>
                        <NavLink to={'/cart'} className='px-4 py-1 rounded-md hover:bg-[#1a4d8025] relative'>
                            <ShoppingCart className='text-[#003366]' />
                            {
                                carts.length > 0
                                && (<span className='absolute top-0 right-1 bg-red-500 rounded-full px-1 w-4 text-xs text-center text-white'>{carts.length}</span>)
                            }
                        </NavLink>

                        {
                            user
                                ? <div className='flex gap-4'>
                                    <button
                                        className='flex items-center gap-2 cursor-pointer'
                                        onClick={toggleDropdown}
                                    >
                                        <img
                                            className='w-12 h-12'
                                            src="https://cdn-icons-png.flaticon.com/512/6858/6858485.png"
                                        />
                                        <ChevronDown />
                                    </button>

                                    {
                                        profileOpen && (
                                            <div className='absolute top-16 bg-white shadow-md'>
                                                <NavLink
                                                    to={'/user/history'}
                                                    className='block px-4 py-2 hover:bg-gray-200'
                                                >
                                                    History
                                                </NavLink>
                                                <button
                                                    className='block px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )
                                    }

                                </div>
                                : <div className='flex gap-4'>
                                    <NavLink
                                        to={'/login'}
                                        className="border w-18 rounded-md py-1 text-center text-[#003366] border-[#003366] hover:bg-[#1a4d8046]"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to={'/register'}
                                        className="border w-18 rounded-md py-1 text-center text-white border-[#1A4D80] bg-[#1A4D80] hover:bg-[#003366]"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MainNav