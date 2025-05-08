import React, { useState } from 'react'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/Product'
import useEcomStore from '../../store/Ecom-store'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'

const Uploadfile = (props) => {
    const { form, setForm } = props
    const [isLoading, setIsLoading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                //Check image
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not image`)
                    continue
                }
                //Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image success!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
        .then((res) => {
            const filterImages = images.filter((item) => {
                return item.public_id !== public_id
            })
            setForm({
                ...form,
                images: filterImages
            })
            toast.error(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 my-4 gap-4'>
                {
                    isLoading && <Loader className='w-16 h-16 animate-spin'/> //ถ้า false จะเข้าตัวหน้า && ถ้า true จะเข้าตัวหลัง
                }
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-105'
                                src={item.url}
                            />
                            <span
                                className='absolute top-0 right-0 bg-red-500 p-1 rounded-md'
                                onClick={() => handleDelete(item.public_id)}
                            >
                                X
                            </span>
                        </div>
                    )
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    className='border'
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile