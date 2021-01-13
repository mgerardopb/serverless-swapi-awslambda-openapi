const { expect, describe } = require("@jest/globals");
const { translate } = require("../adapter/films");

describe('@films Adapter', () => {
  test('Debe traducir el nombre de los campos de ingles a español', () => {
    const model = {
      'characters': 'Luke Skywalker',
      'created': '25-02-2020',
      'director': 'George Lucas'
    };
    const expected = {
      'caracteres': 'Luke Skywalker',
      'creado': '25-02-2020',
      'director': 'George Lucas'
    }
    expect(translate(model)).toEqual(expected);
  })

  test('Debe retornar el mismo nombre del campo en caso no este mapeado su traduccion', () => {
    const model = {
      'characters': 'Luke Skywalker',
      'director': 'George Lucas',
      'releasedate': '25-02-2020'
    };
    const expected = {
      'caracteres': 'Luke Skywalker',
      'director': 'George Lucas',
      'releasedate': '25-02-2020'
    }
    expect(translate(model)).toEqual(expected);
  })

  test('Debe retornar {} en caso valor del campo es null o undefined', () => {
    const expected = {}
    expect(translate(null)).toEqual(expected);
    expect(translate(undefined)).toEqual(expected);
  })
})