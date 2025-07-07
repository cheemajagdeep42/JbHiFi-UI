const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const fetchWeather = async (city: string, country: string) => {
    const response = await fetch(
        `${BASE_URL}/weather/description?city=${city}&country=${country}`,
        {
            headers: {
                'X-API-KEY': API_KEY,
            },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch weather data');
    }

    return response.json();
};
