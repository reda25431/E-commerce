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
        <div>
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
            <div className='border p-6'>
                <input
                    onChange={(e) => setText(e.target.value)}
                    placeholder='ค้นหาสินค้า'
                    className='border rounded-mb w-full mb-4 px-2'
                    type="text"
                />
                <hr />
                <div>
                    <h1>หมวดหมู่สินค้า</h1>
                    <div className=''>
                        {
                            categories.map((item, index) =>
                                <div className='flex gap-2' key={index}>
                                    <input
                                        onClick={handleCheck}
                                        value={item.id}
                                        type='checkbox'
                                    />
                                    <label>{item.name}</label>
                                </div>
                            )
                        }
                    </div>
                </div>
                <hr />
                <div>
                    <h1>ค้นหาราคา</h1>
                    <div>
                        <div className='flex justify-between'>
                            <span>Min : {numberFormat(price[0])}</span>
                            <span>Max : {numberFormat(price[1])}</span>
                        </div>
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
    )
}

export default SearchCard