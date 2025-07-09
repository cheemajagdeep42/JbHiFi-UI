import { render, screen, fireEvent } from '@testing-library/react';
import WeatherComponent from '@/components/weather';
import * as weatherApi from '@/api/weatherApi';
import { Provider } from 'react-redux';
import { store } from '@/store';

jest.mock('@/api/weatherApi', () => ({
  fetchWeather: jest.fn(),
}));

const mockedFetchWeather = weatherApi.fetchWeather as jest.Mock;

const renderWithProvider = () =>
  render(
    <Provider store={store}>
      <WeatherComponent />
    </Provider>
  );

describe('WeatherComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error when city is empty', async () => {
    renderWithProvider();

    fireEvent.change(screen.getByPlaceholderText(/enter country/i), {
      target: { value: 'AU' },
    });

    fireEvent.click(screen.getByText(/get forecast/i));

    expect(await screen.findByText(/city is required/i)).toBeInTheDocument();
  });

  it('shows error when country is empty', async () => {
    renderWithProvider();

    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: 'Melbourne' },
    });

    fireEvent.click(screen.getByText(/get forecast/i));

    expect(await screen.findByText(/country is required/i)).toBeInTheDocument();
  });

  it('shows error when API call fails', async () => {
    mockedFetchWeather.mockRejectedValueOnce(new Error('API failed'));

    renderWithProvider();

    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: 'Melbourne' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter country/i), {
      target: { value: 'AU' },
    });
    fireEvent.click(screen.getByText(/get forecast/i));

    expect(await screen.findByText(/api failed/i)).toBeInTheDocument();
  });

  it('shows weather description on successful fetch', async () => {
    mockedFetchWeather.mockResolvedValueOnce({ description: 'Sunny' });

    renderWithProvider();

    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: 'Melbourne' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter country/i), {
      target: { value: 'AU' },
    });
    fireEvent.click(screen.getByText(/get forecast/i));

    const weatherText = await screen.findByText(/sunny/i);
    expect(weatherText).toBeInTheDocument();
  });
});
