const express = require('express')
const router = express.Router()
const { create, list, read, update, remove, listby, searchfliters, createImages, removeImage } = require('../controllers/product')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

router.post('/productby', listby)
router.post('/search/filters', searchfliters)

router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimage', authCheck, adminCheck, removeImage)

module.exports = router