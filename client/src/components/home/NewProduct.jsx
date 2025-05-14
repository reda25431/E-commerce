import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperProductSlide from '../../utils/swiperProductSlide'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('createdAt', 'desc', 8)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <p className='text-2xl text-center my-4'>สินค้าใหม่</p>
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

export default NewProduct