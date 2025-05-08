const prisma = require("../config/prisma")

exports.listUsers = async (req, res) => {
    try {
        //ตั้งค่าว่าให้โชว์อะไรบ้าง
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body

        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                enabled: enabled
            }
        })

        console.log(user)
        res.send('Update status sucess')
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body

        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role
            }
        })
        res.send('Update role sucess')
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body

        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id)
            }
        })

        //Check quantity สินค้าที่เหลือ
        for (const item of cart) {

            //ค้นหาจำนวนสินค้าใน DB
            const product = await prisma.product.findUnique({
                where: {
                    id: item.id
                },
                select: {
                    quantity: true,
                    title: true
                }
            })
            //เช็คสินค้าที่ซื้อว่ามีมากกว่าในคลังไหม
            if (!product || item.count > product.quantity) {
                return res.status(400).json({
                    ok: false,
                    msg: `ขออภัย. ${product?.title || 'product'} มีจำนวนไม่พอคำสั่งซื้อ`
                })
            }
        }

        //ลบข้อมูลเดิมที่อยู่ในรถเข็น
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id
                }
            }
        })

        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id
            }
        })

        //เตรียมสินค้า
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price,
        }))
        //คำนวณราคาสินค้า
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0)

        //ผมรวมสินค้า
        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })
        res.send("Add cart ok")
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

//แสดง cart ของ user
exports.getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

//ลบ cart
exports.emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        //เช็คว่ามี cart ไหม
        if (!cart) {
            return res.status(400).json({ msg: "No cart" })
        }

        //ลบ product ใน cart
        await prisma.productOnCart.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        //ลบ cart
        const result = await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        res.json({
            msg: "Cart Empty Success",
            deleteCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

//บันทึกที่อยู่
exports.saveAddress = async (req, res) => {
    try {
        const { address } = req.body

        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })

        console.log(addressUser)
        res.json({ ok: true, msg: "Address update success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.saveOrder = async (req, res) => {
    try {
        const { paymentIntent } = req.body;
        if (!paymentIntent) {
            return res.status(400).json({ ok: false, msg: "Missing paymentIntent" });
        }
        const { id, amount, status, currency } = paymentIntent;
        const amountTHB = Number(amount) / 100;

        //get user cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: true
            }
        })

        //Check สินค้าในตระกร้าว่ามีไหม
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({ ok: false, msg: "Cart is Empty" })
        }
        // //ถ้าผ่านเงื่อนไขด้านบนจะ create new order
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price,
                    })),
                },
                orderedBy: {
                    connect: { id: req.user.id },
                },
                cartTotal: userCart.cartTotal,
                stripePaymentId: id,
                amount: amountTHB,
                status: status,
                currentcy: currency,
            },
        })

        //เมื่อย้ายไป order ต้องลบใน cart แล้วอัพเดต quantity ในสต็อกด้วย
        const update = userCart.products.map((item) => ({
            where: {
                id: item.productId
            },
            data: {
                quantity: {
                    decrement: item.count //ลดจำนวนสินค้าใน quantity
                },
                sold: {
                    increment: item.count //เพิ่มสินค้าที่ขายได้
                }
            }
        }))
        await Promise.all(
            update.map((updated) => prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        res.json({ ok: true, order })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.getOrder = async (req, res) => {
    try {

        const orders = await prisma.order.findMany({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        if (orders.length === 0) {
            return res.status(400).json({ ok: false, msg: "No orders" })
        }

        res.json({ ok: true, orders })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}