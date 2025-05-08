const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

//middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(cors())

//Router อ่านไฟล์ part ทั้งหมดที่อยู่ในไฟล์ routes
readdirSync('./routes').map((readpage) => app.use('/api', require('./routes/'+readpage)))

//start server port 5001
app.listen(5001, ()=> console.log('server is running on port 5001'))