import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllWords from './components/AllWords';
import WordDetails from './components/WordsDetails';
import AddWord from './components/AddWord';
import Navbar from './components/NavBar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/words" element={<AllWords />} />
            <Route path="/words/:word" element={<WordDetails />} />
            <Route path="/add-word" element={<AddWord />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;