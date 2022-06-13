import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
};

function NumericFilter() {
  const [stateColumn, setColumn] = useState(INITIAL_STATE.column);
  const [stateComparison, setComparison] = useState(INITIAL_STATE.comparison);
  const [stateValue, setValue] = useState(INITIAL_STATE.value);

  const {
    data,
    setFilterActive,
    dataFilter,
    setDataFilter,
    columnsFilter,
    setColumnsFilter,
  } = useContext(PlanetContext);

  const removeColumnSelect = (columnSelect) => {
    const filteredColumns = columnsFilter.filter((column) => (column !== columnSelect));
    setColumnsFilter(() => filteredColumns);
    setColumn(() => filteredColumns[0]);
    setComparison(() => INITIAL_STATE.comparison);
    setValue(() => INITIAL_STATE.value);
  };

  const btnFilterClick = () => {
    setFilterActive((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        {
          column: stateColumn,
          comparison: stateComparison,
          value: stateValue,
        },
      ],
    }));
    if (dataFilter.length === 0) {
      setDataFilter(() => [...data]);
    }
    const filterDataNumeric = dataFilter.filter((planet) => {
      if (stateComparison === 'maior que') {
        return (Number(planet[stateColumn]) > Number(stateValue));
      }
      if (stateComparison === 'menor que') {
        return (Number(planet[stateColumn]) < Number(stateValue));
      }
      if (stateComparison === 'igual a') {
        return (Number(planet[stateColumn]) === Number(stateValue));
      }
      return planet;
    });
    setDataFilter(() => [...filterDataNumeric]);
    removeColumnSelect(stateColumn);
  };

  return (
    <section>
      <select
        data-testid="column-filter"
        value={ stateColumn }
        name="column"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {columnsFilter.map((columns) => (
          <option key={ columns } value={ columns }>{ columns }</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ stateComparison }
        name="comparison"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option name="maior que" value="maior que">maior que</option>
        <option name="menor que" value="menor que">menor que</option>
        <option name="igual a" value="igual a">igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          name="value"
          type="number"
          value={ stateValue }
          onChange={ ({ target }) => setValue(target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => btnFilterClick() }
        // disabled={ ' ' }
      >
        Filter
      </button>
    </section>
  );
}

export default NumericFilter;
