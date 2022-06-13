import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';
const PASSWORD_TEST = '1234567';

describe('Teste da página Profile.js', () => {
  it('o email da pessoa usuária está na tela', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);

    history.push('/profile');

    expect(screen.getByRole('heading', { level: 3, EMAIL_TEST })).toBeInTheDocument();
  });

  it('há um botão que redireciona para a página "Favorite Recipes"', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);

    history.push('/profile');

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    userEvent.click(favoriteBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('há um botão que redireciona para a página "Done Recipes"', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);

    history.push('/profile');

    const doneBtn = screen.getByRole('button', { name: /done/i });
    userEvent.click(doneBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  it('há um botão Logout que redireciona para a página "Login"', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);

    history.push('/profile');

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
