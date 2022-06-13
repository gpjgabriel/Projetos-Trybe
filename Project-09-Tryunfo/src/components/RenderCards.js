import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class RenderCards extends React.Component {
  render() {
    const { saveCards, deleteCard } = this.props;
    return (
      <section>
        <ul>
          {saveCards.map((card) => (
            <li key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardImage={ card.cardImage }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                name={ card.cardName }
                type="submit"
                data-testid="delete-button"
                onClick={ deleteCard }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

RenderCards.propTypes = {
  saveCards: PropTypes.arrayOf(PropTypes.shape),
  deleteCard: PropTypes.func,
}.isRequired;

export default RenderCards;
