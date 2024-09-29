import { render, screen, waitFor } from '@testing-library/react';
import WordsDetails from '../components/WordsDetails';
import { getWordDetails } from '../apiService/wordsApi';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../apiService/wordsApi', () => ({
  getWordDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('WordDetails Component', () => {
  const mockWord = { word: 'testWord', synonym: ['syn1', 'syn2'] };

  test('renders word details', async () => {
    getWordDetails.mockResolvedValueOnce(mockWord);
    useParams.mockReturnValue({ word: 'testWord' });

    render(
      <MemoryRouter initialEntries={['/words/testWord']}>
        <Routes>
          <Route path="/words/:word" element={<WordsDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getWordDetails).toHaveBeenCalledWith('testWord');
    });

    const test = () => {
      expect(screen.getByText('testWord')).toBeInTheDocument();
      expect(screen.getByText(/syn1/i)).toBeInTheDocument();
      expect(screen.getByText(/syn2/i)).toBeInTheDocument();
    };

    await waitFor(() => {
      test();
    });
  });
});
