const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

//Check User
exports.authCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization

        //เช็คว่าส่งโทเคนมาไหม
        if(!headerToken) {
            return res.status(401).json({ msg: "No Token, Authorization" })
        }
        //กรอง+แยกโทเคน
        const token = headerToken.split(" ")[1]
        
        const decode = jwt.verify(token, process.env.SECRET)

        //เรียก require เพื่อให้ใช้ได้ทุกหน้า
        req.user = decode

        //Check user in DB
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })

        //Check ว่า user นี้ปิดใช้งานไหม
        if(!user.enabled) {
            return res.status(400).json({ msg: "This account cannot access" })
        }

        //ถ้าผ่านให้ส่งไปต่อได้เลย
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Token Invalid" })
    }
}

//Check Admin
exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user

        const adminUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ msg: "Acess Denied: Admin Only!"})
        }
        next() 
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Error Admin access denied" })
    }
}