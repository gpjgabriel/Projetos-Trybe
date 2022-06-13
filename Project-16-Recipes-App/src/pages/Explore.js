import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => {
          history.push('/explore/foods');
        } }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => {
          history.push('/explore/drinks');
        } }
      >
        Explore Drinks
      </button>
      <BottomMenu />
    </div>
  );
}

export default Explore;
