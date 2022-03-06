import { Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Topics from './screens/Topics';
import CreateTopic from './screens/CreateTopic';

export default function Main() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/topics" element={<Topics />} />
      <Route exact path="/createTopic" element={<CreateTopic />} />
    </Routes>
  );
}
