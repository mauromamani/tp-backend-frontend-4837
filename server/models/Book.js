const { Schema, model } = require('mongoose');

const BookSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  destacado: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = model('Book', BookSchema);
