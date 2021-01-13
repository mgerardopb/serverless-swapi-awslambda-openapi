'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 
const Validator = require('../schemas/person');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * createPerson
 * 
 * @description Funcion para crear una nueva persona
 * @param {*} event 
 */
module.exports.createPerson = async (event, context, callback) => {
  const { firstName, lastName, email } = JSON.parse(event.body);
  try {
    const value = await Validator.validateAsync({firstName, lastName, email});
    const timestamp = new Date().getTime();
    const data = {
      id: uuid.v1(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      submittedAt: timestamp,
      updatedAt: timestamp,
    };
    const person = {
      TableName: process.env.PERSON_TABLE,
      Item: data,
    };
    await dynamoDb.put(person).promise()
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  } catch (err) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(err.details)
    });
  }
}

/**
 * listPerson
 * 
 * @description Funcion para listar personas
 * @param {*} event 
 */
module.exports.listPerson = async (event, context, callback) => {
    const person = {
      TableName: process.env.PERSON_TABLE,
      ProjectionExpression: "id, firstName, lastName, email"
    };
    const data = await dynamoDb.scan(person).promise()
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    });
}