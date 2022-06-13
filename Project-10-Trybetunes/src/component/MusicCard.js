import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  addRmFavoriteSong = ({ target }) => {
    const { returnList, loadFavoriteFn } = this.props;
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }), async () => {
      const id = Number(target.id);
      await returnList.map((arrMusic) => {
        if (arrMusic.trackId === id && arrMusic.favoriteSong === false) {
          arrMusic.favoriteSong = true;
          addSong(arrMusic);
        } else if (arrMusic.trackId === id) {
          arrMusic.favoriteSong = false;
          removeSong(arrMusic);
        }
        return arrMusic;
      });
      loadFavoriteFn();
      this.setState(() => ({
        loading: false,
      }));
    });
  }

  render() {
    const { loading } = this.state;
    const { returnList } = this.props;
    return (
      loading ? <Loading /> : (
        returnList.map((arrAlbum) => (
          (arrAlbum.wrapperType === 'track' && (
            <div key={ arrAlbum.trackId }>
              <h3>{ arrAlbum.trackName }</h3>
              <label htmlFor={ arrAlbum.trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ arrAlbum.trackId }
                  data-testid={ `checkbox-music-${arrAlbum.trackId}` }
                  onChange={ this.addRmFavoriteSong }
                  checked={ arrAlbum.favoriteSong }
                />
              </label>
              <audio data-testid="audio-component" src={ arrAlbum.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          )
          )
        ))
      ));
  }
}

MusicCard.propTypes = {
  returnList: propTypes.arrayOf(propTypes.object).isRequired,
  loadFavoriteFn: propTypes.func.isRequired,
};

export default MusicCard;
