import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '../layout/Layout'
import LayoutUser from '../layout/LayoutUser'
import LayoutAdmin from '../layout/LayoutAdmin'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'

import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

import HomeUser from '../pages/user/HomeUser'
import Payment from '../pages/user/Payment'
import History from '../pages/user/History'

import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'

import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import EditProduct from '../pages/admin/EditProduct'
import ManageOrder from '../pages/admin/ManageOrder'

const router = createBrowserRouter([
    { 
      path: '/', 
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
      ]
    },
    {
      path: '/user',
      element: <ProtectRouteUser element={<LayoutUser />}/>, //ส่งไปตรวจสอบ permission
      children: [
        { index: true, element: <HomeUser /> },
        { path: 'payment', element: <Payment /> },
        { path: 'history', element: <History /> },
      ]
    },
    {
      path: '/admin',
      element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'category', element: <Category /> },
        { path: 'product', element: <Product /> },
        { path: 'product/:id', element: <EditProduct /> },
        { path: 'manage', element: <Manage /> },
        { path: 'orders', element: <ManageOrder /> },
      ]
    },
]) 

const AppRoutes = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes