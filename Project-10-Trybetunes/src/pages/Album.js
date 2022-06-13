import React from 'react';
import propTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../component/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      returnList: [],
      artistName: '',
      albumName: '',
      loading: false,
      favoriteList: [],
    };

    this.listAlbum = this.listAlbum.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }

  componentDidMount() {
    this.listAlbum();
  }

  listAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const returnGetMusic = await getMusics(id);
    const addFavoriteKey = returnGetMusic.map((music) => {
      music.favoriteSong = false;
      return music;
    });
    this.setState((prevState) => ({
      returnList: addFavoriteKey,
      artistName: addFavoriteKey[0].artistName,
      albumName: addFavoriteKey[0].collectionName,
      loading: !prevState.loading,
    }), async () => {
      const listFavorites = await getFavoriteSongs();
      if (listFavorites.wrapperType === 'track') {
        const addFavorites = addFavoriteKey.map((music) => {
          if (listFavorites.find((favorite) => favorite.trackId === music.trackId)) {
            music.favoriteSong = true;
          }
          return music;
        });
        this.setState({
          returnList: addFavorites,
        });
      }
      this.setState((prevState) => ({
        favoriteList: listFavorites,
        loading: !prevState.loading,
      }));
    });
  };

  loadFavorites() {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }), async () => {
      await getFavoriteSongs();
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { artistName, albumName, returnList, favoriteList, loading } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-album">
          <Header />
          <ul>
            <li data-testid="artist-name">
              { artistName }
            </li>
            <li data-testid="album-name">
              { albumName }
            </li>
          </ul>
          <MusicCard
            returnList={ returnList }
            favoriteList={ favoriteList }
            loadFavoriteFn={ this.loadFavorites }
          />
        </div>
      ));
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Album;
