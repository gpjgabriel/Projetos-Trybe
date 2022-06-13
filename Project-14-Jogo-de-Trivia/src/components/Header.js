import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { nome, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagemDoJogdor"
        />
        <p
          data-testid="header-player-name"
        >
          Nome:
          { nome }
        </p>
        <p
          data-testid="header-score"
        >
          {`Pontuação: ${score}`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.login.nome,
  email: state.login.email,
  score: state.player.score,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
