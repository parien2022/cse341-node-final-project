const validator = require('../helpers/validate')

const validatePaymentMethod = async (req, res, next) => {
  const validationRule = {
    method: 'required|string',
    currency: 'required|string'
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

module.exports = {validatePaymentMethod}
