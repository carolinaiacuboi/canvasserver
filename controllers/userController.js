const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, firstname, lastname, email, tel) => {
    return jwt.sign({ id, firstname, lastname, email, tel }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        const { firstname, lastname, email, tel, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Incorret email or password"))
        }
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            return next(ApiError.badRequest("This email is already registered"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ firstname, lastname, email, tel, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.firstname, user.lastname, user.email, user.tel)
        return res.json({ token })
    }
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("User with that email is not found"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Incorrect password"))
        }
        const token = generateJwt(user.id, user.firstname, user.lastname, user.email, user.tel)
        return res.json({ token })
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.firstname, req.user.lastname, req.user.email, req.user.tel)
        return res.json({ token })
    }
}
module.exports = new UserController()