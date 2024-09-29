import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import { allWordsApi } from '../apiService/wordsApi';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

jest.mock('../apiService/wordsApi', () => ({
  allWordsApi: jest.fn(),
}));

describe('Search Component', () => {
  test('renders and handles search input', async () => {
    allWordsApi.mockResolvedValueOnce([
      { id: 1, word: 'testSearch', synonym: ['exampleSynonym'] },
    ]);

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter a word to search...');
    fireEvent.change(input, { target: { value: 'testSearch' } });

    expect(input.value).toBe('testSearch');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(allWordsApi).toHaveBeenCalledWith('testSearch');
    });

    const test = () => {
      expect(screen.getByText('testSearch')).toBeInTheDocument();
    };

    await waitFor(() => {
      test();
    });
  });
});
