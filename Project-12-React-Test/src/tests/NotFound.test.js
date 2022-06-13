import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../function/renderWithRouter';
import { NotFound } from '../components';

describe('Teste do componente NotFound.js', () => {
  test(`Teste se página contém um heading h2 com o texto 
    Page requested not found`, () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageName = screen.getByRole('img', { name: /page requested was not found/i });
    // console.log(imageName);
    expect(imageName.src).toBe(imgLink);
  });
});
