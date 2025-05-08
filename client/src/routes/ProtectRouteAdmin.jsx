import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/Ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtectRouteAdmin = ({ element }) => {
    const [acceptPermission, setAcceptPermission] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then((res) => setAcceptPermission(true))
                .catch((err) => setAcceptPermission(false))
        }
    }, [])

    return acceptPermission ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin