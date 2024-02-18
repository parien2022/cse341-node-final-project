const router = require("express").Router();
const clothesController = require('../controllers/clothes');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/', clothesController.getAll);
router.get('/:id', clothesController.getSingle);
router.get('/name/:category', clothesController.getSingleByCategory);
router.post('/', authenticate.isAuthenticated, validation.validateClothes, clothesController.createClothes);
router.put("/:id", authenticate.isAuthenticated, validation.validateClothes, clothesController.updateClothes);
router.delete('/:id', authenticate.isAuthenticated, clothesController.deleteClothes);

module.exports = router;