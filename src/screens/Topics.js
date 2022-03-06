import { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import API from '../APIClient';

export default function Topics() {
  const { profile } = useContext(CurrentUserContext);
  const [topicsList, setTopicsList] = useState(null);

  useEffect(() => {
    API.get(`/api/topics`)
      .then((res) => {
        setTopicsList(res.data);
      })
      .catch((err) => console.error(err));
  }, [profile]);

  return (
    <div className="w-full justify-start">
      <div className="my-4 text-center text-3xl font-extrabold ">
        Liste des topics
      </div>
      <div className="my-4 absolute text-3xl font-extrabold ">
        <NavLink
          // className="logo-font text-white text-3xl md:text-6xl"
          path="/createTopic"
          to="/createTopic"
        >
          <FaPlusCircle />
        </NavLink>
      </div>

      {topicsList && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full md:w-9/12">
            <ul>
              {topicsList
                .sort(
                  (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
                )
                .map((topic) => {
                  return (
                    <li key={topic.id} className="relative mb-6">
                      <div className="p-5 bg-white rounded-lg w-full flex flex-col gap-4 items-center md:flex-row md:transform transition duration-500 hover:scale-95 lg:transform lg:hover:scale-105">
                        <div className="flex flex-col w-full">
                          <div className="font-bold text-xl">{topic.title}</div>
                          <div>{topic.description}</div>
                          <div>
                            {`Créé le ${new Intl.DateTimeFormat('fr-FR', {
                              dateStyle: 'full',
                              timeStyle: 'medium',
                            }).format(new Date(topic.creationDate))} par ${
                              topic.author?.nickname
                            }`}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
