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
        <div>
            <p className='text-2xl text-center my-4'>สินค้าขายดี</p>
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
    )
}

export default BestSeller