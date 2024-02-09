const mongodb = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('paymentMethods')
    .find()
    .toArray()
    .then((companies) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(companies)
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }
  const paymentId = new ObjectId(req.params.id)

  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('paymentMethods')
    .find({ _id: paymentId })
    .toArray()
    .then((payment) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(payment[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const createPaymentMethod = async (req, res) => {
  const payment = {
    method: req.body.method,
    currency: req.body.currency
  }

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('paymentMethods')
    .insertOne(payment)

  if (response.acknowledged) {
    res.status(201).json({ _id: response.insertedId })
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while creating the paymentMethod')
  }
}

const updatePaymentMethod = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }

  const paymentId = new ObjectId(req.params.id)

  const payment = {
    method: req.body.method,
    currency: req.body.currency
  }

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('paymentMethods')
    .replaceOne({ _id: paymentId }, payment)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the paymentMethod')
  }
}

const deletePaymentMethod = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }

  const paymentId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('paymentMethods')
    .deleteOne({ _id: paymentId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while deleting the paymentMethod')
  }
}

module.exports = {
  getAll,
  getSingle,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
}
