const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body

        //validate body
        if(!email) {
            return res.status(400).json({ msg: "Email is required!!!" })
        }
        if(!password) {
            return res.status(400).json({ msg: "Password is required!!!" })
        }

        //check email in database
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        console.log(user)
        if(user) {
            return res.status(400).json({ msg: "Email already exits!!!" })
        }

        //HashPassword
        const hashPassword = await bcrypt.hash(password, 10)

        //register user
        await prisma.user.create({
            data:{
                email: email,
                password: hashPassword
            }
        })

        res.send('Register Success')

    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Check Email
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user) {
            return res.status(400).json({ msg: "User not found" })
        }
        if(!user.enabled) {
            return res.status(400).json({ msg: "User Enabled" })
        }

        //Check Password
        const PasswordCheck = await bcrypt.compare(password, user.password)
        if(!PasswordCheck) {
            return res.status(400).json({ msg: "Password Invalid" })
        }

        //Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        //Generate Token
        jwt.sign(payload, process.env.SECRET, {expiresIn:'1d'}, (err, token) => {
            if(err) {
                return res.status(500).json({ msg: "Server Error" })
            }
            res.json({ payload, token })
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json({ user })
    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}