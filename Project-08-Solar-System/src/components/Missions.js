import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissonCard from './MissionCard';

class Missions extends React.Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missões" />
        {missions.map((dataMissions) => (
          <MissonCard
            key={ dataMissions.name }
            name={ dataMissions.name }
            year={ dataMissions.year }
            country={ dataMissions.country }
            destination={ dataMissions.destination }
          />
        ))}
      </div>
    );
  }
}

export default Missions;
