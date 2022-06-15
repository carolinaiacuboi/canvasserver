const Router = require('express')
const router = new Router()
const basketRouter = require('./basketRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')

router.use('/basket', basketRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)

module.exports = router