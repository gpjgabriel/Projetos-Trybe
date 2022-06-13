import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      // Home DEVE SER o 1º
      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();
      // About DEVE SER o 2º
      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();
      // // Favorite Pokemon DEVE SER o 3º
      const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoriteLink).toBeInTheDocument();
    });

  test(`Testa se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`,
  () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const homeTitle = screen.getByRole('heading', { name: /Pokédex/i, level: 1 });
    expect(homeTitle).toBeInTheDocument();
  });

  test(`Testa se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`,
  () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  test(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegaçã`,
  () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);
    const favoriteTitle = screen.getByRole('heading',
      { name: /Favorite pokémons/i, level: 2 });
    expect(favoriteTitle).toBeInTheDocument();
  });

  test(`Testa se a aplicação é redirecionada para a página Not Found ao entrar
    em uma URL desconhecida`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFoundLink');
    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
