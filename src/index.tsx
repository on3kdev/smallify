import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "./css/fonts.css";
import "./css/global.css";

const rootEl = document.querySelector("#root");

render(<App />, rootEl);
