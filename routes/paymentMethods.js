const express = require('express')
const paymentController = require('../controllers/paymentMethods')
const validation = require('../middleware/validate')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', paymentController.getAll)
router.get('/:id', paymentController.getSingleById)
router.get('/name/:card_number', paymentController.getSingleByCard)
router.post('/', authenticate.isAuthenticated, validation.validatePaymentMethod, paymentController.createPaymentMethod)
router.put('/:id', authenticate.isAuthenticated, validation.validatePaymentMethod, paymentController.updatePaymentMethod)
router.delete('/:id', authenticate.isAuthenticated, paymentController.deletePaymentMethod)

module.exports = router
