const { expect, describe } = require("@jest/globals");
const { translate } = require("../adapter/people");

describe('@people Adapter', () => {
  test('Debe traducir el nombre de los campos de ingles a español', () => {
    const model = {
      'birth_year': '25-02-2020',
      'eye_color': 'brown',
      'gender': 'male'
    };
    const expected = {
      'fecha_nacimiento': '25-02-2020',
      'color_ojo': 'brown',
      'genero': 'male'
    }
    expect(translate(model)).toEqual(expected);
  })

  test('Debe retornar el mismo nombre del campo en caso no este mapeado su traduccion', () => {
    const model = {
      'birthyear': '25-02-2020',
      'eyecolor': 'brown',
      'gender': 'male'
    };
    const expected = {
      'birthyear': '25-02-2020',
      'eyecolor': 'brown',
      'genero': 'male'
    }
    expect(translate(model)).toEqual(expected);
  })

  test('Debe retornar {} en caso valor del campo es null o undefined', () => {
    const expected = {}
    expect(translate(null)).toEqual(expected);
    expect(translate(undefined)).toEqual(expected);
  })
})