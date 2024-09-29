import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Model from '../components/Model';
import '@testing-library/jest-dom/extend-expect';
import { ModelContext } from '../context/modelContext';
import { switchModel, getActiveModel } from '../apiService/modelApi';

jest.mock('../apiService/modelApi', () => ({
  switchModel: jest.fn(),
  getActiveModel: jest.fn().mockResolvedValue('basic'),
}));

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const MockModelProvider = ({ children }) => {
  const mockSetModel = jest.fn();
  const model = 'basic';

  return (
    <ModelContext.Provider value={{ model, setModel: mockSetModel }}>
      {children}
    </ModelContext.Provider>
  );
};

describe('Model Component', () => {
  test('renders correctly with model context', () => {
    render(
      <MockModelProvider>
        <Model />
      </MockModelProvider>
    );

    expect(screen.getByText(/basic/i)).toBeInTheDocument();
  });

  test('renders current model after get request', async () => {
    render(
      <MockModelProvider>
        <Model />
      </MockModelProvider>
    );
    switchModel.mockResolvedValueOnce('basic');

    await waitFor(() => {
      expect(getActiveModel).toHaveBeenCalled();
    });
  });

  test('calls setModel when an option is selected', async () => {
    render(
      <MockModelProvider>
        <Model />
      </MockModelProvider>
    );
    switchModel.mockResolvedValueOnce('transitive');

    const selectButton = screen.getByText(/transitive/i);
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(switchModel).toHaveBeenCalledWith('transitive');
    });
  });
});
