'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, clearWeatherData } from '@/app/store/weatherSlice';
import { RootState, AppDispatch } from '@/app/store';
import styles from './weather.module.css';
import { getWeatherIcon } from '@/app/utils/getWeatherIcon';

export default function WeatherComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const { description, error: apiError, loading } = useSelector((state: RootState) => state.weather);

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');

        if (!city.trim()) {
            setValidationError('City is required.');
            return;
        }

        if (!country.trim()) {
            setValidationError('Country is required.');
            return;
        }

        dispatch(clearWeatherData()); // ✅ Clear previous results
        dispatch(fetchWeatherData({ city, country }));
    };

    const handleClear = () => {
        setCity('');
        setCountry('');
        dispatch(clearWeatherData());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>🌤 Weather Forecast</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.input}
                        type="search"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            if (description) dispatch(clearWeatherData());
                        }} />
                    <input
                        className={styles.input}
                        type="search"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            if (description) dispatch(clearWeatherData());
                        }} />
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Forecast'}
                    </button>
                </form>

                <div className={styles.message}>
                    {validationError ? (
                        <p className={styles.error}>{validationError}</p>
                    ) : apiError ? (
                        <p className={styles.error}>{apiError}</p>
                    ) : description ? (
                        <p className={styles.result}>
                            {getWeatherIcon(description)}{' '}
                            {description.charAt(0).toUpperCase() + description.slice(1)}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
