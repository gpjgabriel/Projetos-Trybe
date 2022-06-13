import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchPlanetsApi from '../services/fetchApiPlanets';

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

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(INITIAL_STATE_FILTERS);
  const [dataFilter, setDataFilter] = useState([]);
  const [columnsFilter, setColumnsFilter] = useState(INITIAL_COLUMNS);

  const getDataPlanetApi = async () => {
    try {
      const requestPlanetApi = await fetchPlanetsApi();
      const { results } = requestPlanetApi;
      const dataFilterResidents = results.map((list) => {
        delete list.residents;
        return list;
      });
      setData(() => [...dataFilterResidents]);
      setLoading((prevLoading) => !prevLoading);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPlanetApi();
  }, []);

  const allState = {
    data,
    loading,
    filterActive,
    setFilterActive,
    dataFilter,
    setDataFilter,
    columnsFilter,
    setColumnsFilter,
  };

  return (
    <PlanetContext.Provider value={ allState }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default PlanetsProvider;
