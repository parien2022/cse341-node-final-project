const router = require("express").Router();
const clothesController = require('../controllers/clothes');
const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clothesController.getAll);
router.get('/:id', clothesController.getSingle);
router.get('/name/:category', clothesController.getSingleByCategory);
router.post('/', validation.validateClothes,clothesController.createClothes);
router.put("/:id", validation.validateClothes, clothesController.updateClothes);
router.delete('/:id', clothesController.deleteClothes);

module.exports = router;