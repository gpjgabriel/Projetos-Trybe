import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ACERTOS_MINIMOS = 3;

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.retornaAvatar();
  }

  retornaAvatar = () => {
    const { playerData: { gravatarEmail } } = this.props;
    const cryptoGravatar = md5(gravatarEmail).toString();
    this.setState({
      srcGravatar: `https://www.gravatar.com/avatar/${cryptoGravatar}`,
      loading: true,
    });
  }

  render() {
    const { playerData: { name, assertions, score } } = this.props;
    const { loading, srcGravatar } = this.state;
    return (
      <div>
        <header>
          {loading && (
            <img
              src={ srcGravatar }
              alt="foto de perfil"
              data-testid="header-profile-picture"
            />)}
          <h2 data-testid="header-player-name">{name}</h2>
          <p data-testid="header-score">{score}</p>
          <p data-testid="feedback-text">
            {assertions >= ACERTOS_MINIMOS ? 'Well Done!' : 'Could be better...'}
          </p>
        </header>
        <section>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </section>
        <section>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Play Again</button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ranking</button>
          </Link>
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: state.player,
});

Feedback.propTypes = {
  playerData: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
