import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste da página ExploreFoods.js', () => {
  const HISTORYFOODS = '/explore/foods';
  it('há três botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYFOODS);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');
    expect(exploreByNationalityBtn).toBeInTheDocument();

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });
  it('há um botão que redireciona para ingredientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYFOODS);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredientBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
  it('há um botão que redireciona para nacionalidades', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYFOODS);

    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');
    userEvent.click(exploreByNationalityBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods/nationalities');
  });
  it('há um botão que redireciona para uma "surpresa"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORYFOODS);

    const exploreSurpriseBtn = await screen.findByTestId('explore-surprise');
    userEvent.click(exploreSurpriseBtn);

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });
});
