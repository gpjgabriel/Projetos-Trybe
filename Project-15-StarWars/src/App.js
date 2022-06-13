import React from 'react';
import './App.css';
import FilterPlanets from './components/FilterPlanets';
import Table from './components/tablePlanets';
import SelectedFilters from './components/SelectedFilters';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <span>Project StarWars Search- GPJ</span>
        <FilterPlanets />
        <SelectedFilters />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
