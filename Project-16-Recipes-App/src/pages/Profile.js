import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import Context from '../context/Context';

function Profile() {
  const history = useHistory();
  const { setEmail, emailProfile, setEmailProfile } = useContext(Context);

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailProfile(userEmail);
    }
  }, []);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{emailProfile.email}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          setEmail('');
          history.push('/');
        } }
      >
        Logout
      </button>
      <BottomMenu />
    </div>
  );
}

export default Profile;

// teste falhando
