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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayMain: () => (/* binding */ displayMain),\n/* harmony export */   displayWeather: () => (/* binding */ displayWeather),\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\nconst key = "8212294bf6e74d0ba3980745241902";\nconst gifKey = "j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL";\n\nconst displayLoader = () => {\n  const loadingContainer = document.createElement("div");\n  const loader = document.createElement("div");\n  const text = document.createElement("p");\n\n  loadingContainer.id = "loading-container";\n  loadingContainer.className = "hidden";\n  loader.className = "loader";\n  text.textContent = "Loading...";\n  loadingContainer.appendChild(loader);\n  loadingContainer.appendChild(text);\n  document.body.appendChild(loadingContainer);\n};\n\nconst displayMain = () => {\n  const main = document.createElement("div");\n  const location = document.createElement("div");\n  const country = document.createElement("div");\n  const temp = document.createElement("div");\n  const humidity = document.createElement("div");\n  const description = document.createElement("div");\n  const isDay = document.createElement("div");\n  const inputWrapper = document.createElement("div");\n  const input = document.createElement("input");\n  const btn = document.createElement("div");\n  const error = document.createElement("span");\n  const radioWrapper = document.createElement("div");\n\n  main.className = "main hidden";\n  location.className = "location";\n  country.className = "country";\n  temp.className = "temp";\n  humidity.className = "humidity";\n  description.className = "description";\n  isDay.className = "is-day";\n  inputWrapper.className = "input-wrapper";\n  input.id = "city";\n  input.name = "city";\n  input.placeholder = "Enter a city...";\n  btn.className = "submit-btn";\n  btn.textContent = "Search";\n  btn.addEventListener("click", getWeather);\n  error.className = "error";\n  radioWrapper.className = "radio-wrapper";\n\n  temp.style.background = "orange";\n  temp.style.fontSize = "4rem";\n\n  ["C", "F"].forEach((t) => {\n    const i = document.createElement("input");\n    const l = document.createElement("label");\n    const w = document.createElement("div");\n    i.type = "radio";\n    i.id = t === "C" ? "celcius" : "fahrenheit";\n    i.name = "temperature-unit";\n    i.value = t === "C" ? "celcius" : "fahrenheit";\n    l.for = i.id;\n    l.textContent = `\\u00b0${t}`;\n    w.className = "radio";\n\n    if (t === "C") i.checked = true;\n    w.appendChild(i);\n    w.appendChild(l);\n    radioWrapper.appendChild(w);\n  });\n\n  inputWrapper.appendChild(input);\n  inputWrapper.appendChild(radioWrapper);\n  inputWrapper.appendChild(btn);\n  main.appendChild(location);\n  main.appendChild(country);\n  main.appendChild(temp);\n  main.appendChild(humidity);\n  main.appendChild(description);\n  main.appendChild(isDay);\n  document.body.appendChild(inputWrapper);\n  document.body.appendChild(error);\n  displayLoader();\n  document.body.appendChild(main);\n};\n\nconst getWeather = async () => {\n  const city = document.querySelector("input").value;\n  const main = document.querySelector(".main");\n  const loadingContainer = document.querySelector("#loading-container");\n\n  if (city) {\n    loadingContainer.classList.remove("hidden");\n    const cityWeather = await fetchData(city);\n    const error = document.querySelector("span");\n    loadingContainer.classList.add("hidden");\n    main.classList.remove("hidden");\n\n    if (cityWeather.current != undefined) {\n      displayWeather(cityWeather);\n      error.classList.remove("active");\n    } else {\n      error.textContent = cityWeather.message;\n      error.classList.add("active");\n      main.classList.add("hidden");\n    }\n  }\n};\n\nconst fetchData = async (city) => {\n  try {\n    let response = await fetch(\n      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,\n      { mode: "cors" },\n    );\n\n    if (!response.ok) {\n      let currentError = await response.json();\n      throw new Error(currentError.error.message);\n    }\n\n    let weatherData = await response.json();\n    return weatherData;\n  } catch (error) {\n    return error;\n  }\n};\n\nconst displayWeather = async (weatherData) => {\n  const imageUrl = await fetchImage(weatherData.current.condition.text);\n  const main = document.querySelector(".main");\n  const location = document.querySelector(".location");\n  const country = document.querySelector(".country");\n  const temp = document.querySelector(".temp");\n  const humidity = document.querySelector(".humidity");\n  const description = document.querySelector(".description");\n  const isDay = document.querySelector(".is-day");\n  const tempUnit = document.querySelector(\n    "input[name=\'temperature-unit\']:checked",\n  ).value;\n\n  if (imageUrl) {\n    document.body.style.background = `center / cover no-repeat url(\'${imageUrl}\')`;\n  }\n  location.textContent = weatherData.location.name;\n  country.textContent = weatherData.location.country;\n\n  temp.textContent =\n    tempUnit === "celcius"\n      ? weatherData.current.temp_c + "\\u00b0" + "C"\n      : weatherData.current.temp_f + "\\u00b0" + "F";\n  humidity.textContent = weatherData.current.humidity;\n  description.textContent = weatherData.current.condition.text;\n  isDay.textContent = weatherData.current.is_day ? "Day" : "Night";\n  main.classList.remove("hidden");\n};\n\nconst fetchImage = async (q) => {\n  try {\n    let response = await fetch(\n      `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${q}`,\n      { mode: "cors" },\n    );\n    if (!response.ok) {\n      let actualError = "";\n      switch (response.status) {\n        case 401:\n          actualError = "API key incorrect";\n          break;\n        case 404:\n          actualError = "Network error";\n          break;\n        default:\n          actualError = "Network response was not OK";\n          break;\n      }\n      throw new Error(actualError);\n    }\n    response = await response.json();\n\n    if (!response.data) throw new Error("Image not found");\n    return response.data.images.original.url;\n  } catch (error) {\n    console.error(error);\n  }\n};\n\n\n//# sourceURL=webpack://weather-app/./src/functions.js?',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
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
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = {};
  /******/ __webpack_modules__["./src/functions.js"](
    0,
    __webpack_exports__,
    __webpack_require__,
  );
  /******/
  /******/
})();
