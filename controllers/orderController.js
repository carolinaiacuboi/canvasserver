const uuid = require('uuid')
const path = require('path');
const { Order } = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res, next) {
        try {
            let { type, subtype, size, margin, filter, price } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const order = await Order.create({ type, subtype, size, margin, filter, price, img: fileName });
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    // async getAll(req, res) {
    //     let { brandId, typeId, limit, page } = req.query
    //     page = page || 1
    //     limit = limit || 9
    //     let offset = page * limit - limit
    //     let products;
    //     if (!brandId && !typeId) {
    //         products = await Product.findAndCountAll({ limit, offset })
    //     }
    //     if (brandId && !typeId) {
    //         products = await Product.findAndCountAll({ where: { brandId }, limit, offset })
    //     }
    //     if (!brandId && typeId) {
    //         products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
    //     }
    //     if (brandId && typeId) {
    //         products = await Product.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    //     }
    //     return res.json(products)
    // }

    // async getOne(req, res) {
    //     const { id } = req.params
    //     const product = await Product.findOne(
    //         {
    //             where: { id },
    //             include: [{ model: ProductInfo, as: 'info' }],
    //         },
    //     )
    //     return res.json(product)
    // }
}

module.exports = new OrderController()
