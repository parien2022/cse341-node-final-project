const express = require('express')
const paymentController = require('../controllers/paymentMethods')
const validation = require('../middleware/validate')
//const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', paymentController.getAll)
router.get('/:id', paymentController.getSingleById)
router.get('/name/:method_name', paymentController.getSingleByName)
router.post('/', validation.validatePaymentMethod, paymentController.createPaymentMethod)
router.put('/:id', validation.validatePaymentMethod, paymentController.updatePaymentMethod)
router.delete('/:id', paymentController.deletePaymentMethod)

module.exports = router
