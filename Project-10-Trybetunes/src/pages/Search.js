import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Loading from '../component/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHAR_NAME = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disenableBtnSearch: true,
      searchName: '',
      hideInputBtn: false,
      returnSearch: [],
      printSearch: false,
    };

    this.inputName = this.inputName.bind(this);
  }

  btnSearch = () => {
    this.setState({
      hideInputBtn: true,
    }, async () => {
      const { searchName } = this.state;
      const returnSearch = await searchAlbumsAPI(searchName);
      this.setState({
        hideInputBtn: false,
        returnSearch,
        printSearch: true,
      });
    });
  }

  inputName({ target }) {
    if (target.value.length >= MIN_CHAR_NAME) {
      return (
        this.setState({
          disenableBtnSearch: false,
          searchName: target.value,
        })
      );
    } this.setState({ disenableBtnSearch: true });
  }

  render() {
    const {
      disenableBtnSearch,
      searchName,
      hideInputBtn,
      printSearch,
      returnSearch,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {hideInputBtn ? <Loading /> : (
          <form>
            <label htmlFor="-search-artist-input">
              <input
                type="text"
                id="-search-artist-input"
                data-testid="search-artist-input"
                placeholder="Nome do Artista ou Banda"
                // value={ clearValue && clearSearch }
                onChange={ this.inputName }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disenableBtnSearch }
              onClick={ this.btnSearch }
            >
              Pesquisar
            </button>
          </form>
        )}
        {printSearch && (
          returnSearch.length === 0 ? <h3>Nenhum álbum foi encontrado</h3>
            : (
              <div>
                {`Resultado de álbuns de: ${searchName}`}
                { returnSearch.map((artist) => (
                  <div key={ artist.collectionId }>
                    <Link
                      to={ `/album/${artist.collectionId}` }
                      data-testid={ `link-to-album-${artist.collectionId}` }
                    >
                      { artist.collectionName }
                    </Link>
                  </div>
                )) }
              </div>
            )
        )}
      </div>
    );
  }
}

export default Search;
