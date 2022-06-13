const data = require('../data/zoo_data');

function Tuesday() {
  const objHours = `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability.includes('Tuesday'))
    .map((listAnimals) => listAnimals.name);
  const objTuesday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objTuesday;
}

function Wednesday() {
  const objHours = `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability
    .includes('Wednesday')).map((listAnimals) => listAnimals.name);
  const objWednesday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objWednesday;
}

function Thursday() {
  const objHours = `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability
    .includes('Thursday')).map((listAnimals) => listAnimals.name);
  const objThursday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objThursday;
}

function Friday() {
  const objHours = `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability
    .includes('Friday')).map((listAnimals) => listAnimals.name);
  const objFriday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objFriday;
}

function Saturday() {
  const objHours = `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability
    .includes('Saturday')).map((listAnimals) => listAnimals.name);
  const objSaturday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objSaturday;
}

function Sunday() {
  const objHours = `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close}pm`;
  const objAnimals = data.species.filter((dayAnimal) => dayAnimal.availability
    .includes('Sunday')).map((listAnimals) => listAnimals.name);
  const objSunday = {
    officeHour: objHours,
    exhibition: objAnimals,
  };
  return objSunday;
}

function Monday() {
  const objMonday = {
    officeHour: 'CLOSED',
    exhibition: 'The zoo will be closed!',
  };
  return objMonday;
}

function daysWeek() {
  const days = {
    Tuesday: Tuesday(),
    Wednesday: Wednesday(),
    Thursday: Thursday(),
    Friday: Friday(),
    Saturday: Saturday(),
    Sunday: Sunday(),
    Monday: Monday(),
  };
  return days;
}

function getSchedule(scheduleTarget) {
  const animals = data.species.find((nameAnimal) => nameAnimal.name === scheduleTarget);
  if (Object.keys(daysWeek()).includes(scheduleTarget)) {
    const days = Object(daysWeek());
    return { [scheduleTarget]: days[scheduleTarget] };
  } if (scheduleTarget === undefined || animals === undefined) {
    return daysWeek();
  } return animals.availability;
}

module.exports = getSchedule;
