import { ToastContainer } from 'react-toastify';
import Main from './Main';
import Header from './components/Header';

import CurrentUserContextProvider from './contexts/CurrentUserContext';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <CurrentUserContextProvider>
        <Header />
        <Main />
      </CurrentUserContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
    </div>
  );
}

export default App;
