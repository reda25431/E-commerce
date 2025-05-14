import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import useEcomStore from '../../store/Ecom-store';

const Homecontent = () => {
    // const products = useEcomStore((state) => state.products)
    const [data, setData] = useState([])

    useEffect(() => {
        hdlGetImage();
    }, [])

    const hdlGetImage = () => {
        axios.get("https://picsum.photos/v2/list?page=1&limit=20")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination,]}
                className="mySwiper h-120 object-cover"
            >
                {
                    /*
                        products.map((item, index) => (
                            <SwiperSlide key={index}>
                                {
                                    item.images && item.images.length > 0
                                    ? <img src={item.images?.[0]?.url} />
                                    : <div className='w-full h-32 rounded-md text-center flex items-center justify-center shadow bg-gray-200'>No Image</div>
                                }
                            </SwiperSlide>
                        ))
                    */
                    data?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Homecontent