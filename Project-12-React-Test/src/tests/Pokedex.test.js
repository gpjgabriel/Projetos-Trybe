import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import App from '../App';

const NUMBER_SEVEN = 7;
const POKEMON_NAME = 'pokemon-name';

describe('Testa do componente Pokedex.js', () => {
  test(`Testa se é exibido o próximo Pokémon da lista
    quando o botão Próximo pokémon é clicado`,
  () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toHaveTextContent('Pikachu');

    userEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent('Charmander');

    for (let index = 0; index <= NUMBER_SEVEN; index += 1) {
      userEvent.click(nextBtn);
    }
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonName).toHaveLength(1);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    for (let index = 0; index <= NUMBER_SEVEN; index += 1) {
      userEvent.click(nextBtn);
      expect(pokemonName).toHaveLength(1);
    }
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    const typesBtn = screen.getAllByTestId('pokemon-type-button');
    expect(typesBtn).toHaveLength(NUMBER_SEVEN);

    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    typesBtn.forEach((type, index) => {
      expect(type).toHaveTextContent(pokemonTypes[index]);
      const typeBtn = screen.getByRole('button', { name: pokemonTypes[index] });
      userEvent.click(typeBtn);
      const getPokemonType = screen.getByTestId('pokemon-type');
      expect(getPokemonType).toHaveTextContent(pokemonTypes[index]);
      expect(allBtn).toBeInTheDocument();
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstPokemonName = screen.getByTestId(POKEMON_NAME);
    expect(firstPokemonName).toHaveTextContent('Pikachu');
  });
});
