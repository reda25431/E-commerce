import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/Ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({ element }) => {
    const [acceptPermission, setAcceptPermission] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            currentUser(token)
            .then((res) => setAcceptPermission(true))
            .catch((err) => setAcceptPermission(false))
        }
    }, [])

    return acceptPermission ? element : <LoadingToRedirect />
}

export default ProtectRouteUser