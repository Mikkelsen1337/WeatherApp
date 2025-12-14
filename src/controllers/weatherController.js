const axios = require('axios');

exports.getWeather = async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ msg: "Skriv venligst en by"});
    }

    try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        return res.status(200).json({
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            description: response.data.weather[0].description
        });
    } catch (err) {

        return res.status(404).json({
            msg: "Kunne ikke finde vejrdata for angivne by..."
        });
    }

};