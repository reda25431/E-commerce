import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import useEcomStore from '../../store/Ecom-store'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react';

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })

    useEffect(() => {
        getCategory()
        getProduct()
    }, [])

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            setForm(initialState)
            getProduct()
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Confirm Delete')) {
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.error("ลบสินค้าเรียบร้อยแล้ว");
                getProduct();
            } catch (err) {
                console.log(err)
            }
        }
    }

    // กำหนดคอลัมน์สำหรับ DataTable
    const columns = [
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">No.</span>,
            cell: (row, index) => (
              <div className="w-full text-center">
                {index + 1}
              </div>
            ),
            width: '100px',
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">รูปภาพ</span>,
            cell: row =>
                row.images && row.images.length > 0 ? (
                    <div className="flex justify-center">
                        <img
                            src={row.images[0].url}
                            alt="product"
                            className="w-24 h-24 rounded-lg shadow-md my-2"
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-md shadow-md my-2 bg-gray-200 flex items-center justify-center">
                        No Image
                    </div>
                ),
            width: '130px',
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">ชื่อสินค้า</span>,
            selector: row => row.title,
            sortable: true,
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">รายละเอียดสินค้า</span>,
            selector: row => row.description,
            wrap: true,
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">ราคา</span>,
            selector: row => row.price,
            sortable: true,
            cell: row => <div className="text-center w-full">{row.price}</div>,
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">จำนวน</span>,
            selector: row => row.quantity,
            sortable: true,
            cell: row => <div className="text-center w-full">{row.quantity}</div>,
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">จำนวนที่ขาย</span>,
            selector: row => row.sold,
            sortable: true,
            cell: row => <div className="text-center w-full">{row.sold}</div>,
        },
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">วันที่อัพเดต</span>,
            selector: row => row.updatedAt,
            sortable: true,
            cell: row => {
                const date = new Date(row.updatedAt);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}/${date.getFullYear()}`;
                return <div className="text-center w-full">{formattedDate}</div>;
            },
        },
        {
            name: <div className="text-center text-base text-[#003366] font-bold w-full">จัดการ</div>,
            cell: row => (
                <div className="w-full flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-yellow-500 text-white cursor-pointer rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                        <Pencil />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white cursor-pointer rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                        <Trash2 />
                    </button>
                </div>
            ),
            width: '150px', // เพิ่มความกว้างเพื่อให้มีพื้นที่แสดงปุ่ม
        }

    ];

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input
                    className='border'
                    type='text'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input
                    className='border'
                    type='text'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input
                    className='border'
                    type='number'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='Price'
                    name='price'
                />
                <input
                    className='border'
                    type='number'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='Quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    value={form.categoryId}
                    required
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <Uploadfile form={form} setForm={setForm} />
                <button
                    className='cursor-pointer bg-[#003366] text-white p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'
                >
                    เพิ่มสินค้า
                </button>
                <hr className='my-4' />
                {/* <table className='Maintable w-full'>
                    <thead>
                        <tr>
                            <th scope='col'>No.</th>
                            <th scope='col'>รูปภาพ</th>
                            <th scope='col'>ชื่อสินค้า</th>
                            <th scope='col'>รายละเอียดสินค้า</th>
                            <th scope='col'>ราคา</th>
                            <th scope='col'>จำนวน</th>
                            <th scope='col'>จำนวนที่ขาย</th>
                            <th scope='col'>วันที่อัพเดต</th>
                            <th scope='col'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img className='w-24 h-24 rounded-lg shadow-md my-2' src={item.images[0].url} />
                                                    : <div className='w-24 h-24 rounded-md shadow-md my-2 bg-gray-200 flex items-center justify-center'>No Image</div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td className='flex gap-2'>
                                            <p className='bg-yellow-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                                                <Link to={'/admin/product/' + item.id}><Pencil /></Link>
                                            </p>
                                            <p
                                                className='bg-red-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 />
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
                <DataTable
                    title="จัดการสินค้า"
                    columns={columns}
                    data={products}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                />
            </form>
        </div>
    )
}

export default FormProduct