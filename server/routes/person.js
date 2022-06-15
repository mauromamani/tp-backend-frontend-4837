const { Router } = require('express');
const {
  createPerson,
  getAllPeople,
  getPersonByDni,
} = require('../controllers/person');

const router = Router();

router.post('/', createPerson);
router.get('/', getAllPeople);
router.get('/:dni', getPersonByDni);

module.exports = router;
