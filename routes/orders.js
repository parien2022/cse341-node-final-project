const router = require('express').Router();
const validation = require('../middleware/validate')
const ordersController = require('../controllers/orders');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrder);
router.get('/name/:conditions', ordersController.getOrderByStatus)
router.post('/', validation.validateOrders, ordersController.createOrder);
router.put('/:id', validation.validateOrders, ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;