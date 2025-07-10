# 🌦️ JbHiFi - Weather Forecast Application (UI)

This is the **front-end** of the **Weather Forecast App**, built using **Next.js**, **TypeScript**, and **Jest**.  
It consumes a **.NET backend API** to fetch live weather data from [OpenWeatherMap](https://openweathermap.org/).

---

## How To Run This Application on Local

1. **Clone** this repository to your local.
2. **Install dependencies** using the command:

    ```bash
    npm install
    ```

3. **Setup environment variables** by creating a `.env.local` file in the root folder:

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
    NEXT_PUBLIC_API_KEY=`local-fake-key-1`
    ```

    For **local development**, `NEXT_PUBLIC_API_KEY` can be one of:
    - `local-fake-key-1`
    - `local-fake-key-2`
    - `local-fake-key-3`
    - `local-fake-key-4`
    - `local-fake-key-5`
> ⚠️ **Note:** The backend only allows **5 requests per API key per hour**.

    >  On **PROD**, all API keys are stored securely in **AWS Systems Manager – Parameter Store**.

4. **Start the .NET backend on local** (Dockerized):
   Clone the backend repository and follow its instructions:
   📁 **Repo Link**: [weatherForecast-backEnd](https://github.com/cheemajagdeep42/weatherForecast-backEnd)
    ```bash
    docker-compose up --build
    ```

5. **Start the UI development server**:

    ```bash
    npm run dev
    ```

    Then open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Run unit tests**:

    ```bash
    npm run test
    ```

---

## ☁️ How To Run This Application on PROD

- **CI/CD** is configured using **GitHub Actions**.
- On every push to the `main` branch, the UI is deployed to:
    - AWS **S3** (static hosting)
    - and **PROD** domain:  
      🔗 [https://weatherreportinfo.com](https://weatherreportinfo.com)
- Backend is deployed under the same domain (subdomain):  
  🔗 [https://api.weatherreportinfo.com](https://api.weatherreportinfo.com)
- All secrets for backend and 3rd-party APIs ([OpenWeatherMap](https://openweathermap.org)) are managed in **AWS Systems Manager**.

---

## ⚙️ How It Works

1. The user enters a **city** and **country**.
2. The UI sends a request to the backend:

    ```http
    GET /api/weather/description?city={city}&country={country}
    ```

3. The request includes an **API key** in the header:

    ```http
    X-API-Key: your-api-key
    ```

4. The backend:
    - Validates the API key
    - Applies **rate limiting** (max 5/hour per key)
    - Forwards the request to **OpenWeatherMap**
5. The backend responds with the weather description.
6. The UI displays the result or a friendly error.

---

## 📝 Notes

- This project calls a **.NET API** running inside **Docker** (`http://localhost:5000`).
- The backend must be up and running for the UI to work locally.
- All API requests must include the `X-API-Key` header.

---
