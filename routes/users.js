const router = require("express").Router();
const validation = require('../middleware/validate')
const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate')

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', authenticate.isAuthenticated, validation.validateUsers, usersController.createUser);
router.put("/:id", authenticate.isAuthenticated, validation.validateUsers, usersController.updateUser);
router.delete('/:id', authenticate.isAuthenticated, usersController.deleteUser);

module.exports = router;