import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import icon from '../../images/shareIcon.svg';

function Card({
  index,
  id,
  category,
  name,
  image,
  doneDate,
  tags,
  type,
  nationality,
  alcoholicOrNot,
}) {
  const checkType = type === 'food' ? nationality : alcoholicOrNot;
  const [copy, setCopy] = useState(false);
  return (
    <li key={ id }>
      <Link key={ id } to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          width="100px"
          height="100px"
        />
        <p data-testid={ `${index}-horizontal-name` }>{`Nome: ${name}`}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`Categoria:  ${checkType} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Data: ${doneDate}`}</p>
      <span>
        Tags:
        {tags.map((tag) => (
          <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {` ${tag}`}
          </span>
        ))}
      </span>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ icon }
        onClick={ () => {
          navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
          // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
          setCopy(true);
        } }
      >
        Compartilhar
      </button>
      { copy && <p>Link copied!</p>}
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Card;
