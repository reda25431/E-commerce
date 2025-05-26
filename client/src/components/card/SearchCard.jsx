import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom-store'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { numberFormat } from '../../utils/number'

const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([0, 1000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])


    //Seacrh text
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])

    //Search by category
    const handleCheck = (e) => {
        const inCheck = e.target.value              //ค่าที่เช็ค
        const inState = [...categorySelected]       //[] array ว่าง
        const findCheck = inState.indexOf(inCheck)  //ถ้าไม่เจอจะ return -1

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1) //ลบใน findCheck จำนวน 1
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }

    //Search by price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])

    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003366] to-blue-700 text-white p-4">
                <h1 className='text-xl font-bold flex items-center gap-3'>
                    ค้นหาสินค้า
                </h1>
            </div>

            <div className='p-6 space-y-6'>
                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setText(e.target.value)}
                        placeholder='ค้นหาสินค้าที่ต้องการ...'
                        className='w-full pl-12 pr-2 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500'
                        type="text"
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Categories Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">หมวดหมู่สินค้า</h2>
                    </div>

                    <div className='space-y-3 max-h-48 overflow-y-auto'>
                        {categories.map((item, index) =>
                            <label
                                key={index}
                                className='group flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border border-transparent hover:border-blue-100'
                            >
                                <div className="relative">
                                    <input
                                        onClick={handleCheck}
                                        value={item.id}
                                        type='checkbox'
                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200'
                                    />
                                </div>
                                <span className="text-gray-700 group-hover:text-blue-700 font-medium transition-colors duration-300">
                                    {item.name}
                                </span>
                            </label>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Price Range Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">ช่วงราคา</h2>
                    </div>
                    {/* Price Display */}
                    <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200'>
                        <div className='flex justify-between items-center mb-4'>
                            <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">ราคาต่ำสุด</div>
                                <span className="text-lg font-bold text-green-600">฿{numberFormat(price[0])}</span>
                            </div>
                            <div className="flex-1 mx-4 border-t border-dashed border-gray-300"></div>
                            <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">ราคาสูงสุด</div>
                                <span className="text-lg font-bold text-green-600">฿{numberFormat(price[1])}</span>
                            </div>
                        </div>

                        {/* Slider Container */}
                        <div className="px-2">
                            <Slider
                                onChange={handlePrice}
                                range
                                min={0}
                                max={1000}
                                defaultValue={[0, 1000]}
                            />
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard