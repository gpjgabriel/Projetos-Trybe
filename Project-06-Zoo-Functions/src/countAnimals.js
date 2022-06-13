const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (animal === undefined) {
    return data.species.reduce((objAnimals, valueAnimal) => {
      const obj = objAnimals;
      obj[valueAnimal.name] = valueAnimal.residents.length;
      return obj;
    }, {});
  } if (animal.sex === undefined) {
    return data.species.find((nameSpecie) => nameSpecie.name === animal.specie).residents.length;
  } return data.species.find((nameSpecie) => nameSpecie.name === animal.specie).residents
    .filter((sexSpecie) => sexSpecie.sex === animal.sex).length;
}

module.exports = countAnimals;
