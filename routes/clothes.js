const router = require("express").Router();

const clothesController = require('../controllers/clothes');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clothesController.getAll);
router.get('/:id', clothesController.getSingle);
router.post('/', isAuthenticated, clothesController.createClothes);
router.put("/:id", isAuthenticated, clothesController.updateClothes);
router.delete('/:id', isAuthenticated, clothesController.deleteClothes);

module.exports = router;