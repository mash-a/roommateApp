const express = require('express');
const router = express.Router();
const choresController = require('../controllers/chores');

router.get('/', choresController.index);
router.get('/:id', choresController.show);
router.post('/', choresController.create);
router.put('/:id', choresController.update);
router.delete('/:id', choresController.destroy);

module.exports = router;
