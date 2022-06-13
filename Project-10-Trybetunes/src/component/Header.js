import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };

    this.returnUser = this.returnUser.bind(this);
  }

  componentDidMount() {
    this.returnUser();
  }

  returnUser = async () => {
    const nameUser = await getUser();
    this.setState({
      userName: nameUser.name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <div>
            <h4 data-testid="header-user-name">{ userName }</h4>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            {' '}
            <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
            {' '}
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
