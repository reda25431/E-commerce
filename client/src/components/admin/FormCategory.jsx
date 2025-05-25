import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/Ecom-store'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import { Trash2 } from 'lucide-react';
import { dateThai_s } from '../../utils/dateFormat';

const FormCategory = () => {

    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning(`โปรดกรอกประเภทหมวดหมู่สินค้า`)
        }
        try {
            const res = await createCategory(token, { name })
            toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ`)
            getCategory()
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        if (window.confirm('Confirm Delete')) {
            try {
                const res = await removeCategory(token, id)
                toast.error(`ลบสำเร็จ`)
                getCategory()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const columns = [
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">No.</span>,
            cell: (row, index) => (
                <div className="w-full text-center">
                    {index + 1}
                </div>
            ),
            width: '15%',
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">ชื่อหมวดหมู่สินค้า</span>,
            sortable: true,
            cell: (row) => (
                <div className="w-full">
                    {row.name}
                </div>
            ),
            width: '45%',
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">วันที่สร้าง</span>,
            sortable: true,
            cell: (row) => (
                <div className="w-full text-center">
                    {dateThai_s(row.createdAt)}
                </div>
            ),
            width: '20%',
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">จัดการ</span>,
            cell: row => (
                <div className="w-full flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handleRemove(row.id)}
                        className="bg-red-600 text-white cursor-pointer rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                        <Trash2 />
                    </button>
                </div>
            ),
            width: '20%',
        },
    ];

    return (
        <div className='container mx-auto p-8 bg-white shadow-xl rounded-2xl'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-center text-[#003366] mb-2'>Category Management</h1>
                <div className='h-1 w-20 bg-gradient-to-r from-[#003366] to-blue-500 mx-auto rounded-full'></div>
            </div>

            <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>ชื่อหมวดหมู่</label>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300'
                            type='text'
                            placeholder="กรอกชื่อหมวดหมู่สินค้า"
                        />
                        <button
                            type='submit'
                            className='bg-gradient-to-r from-[#003366] to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98] whitespace-nowrap'
                        >
                            <span className='flex items-center justify-center gap-2'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                </svg>
                                เพิ่มหมวดหมู่
                            </span>
                        </button>
                    </div>
                </div>
            </form>
             <hr className='my-4' />
            {/* <ul className='list-none'>

                {
                    categories.map((item, index) =>
                        <li
                            className='flex justify-between my-2'
                            key={index}
                        >
                            <span>
                                {item.name}
                            </span>

                            <button 
                                className='bg-red-500'
                                onClick={() => handleRemove(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    )
                }

            </ul> */}
            <DataTable
                title="จัดการหมวดหมู่สินค้า"
                columns={columns}
                data={categories}
                pagination
                highlightOnHover
                responsive
                striped
            />

        </div>
    )
}

export default FormCategory
