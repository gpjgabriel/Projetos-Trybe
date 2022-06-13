import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankingOrdenado: [],
    };
  }

  componentDidMount() {
    this.organizaRanking();
  }

  organizaRanking() { // obs: verificar se as infomacoes do player atual ja chegam aq no localStorage
    const rankingLS = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrdenado = rankingLS.sort((a, b) => b.score - a.score);
    this.setState({
      rankingOrdenado,
    });
  }

  render() {
    const { rankingOrdenado } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {rankingOrdenado.map((player, index) => (
            <div key={ player.name }>
              <img alt="foto-player" src={ player.url } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>))}
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
