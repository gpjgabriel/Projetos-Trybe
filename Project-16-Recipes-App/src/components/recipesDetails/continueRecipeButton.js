import React from 'react';

function ContinueRecipeButton() {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Continue Recipe
    </button>
  );
}

export default ContinueRecipeButton;
