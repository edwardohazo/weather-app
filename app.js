import dotenv from 'dotenv';
import axios from 'axios';
import chalk from 'chalk';


dotenv.config({ path: `./.env` });

const displayWeather = (city, weatherData) => {
    console.log(chalk.yellow(`\nWeather info: ${city}:`));
    console.log(
      chalk.yellow(
        "☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
      )
    );
    console.log(chalk.cyan("Description:"), weatherData.weather[0].description);
    console.log(chalk.cyan("Temperature:"), `${weatherData.main.temp} °C`);
    console.log(chalk.cyan("Humidity:"), `${weatherData.main.humidity}%`);
    console.log(
      chalk.cyan("Wind Speed:"),
      `${weatherData.wind.speed} m/s`
    );
    console.log(
      chalk.yellow("☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️\n")
    );
  }
  
  const handleError = (err) => {
    console.log(chalk.red.bold("Error: "), err.message);
    process.exit(1);
  }

const getWeather = async (city) => {

    try {
        let endpoint = `https://api.openweathermap.org/data/2.5/weather`;

        let response = await axios.get(endpoint, {
            params: {
                q: city,
                appid: process.env.API_KEY,
                units: 'metric'
            }
        });

        return response.data;
    } catch (err) {
        console.log(chalk.red.bold((err)));
        throw new Error(`Is not posible to get information of ${city} city!`);
    }
}

const initApp = () => {
    let city = process.argv[2];
    if (!city) {
        console.log(chalk.red.bold("Please provide a name of an specific place or city!"));
        console.log(chalk.magenta.bold("Run `npm start [name of the city]`"));
        return;
    }
    getWeather(city)
    .then((weatherData) => {
        displayWeather(city, weatherData);
    })
    .catch(handleError);
}  

initApp();





