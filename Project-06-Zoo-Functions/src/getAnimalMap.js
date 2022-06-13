const data = require('../data/zoo_data');

// const arrResult = {
//   NE: '',
//   NW: '',
//   SE: '',
//   SW: '',
// };

function listNameLocation(regiao) {
  const listLocation = data.species.filter(({ location }) => (location === `${regiao}`));
  // const listName = listLocation.map(({ name }) => name);
  return listLocation;
}

function getAnimalMap(options) {
  if (options === undefined) {
    return listNameLocation('NE');
  }
//   // console.log(data.species[0].name);
}

// console.log(getAnimalMap());

module.exports = getAnimalMap;
