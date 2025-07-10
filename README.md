# 🌦️ JbHiFi - Weather Forecast Application (UI)

This is the **front-end** of the **Weather Forecast App**, built using **Next.js**, **TypeScript**, and **Jest**.  
It consumes a **.NET backend API** to fetch live weather data from [OpenWeatherMap](https://openweathermap.org/).
---

## How To Run This Application on Local
1. **Clone** this repository to your local.
2. **Install dependencies** using the command:
    ```
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
     Clone the backend repository and follow its instructions to run the project under Docker:
     📁 **Repo Link**: [weatherForecast-backEnd](https://github.com/cheemajagdeep42/weatherForecast-backEnd)


5. **Start the UI development server**:
    ```
    npm run dev
    ```
    Then open [http://localhost:3000](http://localhost:3000) in your browser.


6. **Run unit tests**:
    ```
      npm run test
    ```


### 🚨 Super Important: Backend Will Not Work Without This!
     Your backend **will not return weather data** unless you configure a valid **OpenWeatherMap API key**.
     To run this app **successfully on local**, do the following in backEnd Project:
     ```
      👉 Open: appsettings.Development.json  
      🔑 Add ApiKey to this Object: 
            "OPENWEATHER_API_KEY": {"ApiKey": your-valid-openweather-api-key"}
             Don't change BaseUrl, we need that. 

> ⚠️ **API Key Strategy: Local vs Production**
>
> ✅ **Local Development**  
> We use fake API keys like `local-fake-key-1` in `.env.local` to simulate frontend → backend calls without exposing real secrets. These keys are predefined and whitelisted in the backend config (`appsettings.Development.json`) to allow smooth local development and testing.
>
> 🔒 **Production**  
> In production, valid keys are stored securely in **AWS Systems Manager (Parameter Store)** and injected at runtime. These keys are not hardcoded or exposed.
>
> 💡 **Why Fake Keys?**  
> To let JBHiFi Team - Reviewers run the UI without setup friction, while keeping real credentials secure. The fake key lets your UI communicate with the backend, which then enforces key validation and rate limiting.




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
    ```
    X-API-Key: your-api-key
    ```

4. The backend:
    - Validates the API key
    - Applies **rate limiting** (max 5/hour per key)
    - Forwards the request to **OpenWeatherMap**

5. The backend responds with the weather description.

6. The UI displays the result or a friendly error.
---



##  Notes
- This project calls a **.NET API** running inside **Docker** (`http://localhost:5000`).
- The backend must be up and running for the UI to work locally.
- All API requests must include the `X-API-Key` header.

---
