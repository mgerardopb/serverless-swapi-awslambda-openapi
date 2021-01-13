const { expect, describe } = require("@jest/globals");
const { createPerson, listPerson } = require("../api/person");
const AWS = require('aws-sdk');
jest.mock('aws-sdk');

const put = jest.fn();

AWS.DynamoDB.DocumentClient.prototype.put.mockImplementation((_, cb) => {
  cb(null, {});
});

AWS.DynamoDB.DocumentClient.prototype.scan.mockImplementation((_, cb) => {
  return {
    promise: jest.fn().mockReturnValue({ Items: [{
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: 'luke.skywalker@mail.com'
    }] })
  }
});

describe('@person #createPerson', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('Deber registrar la persona en la base de datos', async() => {
    const callback = jest.fn()
    const obj = '{"firstName": "Luke", "lastName": "Skywalker", "email": "luke.skywalker@mail.com"}';
    const objExpected = JSON.parse(obj);
    const result = await createPerson({body: obj}, null, callback)

    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls.length).toBe(1);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.firstName).toBe(objExpected.firstName);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.lastName).toBe(objExpected.lastName);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.email).toBe(objExpected.email);
    expect(callback.mock.calls.length).toBe(1);
  });
});


describe('@person #listPerson', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('Debe devovler la lista de personas de la base de datos', async() => {
    const callback = jest.fn()
    const result = await listPerson(null, null, callback);
    
    expect(AWS.DynamoDB.DocumentClient.prototype.scan.mock.calls.length).toBe(1);
    expect(callback.mock.calls.length).toBe(1);
  });
})