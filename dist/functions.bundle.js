/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayMain: () => (/* binding */ displayMain),\n/* harmony export */   displayWeather: () => (/* binding */ displayWeather),\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\nconst key = \"8212294bf6e74d0ba3980745241902\";\nconst gifKey = \"j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL\";\n\nconst displayMain = () => {\n  const inputWrapper = document.createElement(\"div\");\n  const input = document.createElement(\"input\");\n  const btn = document.createElement(\"div\");\n  const weatherInfo = document.createElement(\"div\");\n  const error = document.createElement(\"span\");\n\n  inputWrapper.className = \"input-wrapper\";\n  input.id = \"city\";\n  input.name = \"city\";\n  input.placeholder = \"Enter a city...\";\n  btn.className = \"submit-btn\";\n  btn.textContent = \"Search\";\n  btn.addEventListener(\"click\", getWeather);\n  weatherInfo.className = \"weather-info\";\n  error.className = \"error\";\n\n  inputWrapper.appendChild(input);\n  inputWrapper.appendChild(btn);\n  document.body.appendChild(inputWrapper);\n  document.body.appendChild(error);\n  document.body.appendChild(weatherInfo);\n};\n\nconst getWeather = async () => {\n  if (document.querySelector(\".main\")) document.querySelector(\".main\").remove();\n  const city = document.querySelector(\"input\").value;\n  if (city) {\n    const cityWeather = await fetchData(city);\n    const error = document.querySelector(\"span\");\n    if (cityWeather.current != undefined) {\n      displayWeather(cityWeather);\n      error.classList.remove(\"active\");\n    } else {\n      error.textContent = cityWeather.message;\n      error.classList.add(\"active\");\n    }\n  }\n};\n\nconst displayError = (error) => {};\n\nconst fetchData = async (city) => {\n  try {\n    let response = await fetch(\n      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,\n      { mode: \"cors\" },\n    );\n\n    if (!response.ok) {\n      let currentError = await response.json();\n      throw new Error(currentError.error.message);\n    }\n\n    let weatherData = await response.json();\n    return weatherData;\n  } catch (error) {\n    return error;\n  }\n};\n\nconst displayWeather = async (weatherData) => {\n  const imageUrl = await fetchImage(weatherData.current.condition.text);\n  const main = document.createElement(\"div\");\n  const location = document.createElement(\"div\");\n  const country = document.createElement(\"div\");\n  const temp = document.createElement(\"div\");\n  const humidity = document.createElement(\"div\");\n  const description = document.createElement(\"div\");\n  const isDay = document.createElement(\"div\");\n\n  main.className = \"main\";\n  location.className = \"location\";\n  country.className = \"country\";\n  temp.className = \"temp\";\n  humidity.className = \"humidity\";\n  description.className = \"description\";\n  isDay.className = \"is-day\";\n\n  if (imageUrl) {\n    document.body.style.background = `center / cover no-repeat url('${imageUrl}')`;\n  }\n  location.textContent = weatherData.location.name;\n  country.textContent = weatherData.location.country;\n  temp.textContent = weatherData.current.temp_c + \"\\u00b0\";\n  temp.style.background = \"orange\";\n  temp.style.fontSize = \"4rem\";\n  humidity.textContent = weatherData.current.humidity;\n  description.textContent = weatherData.current.condition.text;\n  isDay.textContent = weatherData.current.is_day ? \"Day\" : \"Night\";\n\n  main.appendChild(location);\n  main.appendChild(country);\n  main.appendChild(temp);\n  main.appendChild(humidity);\n  main.appendChild(description);\n  main.appendChild(isDay);\n  document.querySelector(\".weather-info\").appendChild(main);\n};\n\nconst fetchImage = async (q) => {\n  try {\n    let response = await fetch(\n      `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${q}`,\n      { mode: \"cors\" },\n    );\n    if (!response.ok) {\n      let actualError = \"\";\n      switch (response.status) {\n        case 401:\n          actualError = \"API key incorrect\";\n          break;\n        case 404:\n          actualError = \"Network error\";\n          break;\n        default:\n          actualError = \"Network response was not OK\";\n          break;\n      }\n      throw new Error(actualError);\n    }\n    response = await response.json();\n\n    if (!response.data) throw new Error(\"Image not found\");\n    return response.data.images.original.url;\n  } catch (error) {\n    console.error(error);\n  }\n};\n\n\n//# sourceURL=webpack://weather-app/./src/functions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/functions.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;