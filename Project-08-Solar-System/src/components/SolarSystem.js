import React from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends React.Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        {
          planets.map((dataPlanets) => (
            <PlanetCard
              key={ dataPlanets.name }
              planetName={ dataPlanets.name }
              planetImage={ dataPlanets.image }
            />))
        }
      </div>
    );
  }
}

export default SolarSystem;
