const prisma = require("../config/prisma")
const stripe = require('stripe')('sk_test_51RL2ZnPGsdCA8zK6BychcWJk4AaxYcChCA1dz28yKJbgvNMDImYkrSsRZLhaXY4mC86s6bt05fuhDT1RqGblGAJc00lcLKAu1q')

exports.payment = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: req.user.id
            }
        })

        const amountTHB = cart.cartTotal * 100

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountTHB,
            currency: 'thb',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server Error" })
    }
}