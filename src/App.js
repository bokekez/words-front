import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/routes';

function App() {
  return (
    <Router>
        <Navbar />
        <div className="content">
          <AppRoutes />
          <ToastContainer />
        </div>
    </Router>
  );
}

export default App;