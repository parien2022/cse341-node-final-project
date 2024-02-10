const router = require("express").Router();

const ordersController = require("../controllers/orders");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrder);
router.get("/status/:status", ordersController.getOrderByStatus)
router.post("/", isAuthenticated, ordersController.createOrder);
router.put("/:id", isAuthenticated, ordersController.updateOrder);
router.delete("/:id", isAuthenticated, ordersController.deleteOrder);

module.exports = router;