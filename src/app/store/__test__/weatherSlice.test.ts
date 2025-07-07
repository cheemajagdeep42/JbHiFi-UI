import reducer, {
    fetchWeatherData,
    resetWeather
} from '@/app/store/weatherSlice';
import { WeatherState } from '@/app/store/weatherSlice';
import { fetchWeather } from '@/app/api/weatherApi';

jest.mock('@/app/api/weatherApi');
const mockedFetchWeather = fetchWeather as jest.Mock;

// Initial state
const initialState: WeatherState = {
    description: null,
    loading: false,
    error: null,
};

describe('weatherSlice', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    it('should handle resetWeather action', () => {
        const state: WeatherState = {
            description: 'Sunny',
            loading: true,
            error: 'Some error',
        };

        const nextState = reducer(state, resetWeather());

        expect(nextState).toEqual(initialState);
    });

    it('should handle fetchWeatherData.pending', () => {
        const action = { type: fetchWeatherData.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(null);
        expect(nextState.description).toBe(null);
    });

    it('should handle fetchWeatherData.fulfilled', () => {
        const action = {
            type: fetchWeatherData.fulfilled.type,
            payload: 'Cloudy with sunshine',
        };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.description).toBe('Cloudy with sunshine');
        expect(nextState.error).toBe(null);
    });

    it('should handle fetchWeatherData.rejected', () => {
        const action = {
            type: fetchWeatherData.rejected.type,
            payload: 'City not found',
        };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.description).toBe(null);
        expect(nextState.error).toBe('City not found');
    });

    it('should dispatch fetchWeatherData thunk (fulfilled)', async () => {
        mockedFetchWeather.mockResolvedValueOnce({ description: 'Rainy' });

        const thunk = fetchWeatherData({ city: 'Melbourne', country: 'AU' });

        const dispatch = jest.fn();
        const getState = jest.fn();

        const result = await thunk(dispatch, getState, undefined);

        expect(mockedFetchWeather).toHaveBeenCalledWith('Melbourne', 'AU');
        expect(result.payload).toBe('Rainy');
        expect(result.type).toBe('weather/fetchWeatherData/fulfilled');
    });

    it('should dispatch fetchWeatherData thunk (rejected)', async () => {
        mockedFetchWeather.mockRejectedValueOnce(new Error('Network error'));

        const thunk = fetchWeatherData({ city: 'FakeCity', country: 'AU' });

        const dispatch = jest.fn();
        const getState = jest.fn();

        const result = await thunk(dispatch, getState, undefined);

        expect(mockedFetchWeather).toHaveBeenCalledWith('FakeCity', 'AU');
        expect(result.payload).toBe('Network error');
        expect(result.type).toBe('weather/fetchWeatherData/rejected');
    });
});
