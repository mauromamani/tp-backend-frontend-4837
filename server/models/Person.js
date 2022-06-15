const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
  apellido: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  nroDocumento: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model('Person', PersonSchema, 'people');
