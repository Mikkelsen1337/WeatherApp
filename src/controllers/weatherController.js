exports.getWeather = async (req, res) => {
    const city = req.query.city;
    if (!city) {
        // Midlertidigt indtil jeg laver UI med by navne med knapper
        return res.status(400).send("Skriv venligst en by");
    }

    return res.status(200).json({
        temperature: 10,
        wind: 5,
        description: "Overskyet"
    });
};