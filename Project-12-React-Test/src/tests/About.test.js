import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../function/renderWithRouter';
import About from '../components/About';

describe('Teste do componente About.js', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const contentAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(contentAbout).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const haveTwoTagP = screen.getAllByText((content, element) => element
      .tagName.toLowerCase() === 'p'
      && content.includes('Pokémons'));
    // Parte do código acima foi retirado da documentação do Testind Library (https://testing-library.com/docs/queries/about/#priority) Na parte TextMatch.
    expect(haveTwoTagP).toHaveLength(2);
    // console.log(haveTwoTagP);
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageName = screen.getByRole('img', { name: /Pokédex/i });
    // console.log(imageName);
    expect(imageName.src).toBe(imgLink);
  });
});
