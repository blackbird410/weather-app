const key = "8212294bf6e74d0ba3980745241902";
const gifKey = "j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL";

export const displayMain = () => {
  const inputWrapper = document.createElement("div");
  const input = document.createElement("input");
  const btn = document.createElement("div");
  const weatherInfo = document.createElement("div");
  const error = document.createElement("span");
  const radioWrapper = document.createElement("div");

  inputWrapper.className = "input-wrapper";
  input.id = "city";
  input.name = "city";
  input.placeholder = "Enter a city...";
  btn.className = "submit-btn";
  btn.textContent = "Search";
  btn.addEventListener("click", getWeather);
  weatherInfo.className = "weather-info";
  error.className = "error";
  radioWrapper.className = "radio-wrapper";

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
    radioWrapper.appendChild(w);
  });

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(radioWrapper);
  inputWrapper.appendChild(btn);
  document.body.appendChild(inputWrapper);
  document.body.appendChild(error);
  document.body.appendChild(weatherInfo);
};

const getWeather = async () => {
  if (document.querySelector(".main")) document.querySelector(".main").remove();
  const city = document.querySelector("input").value;
  if (city) {
    const cityWeather = await fetchData(city);
    const error = document.querySelector("span");
    if (cityWeather.current != undefined) {
      displayWeather(cityWeather);
      error.classList.remove("active");
    } else {
      error.textContent = cityWeather.message;
      error.classList.add("active");
    }
  }
};

const displayError = (error) => {};

export const fetchData = async (city) => {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,
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
  const imageUrl = await fetchImage(weatherData.current.condition.text);
  const main = document.createElement("div");
  const location = document.createElement("div");
  const country = document.createElement("div");
  const temp = document.createElement("div");
  const humidity = document.createElement("div");
  const description = document.createElement("div");
  const isDay = document.createElement("div");
  const tempUnit = document.querySelector(
    "input[name='temperature-unit']:checked",
  ).value;

  main.className = "main";
  location.className = "location";
  country.className = "country";
  temp.className = "temp";
  humidity.className = "humidity";
  description.className = "description";
  isDay.className = "is-day";

  if (imageUrl) {
    document.body.style.background = `center / cover no-repeat url('${imageUrl}')`;
  }
  location.textContent = weatherData.location.name;
  country.textContent = weatherData.location.country;

  temp.textContent =
    tempUnit === "celcius"
      ? weatherData.current.temp_c + "\u00b0" + "C"
      : weatherData.current.temp_f + "\u00b0" + "F";
  temp.style.background = "orange";
  temp.style.fontSize = "4rem";
  humidity.textContent = weatherData.current.humidity;
  description.textContent = weatherData.current.condition.text;
  isDay.textContent = weatherData.current.is_day ? "Day" : "Night";

  main.appendChild(location);
  main.appendChild(country);
  main.appendChild(temp);
  main.appendChild(humidity);
  main.appendChild(description);
  main.appendChild(isDay);
  document.querySelector(".weather-info").appendChild(main);
};

const fetchImage = async (q) => {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${q}`,
      { mode: "cors" },
    );
    if (!response.ok) {
      let actualError = "";
      switch (response.status) {
        case 401:
          actualError = "API key incorrect";
          break;
        case 404:
          actualError = "Network error";
          break;
        default:
          actualError = "Network response was not OK";
          break;
      }
      throw new Error(actualError);
    }
    response = await response.json();

    if (!response.data) throw new Error("Image not found");
    return response.data.images.original.url;
  } catch (error) {
    console.error(error);
  }
};
