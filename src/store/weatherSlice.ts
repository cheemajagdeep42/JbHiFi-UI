import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeather } from '@/api/weatherApi';

export interface WeatherState {
    description: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    description: null,
    loading: false,
    error: null,
};


export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (
        { city, country }: { city: string; country: string; },
        thunkAPI
    ) => {
        try {
            const data = await fetchWeather(city, country);
            return data.description;
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearWeatherData(state) {
            state.description = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.description = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.description = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
