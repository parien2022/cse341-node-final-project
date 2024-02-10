const router = require("express").Router();

const usersController = require('../controllers/users');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUser);

// router.post('/', validation.saveContact, usersController.createContact);

router.put("/:id", isAuthenticated, usersController.updateUser);
// router.put('/:id', validation.saveContact, usersController.updateContact);


router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;