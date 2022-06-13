import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste da página ExploreDrinks.js', () => {
  const HISTORYDRINKS = '/explore/drinks';
  it('há dois botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYDRINKS);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });
  it('há um botão que redireciona para ingredientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYDRINKS);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredientBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
  it('há um botão que redireciona para uma "surpresa"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYDRINKS);

    const exploreSurpriseBtn = await screen.findByTestId('explore-surprise');
    userEvent.click(exploreSurpriseBtn);

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });
});
