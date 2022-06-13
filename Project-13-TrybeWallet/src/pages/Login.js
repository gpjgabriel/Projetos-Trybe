import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailLogin } from '../actions';

const MIN_LENGTH_PASSWD = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailIsValid: false,
      passwdIsValid: false,
      btnlock: true,
    };
  }

  validEmail = ({ target }) => {
    const regexValidEMail = /\S+@\S+\.\S+/;
    // A sintaxe do REGEX acima foi retirada do site: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validEmail = regexValidEMail.test(target.value);
    const { passwdIsValid } = this.state;
    this.setState({
      email: target.value,
      emailIsValid: validEmail,
      btnlock: (!(validEmail && passwdIsValid)),
    });
  }

  validPasswd = ({ target }) => {
    const validPasswd = (target.value.length > MIN_LENGTH_PASSWD);
    const { emailIsValid } = this.state;
    this.setState({
      passwdIsValid: validPasswd,
      btnlock: (!(emailIsValid && validPasswd)),
    });
  }

  btnClick = () => {
    const { history, inputEmail } = this.props;
    const { email } = this.state;
    inputEmail({ email });
    history.push('/carteira');
  }

  render() {
    const { btnlock } = this.state;

    return (
      <form name="form-login">
        <input
          type="text"
          name="email-input"
          data-testid="email-input"
          placeholder="Digite seu email de login"
          onChange={ this.validEmail }
        />
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
          placeholder="Senha"
          minLength="6"
          required
          onChange={ this.validPasswd }
        />
        <button
          type="button"
          disabled={ btnlock }
          onClick={ this.btnClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  inputEmail: (email) => dispatch(emailLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
