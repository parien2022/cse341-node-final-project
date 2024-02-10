//Valentina Bass
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('clothes')
    .find()
    .toArray()
    .then((clothes) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(clothes)
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
};

const getSingle = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid ID to find an clothes.");
    }

   const clothesId = new ObjectId(req.params.id)
  //  if (!ObjectId.isValid(req.params.id)) {
  //   res.status(400).json('Must use a valid clothes id to find a clothes.');
  //}
  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('clothes')
    .find({ _id: clothesId })
    .toArray()
    .then((clothe) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(clothe[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
};

const createClothes = async (req, res) => {
  const clothes = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
  };
 const response = await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('clothes')
    .insertOne(clothes)
  if (response.acknowledge) {
    res.status(201).json(response)
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while inserting the clothes')
  }
};

const updateClothes = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to update a clothes.');
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
    .replaceOne({ _id: clothesId }, clothes);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the clothes.');
  }
};

const deleteClothes = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to delete a clothes.');
  }
  const clothesId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db('clotheStore')
    .collection('clothes')
    .deleteOne({
      _id: clothesId,
    })
  if (response.deleteCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the clothes')
  }
};
module.exports = {
  getAll,
  getSingle,
  createClothes,
  updateClothes,
  deleteClothes
};
