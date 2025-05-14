const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//สร้างข้อมูล
exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body

        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" })
    }
}

//อ่านข้อมูลทั้งหมด
exports.list = async (req, res) => {
    try {
        const { count } = req.params

        //นับจำนวน product ใน DB
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "asc" }, //เรียงจากเวลา Add product
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

//อ่านข้อมูลทีละตัว
exports.read = async (req, res) => {
    try {
        const { id } = req.params
        const products = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

//แก้ไขข้อมูล
exports.update = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        const { id } = req.params

        //clear old image
        await prisma.image.deleteMany({
            where: {
                productId: Number(id)
            }
        })
        //update DB
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

//ลบข้อมูล
exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        //ลบรูปใน cloud
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                images: true
            }
        })
        if(!product) {
            return res.status(400).json({ msg : 'Product not found!!' })
        }
        console.log(product)
        //รอลูปใน map ให้เสร็จก่อนค่อยลบทีเดียว
        const deletedImage = product.images.map((item) => 
            new Promise((resolve, reject) => {
                //ลบภาพจาก cloud
                cloudinary.uploader.destroy(item.public_id, (error, result) => {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            })
        )

        await Promise.all(deletedImage)
        //ลบข้อมูลใน database
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        res.send('Deleted Success')
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

//เรียงข้อมูลตาม
exports.listby = async (req, res) => {
    try {
        const { sort, order, limit } = req.body

        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

//ฟังก์ชั่นค้นหาจากชื่อ
const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg : "Search Error" })
    }
}

//ฟังก์ชั่นค้นหาจากประเภทสินค้า
const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
       console.log(err)
       res.status(500).json({ msg: "Server Error" }) 
    }
}

//ฟังก์ชั่นค้นหาจากกรอบราคา
const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0], //มากกว่าค่าน้อยสุด
                    lte: priceRange[1]  //น้อยกว่าค่ามากสุด
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

//ค้นหา
exports.searchfliters = async (req, res) => {
    try {
        const { query, category, price } = req.body
        //หาจากชื่อ
        if (query) {
            console.log("query : ", query)
            await handleQuery(req, res, query)
        }
        //หาจากประเภทสินค้า
        if (category) {
            console.log("category : ", category)
            await handleCategory(req, res, category)
        }
        //หาจากกรอบราคา
        if (price) {
            console.log("price : ", price)
            await handlePrice(req, res, price)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.createImages = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Product-${Date.now()}`,
            resource_type: 'auto',
            folder:'Ecom'
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}
exports.removeImage = async (req, res) => {
    try {
        const { public_id } = req.body 

        cloudinary.uploader.destroy(public_id, (result) => {
            res.send('Remove image success!')
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}