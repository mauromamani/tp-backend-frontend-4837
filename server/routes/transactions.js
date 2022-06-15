const { Router } = require('express');
const {
  createTransaction,
  getTransactionsByEmail,
  getAllTransactions,
} = require('../controllers/transactions');

const router = Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:email', getTransactionsByEmail);

module.exports = router;
