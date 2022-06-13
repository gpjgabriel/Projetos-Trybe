import React from 'react';
import propTypes from 'prop-types';
import GameScreen from '../components/GameScreen';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <GameScreen history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default Game;
