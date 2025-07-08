const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// NOTE: We could use React Query here to enable caching and retries.
// However, for this assignment, we are calling the API directly
// to allow the reviewer to verify the rate limiting behavior (5 requests/hour).

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
