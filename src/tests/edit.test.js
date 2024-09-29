import { render, screen, fireEvent } from '@testing-library/react';
import Edit from '../components/Edit';
import '@testing-library/jest-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

jest.mock('../components/Autocomplete', () => {
  return function MockAutocomplete({ onSelect }) {
    return (
      <div>
        <input
          placeholder="Start typing..."
          onChange={(e) => {
            if (e.target.value === 'Happy') {
              onSelect({ word: 'Happy' });
            }
          }}
        />
      </div>
    );
  };
});

describe('Edit Component', () => {
  const mockOnClose = jest.fn();
  const mockWord = { word: 'test', synonym: ['example'] };

  test('renders the Edit form', () => {
    render(<Edit wordParam={mockWord} onClose={mockOnClose} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByText(/edit test/i)).toBeInTheDocument();
  });

  test('calls onClose when cancel is clicked', () => {
    render(<Edit wordParam={mockWord} onClose={mockOnClose} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  test('adds synonyms using Autocomplete', () => {
    render(<Edit wordParam={mockWord} onClose={mockOnClose} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const autocompleteInput = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(autocompleteInput, { target: { value: 'Happy' } });

    expect(screen.getByText(/happy/i)).toBeInTheDocument();
  });
});
