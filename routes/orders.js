const router = require('express').Router();
const validation = require('../middleware/validate')
const ordersController = require('../controllers/orders');
const authenticate = require('../middleware/authenticate')

router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrder);
router.get('/name/:conditions', ordersController.getOrderByStatus)
router.post('/', authenticate.isAuthenticated, validation.validateOrders, ordersController.createOrder);
router.put('/:id', authenticate.isAuthenticated, validation.validateOrders, ordersController.updateOrder);
router.delete('/:id', authenticate.isAuthenticated, ordersController.deleteOrder);

module.exports = router;