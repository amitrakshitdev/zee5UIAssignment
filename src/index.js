import html from "./index.html";
import style from "./main.css";
import React, { ReactDOM } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
const root = createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App/></React.StrictMode>);