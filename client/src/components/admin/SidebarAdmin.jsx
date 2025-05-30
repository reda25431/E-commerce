import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { LayoutDashboard, UserCog, SquareChartGantt, ShoppingBasket, LogOut, ReceiptText } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';

const SidebarAdmin = () => {
    const actionLogout = useEcomStore((state) => state.actionLogout)

    const navigate = useNavigate()

    const logout = () => {
        actionLogout()
        navigate('/')
    }

    return (
        <div className='bg-gray-800 w-64 text-gray-100 flex flex-col h-screen'>
            <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
                Admin Panel
            </div>

            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink
                    to={'/admin'}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <LayoutDashboard className='mr-2' />
                    Dashboard
                </NavLink>
                <NavLink
                    to={'manage'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <UserCog className='mr-2' />
                    Manage
                </NavLink>
                <NavLink
                    to={'category'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <SquareChartGantt className='mr-2' />
                    Category
                </NavLink>
                <NavLink
                    to={'product'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ShoppingBasket className='mr-2' />
                    Product
                </NavLink>
                <NavLink
                    to={'orders'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ReceiptText className='mr-2' />
                    Orders
                </NavLink>
            </nav>

            <div className='flex px-4 py-4'>
                <button
                    className='flex cursor-pointer text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded items-center w-full'
                    onClick={logout}
                >
                    <LogOut className='mr-2' />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default SidebarAdmin