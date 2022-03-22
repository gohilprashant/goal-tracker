import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/loader/Loader';
import { useSelector } from 'react-redux';
function App() {
  const { loading } = useSelector((state) => state.ui);

  return (
    <div className='App'>
      <AppRouter />
      <ToastContainer position='top-center' autoClose={2500} />
      {loading && <Loader />}
    </div>
  );
}

export default App;
