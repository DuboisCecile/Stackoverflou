import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function LoginCard() {
  const { login } = useContext(CurrentUserContext);
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        className="w-full flex items-center justify-center"
        // style={{
        //   backgroundImage: `url(${RegisterBg})`,
        // }}
      >
        <div className="relative flex flex-col min-w-0 w-full md:w-1/2 lg:w-3/12 shadow-lg rounded-lg bg-blue-500 border-0">
          <form
            className="mt-6 flex-auto px-10 py-10"
            onSubmit={handleSubmit(login)}
            action="send"
            method="POST"
          >
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-white text-xs font-bold mb-4"
                htmlFor="email"
              >
                Email
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Vous devez saisir un email',
                  })}
                  className="w-full border-0 mt-2 px-3 py-3  text-black bg-white rounded text-sm shadow"
                />
              </label>
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-white text-xs font-bold mb-4"
                htmlFor="password"
              >
                Mot de passe
                <div className="flex justify-end">
                  <FontAwesomeIcon
                    className="absolute cursor-pointer flex z-50 mt-6 mr-3 text-black"
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="********"
                    {...register('password', {
                      required: 'Vous devez saisir un mot de passe',
                    })}
                    className="w-full border-0 px-3 py-3 mt-2 text-black bg-white rounded text-sm shadow"
                  />
                </div>
              </label>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-400 text-white active:bg-blueGray600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
