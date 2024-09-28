import { render, screen } from '@testing-library/react';
import WordDetails from '../components/WordDetails';

describe('WordDetails Component', () => {
  const mockWord = { word: 'testWord', synonyms: ['syn1', 'syn2'] };

  test('renders word details', () => {
    render(<WordDetails word={mockWord} />);

    expect(screen.getByText('testWord')).toBeInTheDocument();
    expect(screen.getByText(/syn1/i)).toBeInTheDocument();
  });
});
