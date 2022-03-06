import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import API from '../APIClient';

export default function CreateTopic() {
  const { profile } = useContext(CurrentUserContext);
  const { register, handleSubmit } = useForm();

  const createTopic = (form) => {
    API.post('api/topics/create', form)
      .then(() => {
        toast.success('Votre topic a bien été ajouté !');
      })
      .catch(() => {
        toast.error("Il y a eu une erreur lors de l'ajout de votre topic");
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center items-stretch justify-items-stretch">
      <div className="my-4 text-center text-3xl font-extrabold ">
        Créer un topic
      </div>
      {profile ? (
        <form
          className="flex-auto p-10"
          onSubmit={handleSubmit(createTopic)}
          action="send"
          method="POST"
        >
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-xs font-bold mb-4"
              htmlFor="title"
            >
              Titre
              <input
                name="title"
                type="text"
                placeholder="Titre"
                {...register('title', {
                  required: 'Vous devez saisir un titre',
                })}
                className="w-full border-0 mt-2 p-3 bg-white rounded text-sm shadow"
              />
            </label>
          </div>

          <div className="relative w-full mb-3">
            <label
              htmlFor="description"
              className="block uppercase text-xs font-bold mb-4"
            >
              Description
              <textarea
                name="description"
                {...register('description', {
                  required: 'Vous devez saisir une description',
                })}
                className="h-28 w-full border-0 p-3 mt-2 bg-white rounded text-sm shadow"
              />
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-400  active:bg-blueGray600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            >
              Créer
            </button>
          </div>
        </form>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
