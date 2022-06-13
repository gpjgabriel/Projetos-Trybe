import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons.js', () => {
  test(`Testa se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteNotFound).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(checkFavorite);
    const pokemonNameFavorite = screen.getByAltText(/is marked as favorite/i);
    // console.log(pokemonNameFavorite);

    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorites);

    const getPokemonName = screen.getByAltText(/is marked as favorite/i);
    expect(getPokemonName).toEqual(pokemonNameFavorite);
    // console.log(getPokemonName);
  });
});
