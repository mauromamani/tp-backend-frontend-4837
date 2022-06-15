const { Schema, model } = require('mongoose');

const TicketSchema = Schema({
  precioPasaje: {
    type: Number,
    required: true,
  },
  categoriaPasajero: {
    type: String,
    required: true,
    enum: ['M', 'A', 'J'],
  },
  fechaCompra: {
    type: String,
    required: true,
  },
  pasajero: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Person',
  },
});

module.exports = model('Ticket', TicketSchema);
