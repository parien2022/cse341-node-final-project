const router = require("express").Router();
const validation = require('../middleware/validate')
const usersController = require('../controllers/users');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', validation.validateUsers, usersController.createUser);

// router.post('/', validation.saveContact, usersController.createContact);

router.put("/:id", validation.validateUsers, usersController.updateUser);
// router.put('/:id', validation.saveContact, usersController.updateContact);


router.delete('/:id', usersController.deleteUser);

module.exports = router;