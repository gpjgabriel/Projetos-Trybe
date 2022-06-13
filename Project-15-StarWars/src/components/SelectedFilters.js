import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

const INITIAL_STATE_FILTERS = {
  filterByName: { name: '' },
  filterByNumericValues: [],
};

const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function SelectedFilters() {
  const {
    data,
    setFilterActive,
    filterActive,
    setColumnsFilter,
    setDataFilter,
  } = useContext(PlanetContext);

  const updateDataFilter = (filterSelect, prevFiltersActive) => {
    const filterColumnRemove = prevFiltersActive
      .filter((filter) => (filter.column !== filterSelect));
    if (filterColumnRemove.length) {
      const filterDataUpdate = filterColumnRemove.map((filters) => {
        const filterData = data.filter((planet) => {
          if (filters.comparison === 'maior que') {
            return (Number(planet[filters.column])
              > Number(filters.value));
          }
          if (filters.comparison === 'menor que') {
            return (Number(planet[filters.column])
              < Number(filters.value));
          }
          if (filters.comparison === 'igual a') {
            return (Number(planet[filters.column])
              === Number(filters.value));
          }
          return planet;
        });
        return filterData;
      });
      setDataFilter(() => filterDataUpdate[0]);
    } else {
      setDataFilter(() => [...data]);
    }
  };

  const removeSelectedFilter = (filterSelect) => {
    // REMOVE O FILTRO SELECIONADO
    const selectedFilters = filterActive.filterByNumericValues
      .filter((filters) => (filters.column !== filterSelect));
    // console.log(selectedFilters);
    // ATUALIZA OS DADOS RENDERIZADOS NA TABELA
    updateDataFilter(filterSelect, filterActive.filterByNumericValues);
    // ATUALIZA A LISTA DE FILTROS ATIVOS SEM O FILTRO DELETADO
    setFilterActive((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...selectedFilters,
      ],
    }));
    // ATUALIZA A LISTA DE COLUNAS DO DROPDOWN ADICIONANDO O FILTRO DELETADO DE VOLTA A LISTA
    setColumnsFilter((prevState) => [...prevState, filterSelect]);
  };

  const removeAllFilters = () => {
    setFilterActive(() => INITIAL_STATE_FILTERS);
    setColumnsFilter(() => INITIAL_COLUMNS);
    setDataFilter(() => [...data]);
  };

  return (
    <section>
      <div>
        {filterActive.filterByNumericValues
          .map((filters) => (
            <span key={ filters.column } data-testid="filter">
              {` ${filters.column} ${filters.comparison} ${filters.value} `}
              <button
                type="button"
                onClick={ () => removeSelectedFilter(filters.column) }
              >
                X
              </button>
            </span>
          ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => removeAllFilters() }
        >
          Remover todas filtragens
        </button>
      </div>
    </section>
  );
}

export default SelectedFilters;
