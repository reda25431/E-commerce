import axios from "axios";

export const getOrderAdmin = async (token) => await axios.get('http://localhost:5001/api/admin/orders', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const changeOrderStatus = async (token, orderId, orderStatus) => await axios.put('http://localhost:5001/api/admin/order-status', { orderId, orderStatus }, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getListAllUser = async (token) => await axios.get('http://localhost:5001/api/users', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const changeUserStatus = async (token, value) => await axios.post('http://localhost:5001/api/change-status', value, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const changeUserRole = async (token, value) => await axios.post('http://localhost:5001/api/change-role', value, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})