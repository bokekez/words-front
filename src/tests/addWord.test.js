import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddWord from '../components/AddWord';
import { ModelContext } from '../context/modelContext';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { addWordApi } from '../apiService/wordsApi'; 

jest.mock('react-toastify', () => ({
  toast: {
    warning: jest.fn(),
    success: jest.fn()
  },
}))

jest.mock('../apiService/wordsApi', () => ({
  addWordApi: jest.fn(),
}));

jest.mock('../components/Autocomplete', () => {
  return function MockAutocomplete({ onSelect }) {
    return (
      <div>
        <input 
          placeholder="Type synonym" 
          onChange={(e) => {
            if (e.target.value === 'Happy') {
              onSelect({ word: 'Happy', synonym: ["Joyful", "Cheerful"] });
            }
          }} 
        />
      </div>
    );
  };
});

describe('AddWord Component', () => {
  const renderWithModelContext = (model) => {
    return render(
      <ModelContext.Provider value={{ model }}>
        <AddWord />
      </ModelContext.Provider>
    );
  };

  test('renders the Add Word form correctly', () => {
    renderWithModelContext('basic');
    
    expect(screen.getByLabelText(/Word:/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Synonyms:/i)).toBeInTheDocument();
    expect(screen.getByText(/No synonyms to add/i)).toBeInTheDocument();
  });

  test('adds a word after a successful api call', async () => {
    renderWithModelContext('basic');
    addWordApi.mockResolvedValueOnce({ ok: true });

    const wordInput = screen.getByPlaceholderText('Enter word');
    fireEvent.change(wordInput, { target: { value: 'testWord' } });
    const submitButton = screen.getByText(/Add Word/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addWordApi).toHaveBeenCalledWith('testWord', []);
    });
    expect(wordInput.value).toBe('');
  });

  test('adds synonyms using Autocomplete', () => {
    renderWithModelContext('basic');

    const autocompleteInput = screen.getByPlaceholderText('Type synonym');
    fireEvent.change(autocompleteInput, { target: { value: 'Happy' } });

    expect(screen.getByText(/Synonyms of happy/i)).toBeInTheDocument();
  });

  test('validates empty word input', async () => {
    renderWithModelContext('basic');

    const submitButton = screen.getByText(/Add Word/i);
    fireEvent.click(submitButton);

    expect(toast.warning).toHaveBeenCalled();
  });
});
