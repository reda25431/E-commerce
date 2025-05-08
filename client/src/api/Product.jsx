import axios from "axios"

export const createProduct = async (token, form) => await axios.post('http://localhost:5001/api/product', form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const listProduct = async (count = 20) => await axios.get('http://localhost:5001/api/products/' + count)

export const uploadFiles = async (token, form) => await axios.post('http://localhost:5001/api/images', {
    image: form
}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const removeFiles = async (token, public_id) => await axios.post('http://localhost:5001/api/removeimage', {
    public_id
}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const readProduct = async (token, id) => await axios.get('http://localhost:5001/api/product/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const updateProduct = async (token, id, form) => await axios.put('http://localhost:5001/api/product/' + id, form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const deleteProduct = async (token, id) => await axios.delete('http://localhost:5001/api/product/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const searchFilters = async (arg) => await axios.post('http://localhost:5001/api/search/filters', arg)
