# Weather App

A simple weather forecast app built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

The app allows users to search for a location and displays basic weather information using the Visual Crossing Weather API.

## Features

- Search weather by location
- Display location, temperature, and weather condition
- Toggle temperature between Fahrenheit and Celsius
- Show a loading message while fetching data
- Display an error message for invalid searches
- Change the page appearance based on the current weather condition
- Responsive basic layout

## Built With

- HTML
- CSS
- JavaScript
- Webpack
- Visual Crossing Weather API

## What I Practiced

This project helped me practice:

- Working with asynchronous JavaScript
- Using `fetch()` and `async/await`
- Handling API responses
- Processing JSON data into a simpler object
- Separating responsibilities between functions
- Updating the DOM dynamically
- Handling loading and error states
- Styling the UI based on application data

## How It Works

The app follows this basic flow:

1. The user enters a location.
2. The app sends a request to the Visual Crossing API.
3. The API returns weather data.
4. The app extracts only the required information.
5. The weather data is displayed on the page.
6. The page style changes based on the weather condition.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

## Notes

This project uses an API key directly in the frontend because it is a learning project from The Odin Project. In a production application, API keys should be protected on the server side.

## Future Improvements

- Add more detailed forecast information
- Improve the visual design
- Add weather icons
- Save the last searched location
- Improve accessibility
- Add better mobile styling
