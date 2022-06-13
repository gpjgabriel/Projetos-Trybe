const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  if (employeeName !== undefined) {
    return data.employees.find((listName) => (
      listName.firstName === employeeName || listName.lastName === employeeName));
  } return {};
};

module.exports = getEmployeeByName;
