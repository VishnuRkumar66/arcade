import React from "react";
import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./Components/Mainpage";
import Wordle from "./Components/Wordle";
import TicTacToe from "./Components/Tictactoe";
import Tiles from "./Components/Tiles";
import Rodstack from "./Components/Rodstack";
import Rock from "./Components/Rock";
import Guess from "./Components/Guess";
import Typing from "./Components/Typing";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-2xl text-red-500">
      <p>404 - Page Not Found</p>
    </div>
  );
};

function App() {
  return (
    <div className="w-screen min-h-screen bg-center bg-repeat bg-[url('/background.png')] text-white bg-blend-color-burn bg-black/80 font-bold">
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/tiles" element={<Tiles />} />
          <Route path="/stack" element={<Rodstack />} />
          <Route path="/rock" element={<Rock />} />
          <Route path="/guess" element={<Guess />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
