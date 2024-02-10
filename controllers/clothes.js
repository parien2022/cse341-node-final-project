const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDataBase().db().collection('clothes').find();
  result.toArray().then((lists, err) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to find a clothes.');
  }
  const clothesId = new ObjectId(req.params.id);
  const result = await mongodb.getDataBase().db().collection('clothes').find({ _id: clothesId });
  result.toArray().then((lists, err) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createClothes = async (req, res) => {
  const clothes = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
  };
  const response = await mongodb.getDataBase().db().collection('clothes').insertOne(clothes);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the clothe.');
  }
};

const updateClothes = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to update a movie.');
  }
 
  const clothesId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const clothes = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
  
  };
  const response = await mongodb
    .getDataBase()
    .db()
    .collection('clothes')
    .replaceOne({ _id: userId }, clothes);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
};

const deleteClothes = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to delete a movie.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDataBase().db().collection('clothes').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the clothes.');
  }
};
module.exports = {
  getAll,
  getSingle,
  createClothes,
  updateClothes,
  deleteClothes
};
