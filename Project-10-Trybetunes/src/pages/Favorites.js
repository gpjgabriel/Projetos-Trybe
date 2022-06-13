import React from 'react';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongs: [],
    };

    this.loadFavorites = this.loadFavorites.bind(this);
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }), async () => {
      const listFavorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: listFavorites,
      });
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-favorites">
          <Header />
          <MusicCard
            returnList={ favoriteSongs }
            loadFavoriteFn={ this.loadFavorites }
          />
        </div>
      ));
  }
}

export default Favorites;
