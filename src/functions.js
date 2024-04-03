import cloudy from "./img/cloudy.jpg";
import rainy from "./img/rainy.jpg";
import clear from "./img/clear.jpg";
import sunny from "./img/sunset.jpg";

class Forecast {
  constructor(id) {
    this.wrapper = document.createElement("div");
    this.date = document.createElement("div");
    this.icon = document.createElement("img");
    this.condition = document.createElement("div");
    this.tempWrapper = document.createElement("div");
    this.temp = document.createElement("div");
    this.maxTemp = document.createElement("div");
    this.minTemp = document.createElement("div");

    this.wrapper.className = "forecast-wrapper";
    this.wrapper.id = `forecast-${id}`;
    this.date.className = "date";
    this.icon.className = "weather-icon";
    this.condition.className = "condition";
    this.tempWrapper.className = "temp-wrapper";
    this.temp.className = "temp avg";
    this.maxTemp.className = "temp max";
    this.minTemp.className = "temp min";

    this.tempWrapper.appendChild(this.minTemp);
    this.tempWrapper.appendChild(this.temp);
    this.tempWrapper.appendChild(this.maxTemp);
    this.wrapper.appendChild(this.date);
    this.wrapper.appendChild(this.icon);
    this.wrapper.appendChild(this.condition);
    this.wrapper.appendChild(this.tempWrapper);
  }
}

const MAX_FORECAST_DAY = 3;
const key = "8212294bf6e74d0ba3980745241902";

const addForecast = (forecast) => {
  for (let id = 1; id < MAX_FORECAST_DAY; id += 1) {
    const data = forecast[id];
    const wrapper = document.querySelector(`#forecast-${id}`);
    wrapper.querySelector(".date").textContent = new Date(
      data.date,
    ).toDateString();
    wrapper.querySelector(".weather-icon").src = data.day.condition.icon;
    wrapper.querySelector(".condition").textContent = data.day.condition.text;
    wrapper.querySelector(".temp.avg").textContent =
      `${data.day.avgtemp_c}\u00b0C`;
    wrapper.querySelector(".temp.max").textContent =
      `${data.day.maxtemp_c}\u00b0C`;
    wrapper.querySelector(".temp.min").textContent =
      `${data.day.mintemp_c}\u00b0C`;
  }
};

const displayLoader = () => {
  const loadingContainer = document.createElement("div");
  const loader = document.createElement("div");
  const text = document.createElement("p");

  loadingContainer.id = "loading-container";
  loadingContainer.className = "hidden";
  loader.className = "loader";
  text.textContent = "Loading...";
  loadingContainer.appendChild(loader);
  loadingContainer.appendChild(text);
  document.body.appendChild(loadingContainer);
};

export const displayMain = () => {
  const main = document.createElement("div");
  const location = document.createElement("div");
  const country = document.createElement("div");
  const temp = document.createElement("div");
  const humidity = document.createElement("div");
  const description = document.createElement("div");
  const date = document.createElement("div");
  const time = document.createElement("div");
  const inputWrapper = document.createElement("div");
  const input = document.createElement("input");
  const btn = document.createElement("div");
  const error = document.createElement("span");
  const radioWrapper = document.createElement("div");
  const forecastContainer = document.createElement("div");
  let id;

  main.className = "main hidden";
  location.className = "location";
  country.className = "country";
  temp.className = "temp";
  humidity.className = "humidity";
  description.className = "description";
  date.className = "date";
  time.className = "time";
  inputWrapper.className = "input-wrapper";
  input.id = "city";
  input.name = "city";
  input.placeholder = "Enter a city...";
  input.addEventListener("keypress", checkKey);
  btn.className = "submit-btn";
  btn.textContent = "Search";
  btn.addEventListener("click", getWeather);
  error.className = "error";
  radioWrapper.className = "radio-wrapper";
  forecastContainer.className = "forecast-container hidden";

  temp.style.background = "orange";
  temp.style.fontSize = "4rem";

  setBackground(clear);

  ["C", "F"].forEach((t) => {
    const i = document.createElement("input");
    const l = document.createElement("label");
    const w = document.createElement("div");
    i.type = "radio";
    i.id = t === "C" ? "celcius" : "fahrenheit";
    i.name = "temperature-unit";
    i.value = t === "C" ? "celcius" : "fahrenheit";
    l.for = i.id;
    l.textContent = `\u00b0${t}`;
    w.className = "radio";

    if (t === "C") i.checked = true;
    w.appendChild(i);
    w.appendChild(l);
    i.addEventListener("click", switchUnit);
    radioWrapper.appendChild(w);
  });

  for (id = 1; id < MAX_FORECAST_DAY; id += 1) {
    forecastContainer.appendChild(new Forecast(id).wrapper);
  }

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(radioWrapper);
  inputWrapper.appendChild(btn);
  main.appendChild(location);
  main.appendChild(country);
  main.appendChild(temp);
  main.appendChild(humidity);
  main.appendChild(description);
  main.appendChild(time);
  main.appendChild(date);
  document.body.appendChild(inputWrapper);
  document.body.appendChild(error);
  displayLoader();
  document.body.appendChild(main);
  document.body.appendChild(forecastContainer);
};

const checkKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector(".submit-btn").click();
  }
};

const celciusToFarenheit = (c) => Math.round(((c * 9) / 5 + 32) * 10) / 10;
const fahrenheitToCelcius = (f) => Math.round(((5 * (f - 32)) / 9) * 10) / 10;

const switchUnit = (e) => {
  const temps = document.querySelectorAll(".temp");
  let tempUnit = e.currentTarget.value;

  Array.from(temps).forEach((temp) => {
    if (temp.textContent) {
      let currentValue = temp.textContent.split("°");
      let currentUnit = currentValue[1];
      currentValue = Number(currentValue[0]);

      if (currentUnit !== tempUnit.at(0).toUpperCase()) {
        currentValue =
          currentUnit === "C"
            ? celciusToFarenheit(currentValue)
            : fahrenheitToCelcius(currentValue);

        temp.textContent =
          tempUnit === "celcius"
            ? `${currentValue}\u00b0C`
            : `${currentValue}\u00b0F`;
      }
    }
  });
};

const getWeather = async () => {
  const city = document.querySelector("input").value;
  const loadingContainer = document.querySelector("#loading-container");
  const error = document.querySelector("span");

  if (city) {
    document.querySelector("input").value = "";
    loadingContainer.classList.remove("hidden");
    error.classList.remove("active");
    toggleForecast("hidden");

    const cityWeather = await fetchData(city);
    loadingContainer.classList.add("hidden");

    if (cityWeather.current != undefined) {
      displayWeather(cityWeather);
    } else {
      error.textContent = cityWeather.message;
      error.classList.add("active");
      toggleForecast("hidden");
    }
  }
};

const toggleForecast = (state) => {
  const main = document.querySelector(".main");
  const forecast = document.querySelector(".forecast-container");
  switch (state) {
    case "visible":
      main.classList.remove("hidden");
      forecast.classList.remove("hidden");
      //Array.from(forecasts).forEach(f => f.classList.remove('hidden'));
      break;
    case "black-text":
      main.classList.add("black-text");
      forecast.classList.add("black-text");
      //Array.from(forecasts).forEach(f => f.classList.add('black-text'));
      break;
    case "white-text":
      main.classList.remove("black-text");
      forecast.classList.remove("black-text");
      //Array.from(forecasts).forEach(f => f.classList.remove('black-text'));
      break;
    default:
      main.classList.add("hidden");
      forecast.classList.add("hidden");
      //Array.from(forecasts).forEach(f => f.classList.add('hidden'));
      break;
  }
};

export const fetchData = async (city) => {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${MAX_FORECAST_DAY}`,
      { mode: "cors" },
    );

    if (!response.ok) {
      let currentError = await response.json();
      throw new Error(currentError.error.message);
    }

    let weatherData = await response.json();
    return weatherData;
  } catch (error) {
    return error;
  }
};

export const displayWeather = async (weatherData) => {
  const imageUrl = getImage(weatherData.current.condition.text);
  const main = document.querySelector(".main");
  const location = document.querySelector(".location");
  const country = document.querySelector(".country");
  const temp = document.querySelector(".temp");
  const humidity = document.querySelector(".humidity");
  const description = document.querySelector(".description");
  const date = document.querySelector(".date");
  const time = document.querySelector(".time");
  const tempUnit = document.querySelector(
    "input[name='temperature-unit']:checked",
  ).value;
  const dateTime = new Date(weatherData.location.localtime);

  setBackground(imageUrl);
  location.textContent = weatherData.location.name;
  country.textContent = weatherData.location.country;

  temp.textContent =
    tempUnit === "celcius"
      ? `${Math.round(weatherData.current.temp_c)}\u00b0C`
      : `${Math.round(weatherData.current.temp_f)}\u00b0F`;
  humidity.textContent = weatherData.current.humidity;
  description.textContent = weatherData.current.condition.text;
  date.textContent = dateTime.toDateString();
  time.textContent = dateTime.toLocaleTimeString();

  addForecast(weatherData.forecast.forecastday);
  toggleForecast("visible");
};

const setBackground = (imageUrl) => {
  document.body.style.background = `center / cover no-repeat url('${imageUrl}')`;
};

const getImage = (condition) => {
  toggleForecast("white-text");
  if (condition.match(/rain/)) return rainy;
  else if (condition.match(/sun/)) return sunny;
  else if (condition.match(/cloud/)) {
    toggleForecast("black-text");
    return cloudy;
  } else return clear;
};
