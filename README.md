//Installations guide i bunden af dokumentet//

Projektbeskrivelse

Dette projekt er en simpel vejr-applikation, hvor brugeren kan søge efter vejret i en by og gemme favoritbyer.
Applikationen henter live vejrdata fra OpenWeather API og understøtter login, session-håndtering og persistering af data.

--

Funktioner

Søg efter vejrdata for en by

Visning af temperatur, vind og vejrbeskrivelse

Oprettelse af bruger og login

Session-baseret login

Gem og slet favoritbyer

Personlige favoritlister pr. bruger

Fejlhåndtering ved ugyldig input og API-fejl

--

Teknologier

Node.js

Express

EJS

MongoDB + Mongoose

OpenWeather API

Jest & Supertest (tests)

bcrypt

--

Arkitektur

Applikationen er opbygget som en client server løsning baseret på REST-arkitektur.

Frontend: EJS-templates

Backend: Express REST-API

Database: MongoDB

Ekstern service: OpenWeather API

Frontend og backend kommunikerer via HTTP-requests til REST-endpoints.

Projektet er opdelt i tre sprint, som er dokumenteret i projektrapporten.

//

1. Klon projektet
git clone https://github.com/Mikkelsen1337/WeatherApp.git
cd WeatherApp

2. Installer dependencies
npm install

3. Opret .env fil

Opret en .env fil i projektets rod

Eksempel:

PORT=3000
MONGO_URI=Din NOSQL database URI her
SESSION_SECRET=
OPENWEATHER_API_KEY=Gratis API Key kan hentet her > https://openweathermap.org/api


4. Start applikationen
npm start


Applikationen kører nu på:

http://localhost:3000
