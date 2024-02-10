//Valentina Bass
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Clothes']
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
  //#swagger.tags=['Clothes']
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothe id to find a clothe.');
  }
   const clothesId = new ObjectId(req.params.id)

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

const getSingleByCategory = async (req, res) => {
  //#swagger.tags=['Clothes']
  const categoryClothes = req.params.category;

  await mongodb
    .getDataBase()
    .db('clotheStore')
    .collection('clothes')
    .find({ category: categoryClothes })
    .toArray()
    .then((categoryClothe) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(categoryClothe[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const createClothes = async (req, res) => {
  //#swagger.tags=['Clothes']
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

    if (response.acknowledged) {
      res.status(201).json({ _id: response.insertedId })
    } else {
      res
        .status(500)
        .json(response.error || 'Some error ocurred while creating the clothe')
    }
};

const updateClothes = async (req, res) => {
  //#swagger.tags=['Clothes']
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothe id to update a clothe.');
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
    res.status(500).json(response.error || 'Some error occurred while updating the clothe.');
  }
};

const deleteClothes = async (req, res) => {
  //#swagger.tags=['Clothes']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid clothes id to delete a clothe.');
  }
  const clothesId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db('clotheStore')
    .collection('clothes')
    .deleteOne({
      _id: clothesId,
    })
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the clothe')
  }
};
module.exports = {
  getAll,
  getSingle,
  createClothes,
  updateClothes,
  deleteClothes,
  getSingleByCategory
};
