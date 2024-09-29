import { render, screen, waitFor } from '@testing-library/react';
import AllWords from '../components/AllWords';
import '@testing-library/jest-dom';
import { allWordsApi } from '../apiService/wordsApi';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../apiService/wordsApi', () => ({
  allWordsApi: jest.fn(),
}));

describe('AllWords Component', () => {
  const mockWords = [
    { id: 1, word: 'test1', synonym: ['syn1', 'syn2'] },
    { id: 2, word: 'test2', synonym: ['syn3', 'syn4'] },
  ];

  test('renders a list of words', async () => {
    allWordsApi.mockResolvedValueOnce(mockWords);

    render(
      <MemoryRouter>
        <AllWords />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(allWordsApi).toHaveBeenCalled();
    });

    const test = () => {
      expect(screen.getByText('test2')).toBeInTheDocument();
      expect(screen.getByText(/syn1/i)).toBeInTheDocument();
      expect(screen.getByText(/syn2/i)).toBeInTheDocument();
      expect(screen.getByText(/syn3/i)).toBeInTheDocument();
      expect(screen.getByText(/syn4/i)).toBeInTheDocument();
    };

    await waitFor(() => {
      test();
    });
  });
});
