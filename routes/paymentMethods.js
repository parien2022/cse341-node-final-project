const express = require('express')
const paymentController = require('../controller/paymentMethods')
const validation = require('../middleware/validate')
//const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', paymentController.getAll)
router.get('/:id', paymentController.getSingle)
router.post('/', validation.validatePaymentMethod, paymentController.createPaymentMethod)
router.put('/:id', validation.validatePaymentMethod, paymentController.updatePaymentMethod)
router.delete('/:id', paymentController.deletePaymentMethod)

module.exports = router
