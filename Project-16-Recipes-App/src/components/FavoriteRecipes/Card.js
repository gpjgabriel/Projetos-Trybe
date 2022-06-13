import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconFav from '../../images/blackHeartIcon.svg';
import iconShare from '../../images/shareIcon.svg';

function Card({
  index,
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
}) {
  const checkType = type === 'food' ? nationality : alcoholicOrNot;
  const [copy, setCopy] = useState(false);
  return (
    <li key={ id } id={ id }>
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
      <button
        onClick={ () => {
          navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
          // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
          setCopy(true);
        } }
        src={ iconShare }
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
      { copy && <p>Link copied!</p>}
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="button"
        src={ iconFav }
        onClick={ () => {
          const elementoPai = document.getElementById(id);
          elementoPai.parentNode.removeChild(elementoPai);
          const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
            || JSON.parse(localStorage.getItem('setFavoritesRecipes'));
          if (getRecipes.length > 1) {
            const newFavorite = getRecipes.filter((value) => value.id !== id);
            console.log(newFavorite);
            localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
          } else {
            localStorage.setItem('favoriteRecipes', '[]');
          }
        } }
      >
        Desfavoritar
      </button>
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
