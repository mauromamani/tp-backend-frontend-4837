const { response } = require('express');
const Person = require('../models/Person');

// Method: POST
// Name: createPerson
const createPerson = async (req, res = response) => {
  const data = req.body;
  try {
    const person = await Person.findOne({
      $or: [{ nroDocumento: data.nroDocumento }, { email: data.email }],
    });

    if (person) {
      res.status(400).json({
        status: 400,
        message:
          'person already exists with those fields (email || nroDocumento)',
      });
      return;
    }

    const newPerson = new Person(data);
    await newPerson.save();

    res.status(201).json({
      status: 201,
      message: 'person created successfully',
      data: {
        person: newPerson,
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
// Name: getAllPeople
const getAllPeople = async (_req, res = response) => {
  try {
    const people = await Person.find();
    const totalPeople = await Person.countDocuments();

    res.status(200).json({
      status: 200,
      data: {
        people,
        total_people: totalPeople,
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
// Name: getPersonByDni
const getPersonByDni = async (req, res = response) => {
  const { dni } = req.params;

  try {
    const person = await Person.findOne({ nroDocumento: dni });
    if (!person) {
      res.status(404).json({
        status: 404,
        message: 'person not found',
      });

      return;
    }

    res.status(200).json({
      status: 200,
      data: {
        person,
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

module.exports = { createPerson, getAllPeople, getPersonByDni };
