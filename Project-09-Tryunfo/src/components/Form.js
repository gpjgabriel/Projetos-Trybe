import React from 'react';
import PropTypes from 'prop-types';
import InputForm from './InputForm';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <fieldset>
        <legend>Definições da Carta</legend>
        <form>
          <InputForm
            name="cardName"
            title="Nome"
            type="text"
            testid="name-input"
            value={ cardName }
            onInputChange={ onInputChange }
          />
          <label htmlFor="Description">
            Descrição:
            <textarea
              name="cardDescription"
              data-testid="description-input"
              id="Description"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <InputForm
            name="cardAttr1"
            title="Atributo 1"
            type="number"
            testid="attr1-input"
            value={ cardAttr1 }
            onInputChange={ onInputChange }
          />
          <InputForm
            name="cardAttr2"
            title="Atributo 2"
            type="number"
            testid="attr2-input"
            value={ cardAttr2 }
            onInputChange={ onInputChange }
          />
          <InputForm
            name="cardAttr3"
            title="Atributo 3"
            type="number"
            testid="attr3-input"
            value={ cardAttr3 }
            onInputChange={ onInputChange }
          />
          <InputForm
            name="cardImage"
            title="Imagem"
            type="text"
            testid="image-input"
            value={ cardImage }
            onInputChange={ onInputChange }
          />
          <label htmlFor="Rarity">
            Raridade
            <select
              name="cardRare"
              data-testid="rare-input"
              id="Rarity"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          { hasTrunfo
            ? <span>Você já tem um Super Trunfo em seu baralho</span>
            : (
              <label htmlFor="trunfo-input">
                Super Trunfo
                <input
                  name="cardTrunfo"
                  type="checkbox"
                  id="trunfo-input"
                  data-testid="trunfo-input"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
              </label>
            )}
          <button
            type="submit"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </fieldset>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
