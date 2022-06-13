const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) =>
  data.species.find((nameAnimal) => nameAnimal.name === animal)
    .residents.every((listAges) => listAges.age >= age);

module.exports = getAnimalsOlderThan;
