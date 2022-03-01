import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Logout from '../screens/Logout';

export default function Header() {
  const { profile } = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(false);

  const handleBurgerToggle = () => {
    setBurger(!burger);
  };

  const closeBurger = () => {
    setBurger(false);
  };

  return (
    <header className="w-full h-auto flex bg-blue-500">
      <div className="w-full px-4 justify-between items-center flex flex-wrap">
        <div className="my-4 w-full relative flex justify-between lg:w-auto lg:static lg:block ">
          <NavLink className="logo-font text-3xl md:text-6xl" path="/" to="/">
            Stackover<span className="blur-sm">flou</span>
          </NavLink>
          <button
            className="lg:hidden"
            type="button"
            onClick={handleBurgerToggle}
          >
            <FontAwesomeIcon
              className="flex text-white"
              icon={burger ? faTimes : faBars}
            />
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center ${
            burger ? ' flex' : ' hidden'
          }`}
        >
          <ul className="w-full flex flex-col lg:flex-row list-none lg:ml-auto lg:justify-end pb-3">
            {!profile && (
              <li>
                <NavLink
                  to="/register"
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={closeBurger}
                >
                  S'inscrire
                </NavLink>
              </li>
            )}
            {!profile && (
              <li>
                <NavLink
                  to="/login"
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={closeBurger}
                >
                  Se connecter
                </NavLink>
              </li>
            )}
            {/* <li>
              <NavLink
                to="/logout"
                className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                onClick={closeBurger}
              >
                Logout
              </NavLink>
            </li> */}
            {profile && (
              <li onClick={closeBurger} aria-hidden="true">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
