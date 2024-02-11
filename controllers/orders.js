const mongodb = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

//getOrders
const getOrders = async (req, res) => {
  //#swagger.tags=['Orders']
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .find()
    .toArray()
    .then((orders) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(orders)
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

//getOrder
const getOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ID to find an order.')
  }
  const orderId = new ObjectId(req.params.id)

  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .find({ _id: orderId })
    .toArray()
    .then((order) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(order[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const getOrderByStatus = async (req, res) => {
  //#swagger.tags=['Orders']
  const conditionOrder = req.params.conditions

  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .find({ conditions: conditionOrder })
    .toArray()
    .then((statusOrder) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(statusOrder[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

//createOrder
const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  const order = {
    user: req.body.user,
    date: req.body.date,
    conditions: req.body.conditions,
  }

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .insertOne(order)
  if (response.acknowledged) {
    res.status(201).json({ _id: response.insertedId })
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while saving the order.')
  }
}

//updateOrder
const updateOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ID to update an order.')
  }
  const orderId = new ObjectId(req.params.id)
  const order = {
    user: req.body.user,
    date: req.body.date,
    conditions: req.body.conditions,
  }

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .replaceOne({ _id: orderId }, order)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the order.')
  }
}

//deleteOrder
const deleteOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ID to delete an order.')
  }
  const orderId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('orders')
    .deleteOne({ _id: orderId })
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the order')
  }
}

module.exports = {
  getOrders,
  getOrder,
  getOrderByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
}
