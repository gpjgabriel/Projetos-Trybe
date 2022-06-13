const data = require('../data/zoo_data');

function countEntrants(entrants) {
  return entrants.reduce((accObj) => {
    const obj = accObj;
    obj.child = entrants.filter((listAge) => listAge.age < 18).length;
    obj.adult = entrants.filter((listAge) => (listAge.age >= 18 && listAge.age < 50)).length;
    obj.senior = entrants.filter((listAge) => listAge.age >= 50).length;
    return obj;
  }, {});
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  } if (entrants.length > 0) {
    return [countEntrants(entrants)].reduce((acc, listEntrants) => {
      const { child, adult, senior } = listEntrants;
      return (child * 20.99) + (adult * 49.99) + (senior * 24.99);
    }, 0);
  }
  return 0;
}

module.exports = { calculateEntry, countEntrants };
