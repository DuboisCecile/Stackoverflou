import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import qs from 'query-string';
import API from '../APIClient';

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const history = useNavigate();
  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  // const [savingProfile, setSavingProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getProfile = useCallback(async () => {
    setLoadingProfile(true);
    let data = null;
    try {
      data = await API.get('api/users/currentUser').then((res) => res.data);
      setProfile(data);
    } catch (err) {
      window.console.error(err);
    } finally {
      setLoadingProfile(false);
    }
    return data;
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      await API.post('api/users/login', { email, password });
      toast.success('Connexion réussie !');
      getProfile();
      history('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Email ou mot de passe incorrect !');
      } else window.console.error(err);
    }
  });

  const logout = useCallback(async () => {
    try {
      await API.get('api/users/logout');
      toast.success('Vous vous êtes déconnecté !');
      // setShowModal(false);
      setProfile(undefined);
      history('/');
    } catch (err) {
      toast.error('Impossible de se déconnecter !');
    }
  }, []);

  const createProfile = useCallback(async (form) => {
    try {
      await API.post('api/users/signup', form);
      toast.success('Utilisateur ajouté !');
      history('/');
    } catch (err) {
      toast.error('Il y a eu une erreur lors de la création de votre compte.');
    }
  });

  return (
    <CurrentUserContext.Provider
      value={{
        createProfile,
        getProfile,
        // isLoggedIn,
        loadingProfile,
        login,
        logout,
        profile,
        setShowModal,
        showModal,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
