import axios from "axios"

export const createUserCart = async (token, cart) => await axios.post('http://localhost:5001/api/user/cart', cart, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const listUserCart = async (token) => await axios.get('http://localhost:5001/api/user/cart', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const saveAddress = async (token, address) => await axios.post('http://localhost:5001/api/user/address', { address }, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const saveOrder = async (token, payload) => await axios.post('http://localhost:5001/api/user/order', payload, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getOrder = async (token) => await axios.get('http://localhost:5001/api/user/order', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})