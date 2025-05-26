import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import { SwiperSlide } from 'swiper/react'
import SwiperProductSlide from '../../utils/swiperProductSlide'

const BestSeller = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('sold', 'desc', 8)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='bg-white drop-shadow-xl mb-10 rounded shadow'>
            <div className="relative p-6 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-[#003366] to-[#94b3d2] rounded-full"></div>
                        <h2 className='text-2xl font-bold bg-gradient-to-r text-[#003366] bg-clip-text'>
                            สินค้าขายดี
                        </h2>
                    </div>
                </div>
            </div>
            <hr className='mb-8 text-gray-200'/>
            <div className='md:px-20'>
                <SwiperProductSlide>
                    {
                        data?.map((item, index) =>
                            <SwiperSlide>
                                <ProductCard item={item} key={index} />
                            </SwiperSlide>

                        )
                    }
                </SwiperProductSlide>
            </div>
        </div>
    )
}

export default BestSeller