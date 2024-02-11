const router = require("express").Router();
const clothesController = require('../controllers/clothes');
const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clothesController.getAll);
router.get('/:id', clothesController.getSingle);
<<<<<<< HEAD
// router.get('/category/:category', clothesController.getSingleByCategory);
router.post('/', clothesController.createClothes);

// router.post('/', validation.saveContact, clothesController.createContact);

router.put("/:id", isAuthenticated, clothesController.updateClothes);
// router.put('/:id', validation.saveContact, clothesController.updateContact);


router.delete('/:id', isAuthenticated, clothesController.deleteClothes);
=======
router.get('/name/:category', clothesController.getSingleByCategory);
router.post('/', validation.validateClothes,clothesController.createClothes);
router.put("/:id", validation.validateClothes, clothesController.updateClothes);
router.delete('/:id', clothesController.deleteClothes);
>>>>>>> 2853b1024504ae11a633752ae427f7183850b1a2

module.exports = router;