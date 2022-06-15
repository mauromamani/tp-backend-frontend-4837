const { Router } = require('express');
const {
  createTicket,
  getAllTickets,
  deleteTicket,
  updateTicket,
  getTicketById,
} = require('../controllers/tickets');

const router = Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.delete('/:id', deleteTicket);
router.put('/:id', updateTicket);

module.exports = router;
