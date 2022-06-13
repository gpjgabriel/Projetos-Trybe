import React from 'react';
import PropTypes from 'prop-types';

class InputForm extends React.Component {
  render() {
    const {
      name,
      title,
      type,
      testid,
      onInputChange,
      value,
    } = this.props;

    return (
      <div>
        <label htmlFor={ testid }>
          { title }
          <input
            name={ name }
            type={ type }
            id={ testid }
            data-testid={ testid }
            value={ value }
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

InputForm.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.string,
  // hasTrunfo: PropTypes.string,
  isSaveButtonDisabled: PropTypes.string,
  onInputChange: PropTypes.string,
  onSaveButtonClick: PropTypes.string,
}.isRequired;

export default InputForm;
