import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { UserContext } from "./components/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <UserContext>
                <App />
            </UserContext>
        </React.StrictMode>
    </BrowserRouter>
);
