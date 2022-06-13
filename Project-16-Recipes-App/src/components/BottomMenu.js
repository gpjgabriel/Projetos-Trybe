import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Context from '../context/Context';

const BottomMenu = () => {
  const { setActiveFilter } = useContext(Context);
  return (
    <footer data-testid="footer">
      <section>
        <Link to="/drinks" onClick={ () => setActiveFilter('All') }>
          <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explore" onClick={ () => setActiveFilter('All') }>
          <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
        </Link>
        <Link to="/foods" onClick={ () => setActiveFilter('All') }>
          <img src={ mealIcon } alt="Food" data-testid="food-bottom-btn" />
        </Link>
      </section>
    </footer>
  );
};

export default BottomMenu;
