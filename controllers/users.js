const mongodb = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('users')
    .find()
    .toArray()
    .then((users) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
   if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to find an user.");
    }
  
  const userId = new ObjectId(req.params.id)
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('users')
    .find({ _id: userId })
    .toArray()
    .then((user) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(user[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    city:req.body.city,
    user: req.body.user,
    password: req.body.password
  }

  const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('users')
    .insertOne(user)
  if (response.acknowledged) {
    res.status(201).json({ _id: response.insertedId })
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while inserting the user')
  }
}

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
   if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to find an order.");
    }
  
  const userId = new ObjectId(req.params.id)
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    mail: req.body.mail,
    phone: req.body.phone,
    city:req.body.city,
    user: req.body.user,
    password: req.body.password
  }

  const response = await mongodb
    .getDatabase()
    .db('clotheStore')
    .collection('users')
    .replaceOne(
      {
        _id: userId,
      },
      user,
    )
  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the user')
  }
}

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to find an order.");
    }
  const userId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDatabase()
    .db('clotheStore')
    .collection('users')
    .deleteOne({
      _id: userId,
    })
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the user')
  }
}

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
}
