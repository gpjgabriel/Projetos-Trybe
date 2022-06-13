const data = require('../data/zoo_data');

const isManager = (id) =>
  data.employees.some((listManager) => listManager.managers.includes(id));

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) {
    return data.employees
      .filter((listManager) => listManager.managers.includes(managerId))
      .map((nome) => `${nome.firstName} ${nome.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
