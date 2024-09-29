import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { ModelContext } from '../context/modelContext';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  const renderWithModelContext = (model) => {
    render(
      <ModelContext.Provider value={{ model }}>
        <Router>
          <Navbar />
        </Router>
      </ModelContext.Provider>
    );
  };

  test('renders all navigation links', () => {
    renderWithModelContext('basic');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText(/words/i)).toBeInTheDocument();
    expect(screen.getByText(/add word/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
