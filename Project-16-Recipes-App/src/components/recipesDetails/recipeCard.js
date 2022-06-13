import React from 'react';
import propTypes from 'prop-types';
import { Card, CardGroup } from 'react-bootstrap';

function RecipeCard({ title, image, category, testid }) {
  return (
    <CardGroup style={ { width: '12rem' } }>
      <Card border="dark" data-testid={ testid }>
        <Card.Img
          variant="top"
          src={ image }
          alt={ title }
          data-testid="recipe-photo"
        />
        <Card.Body>
          <Card.Title data-testid="recipe-title">{ title }</Card.Title>
          <Card.Subtitle data-testid="recipe-category">{ category }</Card.Subtitle>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

RecipeCard.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  category: propTypes.string,
}.isRequired;

export default RecipeCard;
