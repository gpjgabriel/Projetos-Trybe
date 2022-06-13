import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste da página Explore.js', () => {
  it('há dois botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const exploreFoodsBtn = screen.getByTestId('explore-foods');
    expect(exploreFoodsBtn).toBeInTheDocument();

    const exploreDrinksBtn = screen.getByTestId('explore-drinks');
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  it('o botão "Explore Foods" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const exploreFoodsBtn = screen.getByTestId('explore-foods');
    userEvent.click(exploreFoodsBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods');
  });

  it('o botão "Explore Drinks" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const exploreDrinksBtn = screen.getByTestId('explore-drinks');
    userEvent.click(exploreDrinksBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
