import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/routes';
import { ModelProvider } from './context/modelContext';

function App() {
  return (
    <ModelProvider>
      <Router>
        <Navbar />
        <div className="content">
          <AppRoutes />
          <ToastContainer />
        </div>
      </Router>
    </ModelProvider>
  );
}

export default App;
