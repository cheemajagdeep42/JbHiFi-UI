#  JbHiFi - Weather Forecast Application - UI
This is the front-end of the **Weather Forecast App**, built using [Next.js] with [TypeScript], [Vite] and [Jest]. It consumes a .NET backend API to fetch live weather data from OpenWeatherMap.



## Getting Started
### 1. Install dependencies
```bash
npm install
```


### 2. Set environment variables
Create a `.env.local` file in the root of the project:
```env
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
  NEXT_PUBLIC_API_KEY=replace-with-your-api-key
```
> `NEXT_PUBLIC_API_KEY` is the API key required by the backend (via `X-API-Key` header). Use a valid key supplied to you by JB Hi-Fi or your team.
---
# If the key is rate-limited or expired, replace it with one of the following backup keys:
# Replace inside .env.local
  NEXT_PUBLIC_API_KEY="key-api-2"
  NEXT_PUBLIC_API_KEY="key-api-3"
  NEXT_PUBLIC_API_KEY="key-api-4"
  NEXT_PUBLIC_API_KEY="key-api-5"



### 3. Run the development server
```bash
npm run dev
```
Then open [http://localhost:3000] in your browser.
---



## Running Tests
```bash
npm run test
```
---



## How It Works
- The user enters a **city** and **country**.
- The UI sends a request to the backend API:  
  `GET /api/weather/description?city={city}&country={country}`
- The request includes an API key in the header: X-API-Key: your-api-key-here
- The backend then queries the OpenWeatherMap API and returns a description like:  
  `"few clouds"`, `"clear sky"`, etc.
- The UI displays the result or an error message if something goes wrong.
---


## Folder Structure
```
/src
  ├── app/               # Next.js pages (App Router)
  │   └── page.tsx       # Main UI
  ├── components/        # (Optional) reusable UI components
  ├── styles/            # CSS modules
  └── utils/             # API logic (if needed)

.env.local               # Local environment variables
next.config.js           # Next.js config
```





## Deployment
To build for production:
```bash
npm run build
npm run start
```



## Notes
- This project assumes the backend is already running at `http://localhost:5000`.
- Ensure CORS is enabled on the backend for local development.
- Each request to the API includes the `X-API-Key` header with the configured key.
---