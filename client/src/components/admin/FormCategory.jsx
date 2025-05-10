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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className='border'
                    type='text'
                />
                <button
                    className='cursor-pointer bg-[#003366] text-white p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 mx-4'
                >
                    เพิ่มหมวดหมู่
                </button>
            </form>
            <hr />
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
