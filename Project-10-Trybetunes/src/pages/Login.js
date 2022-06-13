import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';

const MIN_CHAR_NAME = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disenableBtnLogin: true,
      userName: '',
      loading: false,
      redirect: false,
    };

    this.inputName = this.inputName.bind(this);
  }

  btnEntrar = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  inputName({ target }) {
    if (target.value.length >= MIN_CHAR_NAME) {
      return (
        this.setState({
          disenableBtnLogin: false,
          userName: target.value,
        })
      );
    } this.setState({ disenableBtnLogin: true });
  }

  render() {
    const { disenableBtnLogin, loading, redirect } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <p>TrybeTunes-GPJ</p>
            Login
            <form>
              <label htmlFor="login-name-input">
                <input
                  type="text"
                  id="login-name-input"
                  data-testid="login-name-input"
                  placeholder="Nome"
                  onChange={ this.inputName }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ disenableBtnLogin }
                onClick={ this.btnEntrar }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
