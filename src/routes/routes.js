import { Route, Routes } from 'react-router-dom';
import AllWords from '../components/AllWords';
import WordDetails from '../components/WordsDetails';
import AddWord from '../components/AddWord';
import Search from '../components/Search';

const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/words" element={<AllWords />} />
      <Route path="/words/:word" element={<WordDetails />} />
      <Route path="/add-word" element={<AddWord />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default AppRoutes;
