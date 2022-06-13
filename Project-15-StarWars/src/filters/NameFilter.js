import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function NameFilter() {
  const {
    data,
    setFilterActive,
    filterActive,
    setDataFilter,
  } = useContext(PlanetContext);

  const filterInputName = (value) => {
    setFilterActive((prevState) => ({
      ...prevState,
      filterByName: { name: value },
    }));

    const filterDataName = data.filter((planet) => (
      planet.name.includes(value)
    ));
    setDataFilter(() => [...filterDataName]);
  };

  return (
    <section>
      <label htmlFor="name-filter">
        Nome:
        <input
          data-testid="name-filter"
          value={ filterActive.filterByName.name }
          onChange={ ({ target }) => filterInputName(target.value) }
          type="text"
          placeholder="Pesquisar Planeta"
        />
      </label>
    </section>
  );
}

export default NameFilter;
