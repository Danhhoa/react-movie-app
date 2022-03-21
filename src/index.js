import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #06121e;
  }
  html {
    font-size: 16px;
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <Router >
      <GlobalStyle />
      <Routes>
        <Route path="/" element= { <App />} />
        <Route path="/movie/:movieId" element= 
              {<MovieInfoComponent
                // selectedMovie={selectedMovie}
                // onMovieSelect={onMovieSelect}
              />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
