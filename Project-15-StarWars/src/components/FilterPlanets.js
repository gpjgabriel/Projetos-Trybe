import React from 'react';
import NameFilter from '../filters/NameFilter';
import NumericFilter from '../filters/NumericFilter';

function FilterPlanets() {
  return (
    <div>
      <NameFilter />
      <NumericFilter />
    </div>
  );
}

export default FilterPlanets;
