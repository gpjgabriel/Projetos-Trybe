import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import App from '../App';

describe('Testa do componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const getPokemonName = screen.getByTestId('pokemon-name');
      expect(getPokemonName).toHaveTextContent('Pikachu');

      const getPokemonType = screen.getByTestId('pokemon-type');
      expect(getPokemonType).toHaveTextContent('Electric');

      const getPokemonWeight = screen.getByTestId('pokemon-weight');
      const valueWeight = '6.0';
      const measurementUnit = 'kg';
      expect(getPokemonWeight).toHaveTextContent(
        `Average weight: ${valueWeight} ${measurementUnit}`,
      );
      const getPokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
      const imgLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(getPokemonImg.src).toBe(imgLink);
      expect(getPokemonImg.alt).toBe('Pikachu sprite');
    });

  test(`Testa se o card do Pokémon indicado na Pokédex contém um link de navegação 
  para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, 
  onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toContainHTML('<a href="/pokemons/25">More details</a>');
  });

  test(`Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
    da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);
    const pokemonDetails = screen.getByRole(
      'heading', { name: 'Pikachu Details', level: 2 },
    );
    expect(pokemonDetails).toBeInTheDocument();
  });

  test(`Testa também se a URL exibida no navegador muda para /pokemon/<id>,
    onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);
    // const { location: { pathname } } = history;
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);
    // console.log(pathname);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(checkFavorite);

    const favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon.src).toContain('/star-icon.svg');
    // console.log(favIcon.alt);
    expect(favIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
