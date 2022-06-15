const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, },
    tel: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketOrder = sequelize.define('basket_order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finished: { type: DataTypes.BOOLEAN, allowNull: true }
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: true },
    subtype: { type: DataTypes.STRING, allowNull: true },
    size: { type: DataTypes.STRING, allowNull: true },
    margin: { type: DataTypes.STRING, allowNull: true },
    filter: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.STRING, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true },
})

User.hasOne(Basket);
Basket.belongsTo(User);
Basket.hasMany(BasketOrder);
BasketOrder.belongsTo(Basket);
Order.hasMany(BasketOrder);
BasketOrder.belongsTo(Order);

module.exports = {
    User, Basket, BasketOrder, Order
}