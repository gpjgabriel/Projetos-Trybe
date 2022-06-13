import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';
const PASSWORD_TEST = '1234567';

describe('Teste da página Login.js', () => {
  it('há um campo input para email na tela e se é possível escrever nele', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_TEST);
    expect(inputEmail).toHaveValue(EMAIL_TEST);
  });

  it('há um campo input para senha na tela e se é possível escrever nele', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, PASSWORD_TEST);
    expect(inputPassword).toHaveValue(PASSWORD_TEST);
  });

  it('há um botão na tela e se ele inicia desabilitado', () => {
    renderWithRouter(<App />);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
  });

  it('quando o email e a senha forem válidos, o botão habilita', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    expect(buttonEnter).not.toBeDisabled();
  });

  it('ao clicar no botão de Enter é redirecionado para a página Foods', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);

    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
