export function getWeatherIcon(description: string): string {
    const lower = description.toLowerCase();

    if (lower.includes("clear")) return "☀️";
    if (lower.includes("cloud")) return "☁️";
    if (lower.includes("rain")) return "🌧️";
    if (lower.includes("thunder")) return "⛈️";
    if (lower.includes("snow")) return "❄️";
    if (lower.includes("fog") || lower.includes("mist")) return "🌫️";
    if (lower.includes("wind")) return "🌬️";

    return "🌈";
}
