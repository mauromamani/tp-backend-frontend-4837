const { Router } = require('express');
const {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
} = require('../controllers/books');

const router = Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
