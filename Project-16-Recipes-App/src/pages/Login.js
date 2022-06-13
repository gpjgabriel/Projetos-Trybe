import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Login() {
  const history = useHistory();
  const { setEmail, setPassword, disabled, email } = useContext(Context);

  return (
    <form>
      <h1>Login</h1>
      <input
        placeholder="Email"
        type="email"
        value={ email }
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        placeholder="Password"
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ () => {
          localStorage.setItem('mealsToken', 1);
          localStorage.setItem('cocktailsToken', 1);
          const user = {
            email,
          };
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/foods');
        } }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
