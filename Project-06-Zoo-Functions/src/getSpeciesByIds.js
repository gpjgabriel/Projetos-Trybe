const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => species.filter((ListIds) => ids.includes(ListIds.id));

module.exports = getSpeciesByIds;
