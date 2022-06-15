const { Basket, BasketOrder, Order } = require('../models/models')

class BasketController {
    async create(req, res) {
        const { userId, orderId } = req.body
        const basket = await Basket.findOne({ where: { userId } })
        const basketOrder = await BasketOrder.create({ basketId: basket.id, orderId, finished: false })
        return res.json(basketOrder)
    }

    async getProductsFromBaskett(req, res) {
        const { userId } = req.query
        const basket = await Basket.findOne({ where: { userId } })
        const basketOrders = await BasketOrder.findAll({ where: { basketId: basket.id }, include: Order })
        return res.json(basketOrders)
    }

    async deleteOrderFromBasket(req, res) {
        const { userId, orderId } = req.body
        const basket = await Basket.findOne({ where: { userId } })
        const basketOrders = await BasketOrder.destroy({ where: { basketId: basket.id, orderId } })
        return res.json(basketOrders)
    }
}

module.exports = new BasketController()
