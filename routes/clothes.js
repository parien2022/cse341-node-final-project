const router = require("express").Router();

const clothesController = require('../controllers/clothes');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clothesController.getAll);

router.get('/:id', clothesController.getSingle);
router.get('/:category', clothesController.getSingleByCategory);
router.post('/', clothesController.createClothes);

// router.post('/', validation.saveContact, clothesController.createContact);

router.put("/:id", isAuthenticated, clothesController.updateClothes);
// router.put('/:id', validation.saveContact, clothesController.updateContact);


router.delete('/:id', isAuthenticated, clothesController.deleteClothes);

module.exports = router;