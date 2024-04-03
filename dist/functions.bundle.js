/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/functions.js":
      /*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayMain: () => (/* binding */ displayMain),\n/* harmony export */   displayWeather: () => (/* binding */ displayWeather),\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\n/* harmony import */ var _img_cloudy_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/cloudy.jpg */ "./src/img/cloudy.jpg");\n/* harmony import */ var _img_rainy_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/rainy.jpg */ "./src/img/rainy.jpg");\n/* harmony import */ var _img_clear_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/clear.jpg */ "./src/img/clear.jpg");\n/* harmony import */ var _img_sunset_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/sunset.jpg */ "./src/img/sunset.jpg");\n\n\n\n\n\nclass Forecast {\n  constructor(id) {\n    this.wrapper = document.createElement("div");\n    this.date = document.createElement("div");\n    this.icon = document.createElement("img");\n    this.condition = document.createElement("div");\n    this.tempWrapper = document.createElement("div");\n    this.temp = document.createElement("div");\n    this.maxTemp = document.createElement("div");\n    this.minTemp = document.createElement("div");\n\n    this.wrapper.className = "forecast-wrapper";\n    this.wrapper.id = `forecast-${id}`;\n    this.date.className = "date";\n    this.icon.className = "weather-icon";\n    this.condition.className = "condition";\n    this.tempWrapper.className = "temp-wrapper";\n    this.temp.className = "temp avg";\n    this.maxTemp.className = "temp max";\n    this.minTemp.className = "temp min";\n\n    this.tempWrapper.appendChild(this.minTemp);\n    this.tempWrapper.appendChild(this.temp);\n    this.tempWrapper.appendChild(this.maxTemp);\n    this.wrapper.appendChild(this.date);\n    this.wrapper.appendChild(this.icon);\n    this.wrapper.appendChild(this.condition);\n    this.wrapper.appendChild(this.tempWrapper);\n  }\n}\n\nconst MAX_FORECAST_DAY = 3;\nconst key = "8212294bf6e74d0ba3980745241902";\n\nconst addForecast = (forecast) => {\n  for (let id = 1; id < MAX_FORECAST_DAY; id += 1) {\n    const data = forecast[id];\n    const wrapper = document.querySelector(`#forecast-${id}`);\n    wrapper.querySelector(".date").textContent = new Date(\n      data.date,\n    ).toDateString();\n    wrapper.querySelector(".weather-icon").src = data.day.condition.icon;\n    wrapper.querySelector(".condition").textContent = data.day.condition.text;\n    wrapper.querySelector(".temp.avg").textContent =\n      `${data.day.avgtemp_c}\\u00b0C`;\n    wrapper.querySelector(".temp.max").textContent =\n      `${data.day.maxtemp_c}\\u00b0C`;\n    wrapper.querySelector(".temp.min").textContent =\n      `${data.day.mintemp_c}\\u00b0C`;\n  }\n};\n\nconst displayLoader = () => {\n  const loadingContainer = document.createElement("div");\n  const loader = document.createElement("div");\n  const text = document.createElement("p");\n\n  loadingContainer.id = "loading-container";\n  loadingContainer.className = "hidden";\n  loader.className = "loader";\n  text.textContent = "Loading...";\n  loadingContainer.appendChild(loader);\n  loadingContainer.appendChild(text);\n  document.body.appendChild(loadingContainer);\n};\n\nconst displayMain = () => {\n  const main = document.createElement("div");\n  const location = document.createElement("div");\n  const country = document.createElement("div");\n  const temp = document.createElement("div");\n  const humidity = document.createElement("div");\n  const description = document.createElement("div");\n  const date = document.createElement("div");\n  const time = document.createElement("div");\n  const inputWrapper = document.createElement("div");\n  const input = document.createElement("input");\n  const btn = document.createElement("div");\n  const error = document.createElement("span");\n  const radioWrapper = document.createElement("div");\n  const forecastContainer = document.createElement("div");\n  let id;\n\n  main.className = "main hidden";\n  location.className = "location";\n  country.className = "country";\n  temp.className = "temp";\n  humidity.className = "humidity";\n  description.className = "description";\n  date.className = "date";\n  time.className = "time";\n  inputWrapper.className = "input-wrapper";\n  input.id = "city";\n  input.name = "city";\n  input.placeholder = "Enter a city...";\n  input.addEventListener("keypress", checkKey);\n  btn.className = "submit-btn";\n  btn.textContent = "Search";\n  btn.addEventListener("click", getWeather);\n  error.className = "error";\n  radioWrapper.className = "radio-wrapper";\n  forecastContainer.className = "forecast-container hidden";\n\n  temp.style.background = "orange";\n  temp.style.fontSize = "4rem";\n\n  setBackground(_img_clear_jpg__WEBPACK_IMPORTED_MODULE_2__);\n\n  ["C", "F"].forEach((t) => {\n    const i = document.createElement("input");\n    const l = document.createElement("label");\n    const w = document.createElement("div");\n    i.type = "radio";\n    i.id = t === "C" ? "celcius" : "fahrenheit";\n    i.name = "temperature-unit";\n    i.value = t === "C" ? "celcius" : "fahrenheit";\n    l.for = i.id;\n    l.textContent = `\\u00b0${t}`;\n    w.className = "radio";\n\n    if (t === "C") i.checked = true;\n    w.appendChild(i);\n    w.appendChild(l);\n    i.addEventListener("click", switchUnit);\n    radioWrapper.appendChild(w);\n  });\n\n  for (id = 1; id < MAX_FORECAST_DAY; id += 1) {\n    forecastContainer.appendChild(new Forecast(id).wrapper);\n  }\n\n  inputWrapper.appendChild(input);\n  inputWrapper.appendChild(radioWrapper);\n  inputWrapper.appendChild(btn);\n  main.appendChild(location);\n  main.appendChild(country);\n  main.appendChild(temp);\n  main.appendChild(humidity);\n  main.appendChild(description);\n  main.appendChild(time);\n  main.appendChild(date);\n  document.body.appendChild(inputWrapper);\n  document.body.appendChild(error);\n  displayLoader();\n  document.body.appendChild(main);\n  document.body.appendChild(forecastContainer);\n};\n\nconst checkKey = (e) => {\n  if (e.key === "Enter") {\n    e.preventDefault();\n    document.querySelector(".submit-btn").click();\n  }\n};\n\nconst celciusToFarenheit = (c) => Math.round(((c * 9) / 5 + 32) * 10) / 10;\nconst fahrenheitToCelcius = (f) => Math.round(((5 * (f - 32)) / 9) * 10) / 10;\n\nconst switchUnit = (e) => {\n  const temps = document.querySelectorAll(".temp");\n  let tempUnit = e.currentTarget.value;\n\n  Array.from(temps).forEach((temp) => {\n    if (temp.textContent) {\n      let currentValue = temp.textContent.split("°");\n      let currentUnit = currentValue[1];\n      currentValue = Number(currentValue[0]);\n\n      if (currentUnit !== tempUnit.at(0).toUpperCase()) {\n        currentValue =\n          currentUnit === "C"\n            ? celciusToFarenheit(currentValue)\n            : fahrenheitToCelcius(currentValue);\n\n        temp.textContent =\n          tempUnit === "celcius"\n            ? `${currentValue}\\u00b0C`\n            : `${currentValue}\\u00b0F`;\n      }\n    }\n  });\n};\n\nconst getWeather = async () => {\n  const city = document.querySelector("input").value;\n  const loadingContainer = document.querySelector("#loading-container");\n  const error = document.querySelector("span");\n\n  if (city) {\n    document.querySelector("input").value = "";\n    loadingContainer.classList.remove("hidden");\n    error.classList.remove("active");\n    toggleForecast("hidden");\n\n    const cityWeather = await fetchData(city);\n    loadingContainer.classList.add("hidden");\n\n    if (cityWeather.current != undefined) {\n      displayWeather(cityWeather);\n    } else {\n      error.textContent = cityWeather.message;\n      error.classList.add("active");\n      toggleForecast("hidden");\n    }\n  }\n};\n\nconst toggleForecast = (state) => {\n  const main = document.querySelector(".main");\n  const forecast = document.querySelector(".forecast-container");\n  switch (state) {\n    case "visible":\n      main.classList.remove("hidden");\n      forecast.classList.remove("hidden");\n      //Array.from(forecasts).forEach(f => f.classList.remove(\'hidden\'));\n      break;\n    case "black-text":\n      main.classList.add("black-text");\n      forecast.classList.add("black-text");\n      //Array.from(forecasts).forEach(f => f.classList.add(\'black-text\'));\n      break;\n    case "white-text":\n      main.classList.remove("black-text");\n      forecast.classList.remove("black-text");\n      //Array.from(forecasts).forEach(f => f.classList.remove(\'black-text\'));\n      break;\n    default:\n      main.classList.add("hidden");\n      forecast.classList.add("hidden");\n      //Array.from(forecasts).forEach(f => f.classList.add(\'hidden\'));\n      break;\n  }\n};\n\nconst fetchData = async (city) => {\n  try {\n    let response = await fetch(\n      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${MAX_FORECAST_DAY}`,\n      { mode: "cors" },\n    );\n\n    if (!response.ok) {\n      let currentError = await response.json();\n      throw new Error(currentError.error.message);\n    }\n\n    let weatherData = await response.json();\n    return weatherData;\n  } catch (error) {\n    return error;\n  }\n};\n\nconst displayWeather = async (weatherData) => {\n  const imageUrl = getImage(weatherData.current.condition.text);\n  const main = document.querySelector(".main");\n  const location = document.querySelector(".location");\n  const country = document.querySelector(".country");\n  const temp = document.querySelector(".temp");\n  const humidity = document.querySelector(".humidity");\n  const description = document.querySelector(".description");\n  const date = document.querySelector(".date");\n  const time = document.querySelector(".time");\n  const tempUnit = document.querySelector(\n    "input[name=\'temperature-unit\']:checked",\n  ).value;\n  const dateTime = new Date(weatherData.location.localtime);\n\n  setBackground(imageUrl);\n  location.textContent = weatherData.location.name;\n  country.textContent = weatherData.location.country;\n\n  temp.textContent =\n    tempUnit === "celcius"\n      ? `${Math.round(weatherData.current.temp_c)}\\u00b0C`\n      : `${Math.round(weatherData.current.temp_f)}\\u00b0F`;\n  humidity.textContent = weatherData.current.humidity;\n  description.textContent = weatherData.current.condition.text;\n  date.textContent = dateTime.toDateString();\n  time.textContent = dateTime.toLocaleTimeString();\n\n  addForecast(weatherData.forecast.forecastday);\n  toggleForecast("visible");\n};\n\nconst setBackground = (imageUrl) => {\n  document.body.style.background = `center / cover no-repeat url(\'${imageUrl}\')`;\n};\n\nconst getImage = (condition) => {\n  toggleForecast("white-text");\n  if (condition.match(/rain/)) return _img_rainy_jpg__WEBPACK_IMPORTED_MODULE_1__;\n  else if (condition.match(/sun/)) return _img_sunset_jpg__WEBPACK_IMPORTED_MODULE_3__;\n  else if (condition.match(/cloud/)) {\n    toggleForecast("black-text");\n    return _img_cloudy_jpg__WEBPACK_IMPORTED_MODULE_0__;\n  } else return _img_clear_jpg__WEBPACK_IMPORTED_MODULE_2__;\n};\n\n\n//# sourceURL=webpack://weather-app/./src/functions.js?',
        );

        /***/
      },

    /***/ "./src/img/clear.jpg":
      /*!***************************!*\
  !*** ./src/img/clear.jpg ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'module.exports = __webpack_require__.p + "25488c732c2bc3190fd7.jpg";\n\n//# sourceURL=webpack://weather-app/./src/img/clear.jpg?',
        );

        /***/
      },

    /***/ "./src/img/cloudy.jpg":
      /*!****************************!*\
  !*** ./src/img/cloudy.jpg ***!
  \****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'module.exports = __webpack_require__.p + "c4a46ec3f8c489f1b0ff.jpg";\n\n//# sourceURL=webpack://weather-app/./src/img/cloudy.jpg?',
        );

        /***/
      },

    /***/ "./src/img/rainy.jpg":
      /*!***************************!*\
  !*** ./src/img/rainy.jpg ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'module.exports = __webpack_require__.p + "d040fab2429fcf67f1d2.jpg";\n\n//# sourceURL=webpack://weather-app/./src/img/rainy.jpg?',
        );

        /***/
      },

    /***/ "./src/img/sunset.jpg":
      /*!****************************!*\
  !*** ./src/img/sunset.jpg ***!
  \****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'module.exports = __webpack_require__.p + "7dbb308f9d1df182ccfd.jpg";\n\n//# sourceURL=webpack://weather-app/./src/img/sunset.jpg?',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/ (() => {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === "object") return globalThis;
      /******/ try {
        /******/ return this || new Function("return this")();
        /******/
      } catch (e) {
        /******/ if (typeof window === "object") return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/publicPath */
  /******/ (() => {
    /******/ var scriptUrl;
    /******/ if (__webpack_require__.g.importScripts)
      scriptUrl = __webpack_require__.g.location + "";
    /******/ var document = __webpack_require__.g.document;
    /******/ if (!scriptUrl && document) {
      /******/ if (document.currentScript)
        /******/ scriptUrl = document.currentScript.src;
      /******/ if (!scriptUrl) {
        /******/ var scripts = document.getElementsByTagName("script");
        /******/ if (scripts.length) {
          /******/ var i = scripts.length - 1;
          /******/ while (
            i > -1 &&
            (!scriptUrl || !/^http(s?):/.test(scriptUrl))
          )
            scriptUrl = scripts[i--].src;
          /******/
        }
        /******/
      }
      /******/
    }
    /******/ // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
    /******/ // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    /******/ if (!scriptUrl)
      throw new Error("Automatic publicPath is not supported in this browser");
    /******/ scriptUrl = scriptUrl
      .replace(/#.*$/, "")
      .replace(/\?.*$/, "")
      .replace(/\/[^\/]+$/, "/");
    /******/ __webpack_require__.p = scriptUrl;
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/functions.js");
  /******/
  /******/
})();
