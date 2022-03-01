import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  faExclamationTriangle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PasswordStrengthBar from 'react-password-strength-bar';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Register() {
  const { createProfile } = useContext(CurrentUserContext);
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const confirm = (form) => {
    if (password !== confirmedPassword) {
      toast.error('Les mots de passe ne sont pas identiques');
    } else {
      const newForm = { ...form, registeredAt: new Date() };
      createProfile(newForm);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className=" flex flex-col min-w-0 w-full md:w-1/2 lg:w-1/3 shadow-lg rounded-lg bg-blue-500 border-0">
        <form
          onSubmit={handleSubmit(confirm)}
          className="flex-auto p-10 text-white"
          action="send"
          method="POST"
        >
          <div className="mb-3 text-center text-2xl font-extrabold ">
            Créez votre compte
          </div>
          <div className="flex gap-3 mb-3">
            <div className="w-1/2">
              <label htmlFor="firstname">
                Prénom
                <input
                  type="text"
                  required
                  className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                  placeholder="John"
                  {...register('firstname')}
                />
              </label>
            </div>
            <div className="w-1/2">
              <label htmlFor="lastname">
                Nom
                <input
                  type="text"
                  required
                  className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                  placeholder="Doe"
                  {...register('lastname')}
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email-address">
              Surnom
              <input
                name="nickname"
                type="text"
                required
                className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                placeholder="Jojo"
                {...register('nickname')}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Adresse Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                placeholder="John.doe@example.com"
                {...register('email')}
              />
            </label>
          </div>
          <div className="relative w-full mb-3">
            <label htmlFor="password">
              Mot de passe
              <div className="flex justify-end">
                <FontAwesomeIcon
                  className="absolute cursor-pointer flex z-50 mt-6 mr-3 text-black"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                />
                <input
                  className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                  name="password"
                  autoComplete="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  placeholder="********"
                  {...register('password', {
                    required: 'Champ obligatoire !',
                    minLength: {
                      value: 8,
                    },
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmedPassword">
              Veuillez confirmer votre mot de passe
              <input
                className="w-full border-0 mt-2 p-3 text-black bg-white rounded text-sm shadow"
                name="confirmedPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmedPassword}
                required
                placeholder="********"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            {/* <PasswordStrengthBar
              password={password}
              minLength={8}
              scoreWords={[
                'Trop faible',
                'Faible',
                'Moyen',
                'Fort',
                'Très fort',
              ]}
              shortScoreWord={['Trop court']}
            /> */}
            {errors.password && (
              <div className="text-danger mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} /> 8 caractères
                minimum
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-blue-300 hover:bg-blue-900"
            >
              Créer
            </button>
          </div>
        </form>
        {/* </div>
        </div> */}
      </div>
    </div>
  );
}
