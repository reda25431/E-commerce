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
            <p className='text-2xl text-[#003366] ml-3 p-4'>สินค้าขายดี</p>
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