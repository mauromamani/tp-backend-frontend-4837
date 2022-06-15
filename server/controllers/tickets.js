const Ticket = require('../models/Ticket');
const Person = require('../models/Person');
const { response } = require('express');

// Method: POST
// Name: createTicket
const createTicket = async (req, res = response) => {
  const data = req.body;

  try {
    const person = await Person.findById(data.pasajero);
    if (!person) {
      res.status(404).json({
        status: 404,
        message: 'person not found',
      });

      return;
    }

    const newTicket = new Ticket(data);
    await newTicket.save();

    res.status(201).json({
      status: 201,
      message: 'ticket created successfully',
      data: {
        ticket: newTicket,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: GET
// Name: getAllTickets
// Query: { categoriaPasajero: enum("M", "A", "J") }
const getAllTickets = async (req, res = response) => {
  const { categoria } = req.query;
  const query = {};

  if (categoria) {
    query.categoriaPasajero = categoria;
  }

  try {
    const tickets = await Ticket.find(query).populate('pasajero');
    const totalTickets = await Ticket.countDocuments(query);

    res.status(200).json({
      status: 200,
      data: {
        tickets,
        total_tickets: totalTickets,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: GET
// Name: getTicketById
const getTicketById = async (req, res = response) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      res.status(404).json({
        status: 404,
        message: 'ticket not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      data: {
        ticket,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: DELETE
// Name: deleteTicket
const deleteTicket = async (req, res = response) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res.status(404).json({
        status: 404,
        message: 'ticket not found',
      });
      return;
    }

    await Ticket.deleteOne({ id });

    res.status(200).json({
      status: 200,
      message: 'ticket deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

// Method: PUT
// Name: updateTicket
const updateTicket = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...data } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedTicket) {
      res.status(404).json({
        status: 404,
        message: 'ticket not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'ticket updated successfully',
      data: {
        ticket: updatedTicket,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
  getTicketById,
};
