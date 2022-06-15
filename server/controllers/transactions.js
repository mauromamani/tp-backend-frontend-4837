const { response } = require('express');
const Transaction = require('../models/Transaction');

// Method: POST
// Name: createTransaction
const createTransaction = async (req, res = response) => {
  const data = req.body;

  try {
    data.cantidadDestino = data.tasaConversion * data.cantidadOrigen;

    const newTransaction = new Transaction(data);
    await newTransaction.save();

    res.status(201).json({
      status: 201,
      message: 'transaction created successfully',
      data: {
        transaction: newTransaction,
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
// Name: getTransactionsByEmail
const getTransactionsByEmail = async (req, res = response) => {
  const { email } = req.params;

  try {
    const transactions = await Transaction.find({ emailCliente: email });
    const totalTransactions = await Transaction.countDocuments({
      emailCliente: email,
    });

    res.status(200).json({
      status: 200,
      data: {
        transactions,
        total_transactions: totalTransactions,
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
// Name: getAllTransactions
// Queries: { origen: string, destino: string }
const getAllTransactions = async (req, res = response) => {
  const { origen, destino } = req.query;
  const query = {};

  if (origen) {
    query.monedaOrigen = origen;
  }

  if (destino) {
    query.monedaDestino = destino;
  }

  try {
    const transactions = await Transaction.find(query);
    const totalTransactions = await Transaction.countDocuments(query);

    res.status(200).json({
      status: 200,
      data: {
        transactions,
        total_transactions: totalTransactions,
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
  createTransaction,
  getTransactionsByEmail,
  getAllTransactions,
};
