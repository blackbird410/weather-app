import "./style.css";
import pageIcon from "./cloudy-outline.svg";
import { fetchData, displayMain, displayWeather } from "./functions.js";

const link = document.createElement("link");
link.setAttribute("rel", "icon");
link.setAttribute("type", "image/x-icon");
link.setAttribute("href", pageIcon);
document.head.appendChild(link);
displayMain();
