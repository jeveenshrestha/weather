import express from "express";
import axios from "axios";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";

const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

const url = "https://api.openweathermap.org/data/2.5/weather";


const app = express();
app.use(expressEjsLayouts);

app.set("view engine", 'ejs');

app.use(express.urlencoded({ extended: true }));

const config = {
  params: {
    q: "Oulu",
    appid: API_KEY,
    units: "metric",
  }
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(url, config);
    res.render("pages/index.ejs", {
      weatherData: response.data
    })
  } catch (error) {
    console.log(error.response.data)
  }
})

app.post("/city", async (req, res) => {
  const city = req.body.city;
  const modifiedConfig = {
    params: {
      ...config.params,
      q: city
    }
  }
  try {
    const response = await axios.get(url, modifiedConfig);
    res.render("pages/index.ejs", {
      weatherData: response.data,
    })
  } catch (error) {
    console.log(error.response.data.message)
  }
})

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})