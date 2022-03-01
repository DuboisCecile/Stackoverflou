import {
  createContext,
  useCallback,
  //  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
// import qs from 'query-string';
import API from '../APIClient';
// import history from '../history';

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  // const [savingProfile, setSavingProfile] = useState(false);
  const isLoggedIn = !!profile;
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

  const login = useCallback(async ({ email, password }) => {
    try {
      await API.post('api/users/login', { email, password });
      toast.success('Connexion réussie !');
      getProfile();
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
      // history.push('/');
    } catch (err) {
      toast.error('Impossible de se déconnecter !');
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        getProfile,
        isLoggedIn,
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
