#  JbHiFi - Weather Forecast Application - UI
This is the front-end of the **Weather Forecast App**, built using [Next.js] with [TypeScript] and [Jest]. It consumes a .NET backend API to fetch live weather data from OpenWeatherMap.


**How To Run this Application on Local:**
1) Clone This Repository to local.
2) **Install Dependencies with below command**
   npm install

3) **This UI Application need to set beow 2 environment Variables under .env.local file**
   3.1)  Create a `.env.local` file in the root of the project:
         NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
         NEXT_PUBLIC_API_KEY=replace-with-your-api-key
         For Local, NEXT_PUBLIC_API_KEY can have one of these value -  ["local-fake-key-1", "local-fake-key-2", "local-fake-key-3", "local-fake-key-4","local-fake-key-5"]
         But For PROD, Valid API Keys are stored under AWS Systems Manager - Parameter Store.
         BackEnd API will only allow 5 Calls per Key within 1 hour.
   3.2) This Project will call a .Net API hosted under Docker Image on local, so we need to run below command at root of this Project.
         docker-compose up --build
         This will run the required Docker Image on localhost:5000

4) **Run the development server**
   npm run dev
   Then open [http://localhost:3000] in your browser.
5) **Running Tests**
   npm run test



**How To Run this Application on PROD:**
1)  CI/CD has been setup for this project using Github Workflows.
2)  On every push to main branch, UI COdebase will be deployed to AWS S3 and PROD
3)  PROD Link is - **https://weatherreportinfo.com**
4)  BackEnd is deployed under same domain(subDomain) - **https://weatherreportinfo.com**
5)  Required Secrets for backEndAPI and 3rd Party API(https://openweathermap.org), are configured under - AWS Systems Manager.




## How It Works
- The user enters a **city** and **country**.
- The UI sends a request to the backend API:  
  `GET /api/weather/description?city={city}&country={country}`
- The request includes an API key in the header: X-API-Key: your-api-key-here
- The backend then queries the OpenWeatherMap API and returns a description like:  
  `"few clouds"`, `"clear sky"`, etc.
- The UI displays the result or an error message if something goes wrong.
---



## Notes
- This Project will call a .Net API running under docker Image on url(http://localhost:5000)
- This project assumes the backend is already running at `http://localhost:5000`.
- Each request to the API includes the `X-API-Key` header with the configured key.
---
