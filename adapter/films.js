const { reduce } = require('lodash')

/**
 * translate
 * 
 * @description Mapear los nombres de los atributos de ingles a español del servicio films de SWAPI
 * @param {Object} response - Objeto de respuesta del servicio films de SWAPI
 */
module.exports.translate = (response) => {
  const mapping = {
    'characters': 'caracteres',
    'created': 'creado',
    'director': 'director',
    'edited': 'modificado',
    'episode_id': 'episodio_identificador',
    'opening_crawl': 'rastreo',
    'planets': 'planetas',
    'producer': 'productor',
    'release_date': 'fecha_estreno',
    'species': 'especies',
    'starships': 'naves',
    'title': 'titulo',
    'url': 'url',
    'vehicles': 'vehiculos'
  }

  return reduce(response, (result, value, key) => {
    result[(mapping[key]) ? (mapping[key]): key] = value
    return result
  }, {})

}