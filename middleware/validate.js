const validator = require('../helpers/validate')

const validatePaymentMethod = async (req, res, next) => {
  const validationRule = {
    method_name: 'required|string',
    issuer: 'required|string',
    card_number: 'required|string',
    expiration_date: 'required|string',
    cvv: 'required|string'
  }

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  }).catch((err) => console.log(err))
}


const validateOrders = async (req, res, next) => {
  const validateRule = {
    user: 'required|string',
    date: 'required|string',
    conditions: 'required|string',
  }

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  }).catch((err) => console.log(err))
}

const validateClothes = async (req, res, next) => {
  const validateRule = {
    title: 'required|string',
    price: 'required|number',
    category: 'required|string',
    description: 'required|string',
    image: 'required|string',
    conditions: 'required|string',
  }

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  }).catch((err) => console.log(err))
}

module.exports = {
  validatePaymentMethod,
  validateOrders,
  validateClothes
}