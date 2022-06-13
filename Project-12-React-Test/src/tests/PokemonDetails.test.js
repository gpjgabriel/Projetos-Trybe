import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import App from '../App';

describe('Testa do componente PokemonDetails.js', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
      userEvent.click(moreDetailsLink);

      const pokemonDetails = screen.getByRole(
        'heading', { name: 'Pikachu Details', level: 2 },
      );
      expect(pokemonDetails).toBeInTheDocument();
      expect(moreDetailsLink).not.toBeInTheDocument();

      const summarySection = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(summarySection).toBeInTheDocument();

      const haveTagP = screen.getByText((content, element) => element
        .tagName.toLowerCase() === 'p' && content.includes('This intelligent Pokémon'));
      expect(haveTagP).toBeInTheDocument();
    });

  test(`Testa se existe na página uma seção com os mapas 
    contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);

    const locationTitle = screen.getByRole(
      'heading', { name: 'Game Locations of Pikachu', level: 2 },
    );
    expect(locationTitle).toBeInTheDocument();

    const locationImg = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationImg).toHaveLength(2);
    expect(locationImg[0]).toBeInTheDocument();
    expect(locationImg[1]).toBeInTheDocument();

    const locationLinks = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(locationImg[0].src).toBe(locationLinks[0]);
    expect(locationImg[1].src).toBe(locationLinks[1]);
  });

  test(`Testa se o usuário pode favoritar um pokémon 
    através da página de detalhes.`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);

    const pokemonNameFavorite = screen.getByAltText(/pikachu is marked as favorite/i);
    userEvent.click(checkFavorite);
    expect(pokemonNameFavorite).not.toBeInTheDocument();
  });
});
