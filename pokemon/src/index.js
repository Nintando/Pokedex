import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "../src/styles/app.css";

import PageAccueil from "./Pages/PageAccueil";
import PagePokemon from "./Pages/PagePokemon";
import PagePokedex from "./Pages/PagePokedex";
import PagePokeFight from "./Pages/PagePokeFight";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/allPokemon" element={<PagePokemon />} />
        <Route path="/myPokedex" element={<PagePokedex />} />
        <Route path="/pokeFight" element={<PagePokeFight />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
