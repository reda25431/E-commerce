import React, { useState, useEffect } from 'react'
import { changeUserRole, changeUserStatus, getListAllUser } from '../../api/admin'
import useEcomStore from '../../store/Ecom-store'
import { statusActive } from '../../utils/statusColor'
import { toast } from 'react-toastify'

const UserTable = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetUser(token)
    }, [])

    const handleGetUser = (token) => {
        getListAllUser(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserStatus = (userId, userStatus) => {
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                handleGetUser(token)
                toast.success('Update status success')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Update error')
            })
    }

    const handleChangeUserRole = (userId, userRole) => {
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                handleGetUser(token)
                toast.success('Update role success')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Update error')
            })
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Email</th>
                        <th>สิทธิ์</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td className='text-center'>
                                    <select 
                                        onChange={(e) => handleChangeUserRole(item.id,e.target.value)} 
                                        value={item.role}
                                    >
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>
                                <td className='flex justify-center text-center mb-2'>
                                    <span>
                                        <div className={`${statusActive(item.enabled)} py-1 w-20 rounded-full`}>
                                            {item.enabled ? 'Active' : 'Disable'}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                                        className='bg-yellow-300 p-1 rounded-md shadow-md'
                                    >
                                        {item.enabled ? 'Disable' : 'Active'}
                                    </button>
                                </td>
                            </tr>
                )
                    }

            </tbody>
        </table>
        </div >
    )
}

export default UserTable