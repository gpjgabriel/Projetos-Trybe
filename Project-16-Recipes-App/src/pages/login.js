import React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const redirectFoodDetails = (target) => {
    history.push(`/foods/${target.id}`);
  };

  const redirectDrinkDetails = (target) => {
    history.push(`/drinks/${target.id}`);
  };

  return (
    <div>
      Login
      <button
        type="button"
        id="52977"
        onClick={ ({ target }) => redirectFoodDetails(target) }
      >
        Corba
      </button>
      <button
        type="button"
        id="15997"
        onClick={ ({ target }) => redirectDrinkDetails(target) }
      >
        GG
      </button>
    </div>
  );
}

export default Login;
