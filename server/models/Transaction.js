const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({
  monedaOrigen: {
    type: String,
    required: true,
  },
  cantidadOrigen: {
    type: Number,
    required: true,
  },
  monedaDestino: {
    type: String,
    required: true,
  },
  cantidadDestino: {
    type: Number,
    required: true,
  },
  emailCliente: {
    type: String,
    required: true,
  },
  tasaConversion: {
    type: Number,
    required: true,
  },
});

module.exports = model('Transaction', TransactionSchema);
