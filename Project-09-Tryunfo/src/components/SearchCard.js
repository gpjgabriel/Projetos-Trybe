import React from 'react';
import PropTypes from 'prop-types';

class SearchCard extends React.Component {
  render() {
    const { searchCard } = this.props;
    return (
      <div>
        <label htmlFor="searchCard">
          Pesquisar
          <input
            type="text"
            id="searchCard"
            data-testid="name-filter"
            placeholder="Nome da Carta"
            onChange={ searchCard }
          />
        </label>
        <select
          name="cardRare"
          data-testid="rare-filter"
          onChange={ searchCard }
        >
          <option value="">todas</option>
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        <label htmlFor="trunfo-input">
          Super Trunfo
          <input
            name="cardTrunfo"
            type="checkbox"
            id="trunfo-input"
            data-testid="trunfo-filter"
            onChange={ searchCard }
          />
        </label>
      </div>
    );
  }
}

SearchCard.propTypes = {
  searchCard: PropTypes.func.isRequired,
};

export default SearchCard;
