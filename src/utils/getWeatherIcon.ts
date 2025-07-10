export const getWeatherIcon = (description: string): string => {
    const lower = description.toLowerCase();

    switch (true) {
        case lower.includes("clear"):
            return "☀️";
        case lower.includes("cloud"):
            return "☁️";
        case lower.includes("rain"):
            return "🌧️";
        case lower.includes("thunder"):
            return "⛈️";
        case lower.includes("snow"):
            return "❄️";
        case lower.includes("fog"):
        case lower.includes("mist"):
            return "🌫️";
        case lower.includes("wind"):
            return "🌬️";
        default:
            return "❓";
    }
};

