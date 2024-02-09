const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

//getOrders
const getOrders = (req, res) => {
    //#swagger.tags=['Orders']
    const result = mongodb.getDataBase().db().collection("orders").find();
    result.toArray().then((order) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(order);
    });
};

//getOrder
const getOrder = (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to find an order.");
    }
    const orderId = new ObjectId(req.params.id);
    const result = mongodb
        .getDataBase()
        .db()
        .collection("orders")
        .find({ _id: orderId });
    result.toArray().then((player) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(player[0]);
    });
};

//createOrder
const createOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    const order = {
        user: req.body.user,
        date: req.body.date,
        status: req.body.status,
        cart: req.body.cart,
    };

    const response = await mongodb
        .getDataBase()
        .db()
        .collection("orders")
        .insertOne(order);
    if (response.acknowledge) {
        res.status(201).json(response);
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while saving the order.");
    }
};

//updateOrder
const updateOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to update an order.");
    }
    const orderId = new ObjectId(req.params.id);
    const order = {
        user: req.body.user,
        date: req.body.date,
        status: req.body.status,
        cart: req.body.cart,
    };

    const response = await mongodb
        .getDataBase()
        .db()
        .collection("orders")
        .replaceOne({ _id: orderId }, order);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while updating the order.");
    }
};

//deleteOrder
const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to delete an order.");
    }
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDataBase()
        .db()
        .collection("orders")
        .deleteOne({ _id: orderId }, true);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while deleting the order");
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
