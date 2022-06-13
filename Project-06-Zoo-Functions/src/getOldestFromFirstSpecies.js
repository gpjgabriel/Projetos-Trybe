const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employeed = data.employees.find((listEmployees) => (
    listEmployees.id === id)).responsibleFor[0];
  const listAnimal = data.species.filter((specieId) => specieId.id === employeed)[0].residents
    .reduce((oldAnimal, ages) => {
      if (oldAnimal.age > ages.age) return oldAnimal;
      return ages;
    }); return Object.values(listAnimal);
}
// fim;
module.exports = getOldestFromFirstSpecies;
