import React from 'react'
import Homecontent from '../components/home/Homecontent'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div>
      <Homecontent />
      <BestSeller />
      <NewProduct />
    </div>
  )
}

export default Home