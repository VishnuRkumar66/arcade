import React from "react";
import { Link } from "react-router-dom";
import word from "../assets/wordle.png";
import tic from "../assets/tictactoe.png";
import tiles from "../assets/tiles.png";
import stack from "../assets/stack.png";
import rock from "../assets/rock.png";
import num from "../assets/guesses.png";
import typ from "../assets/typing.png";
const Mainpage = () => {
  const games = [
    { image: word, path: "/wordle" },
    { image: tic, path: "/tictactoe" },
    { image: tiles, path: "/tiles" },
    { image: stack, path: "/stack" },
    { image: rock, path: "/rock" },
    { image: num, path: "/guess" },
    { image: typ, path: "/typing" },
  ];
  return (
    <>
      <header className="flex justify-center">
        <p className=" text-center w-fit text-[27px] text-transparent bg-clip-text bg-[linear-gradient(to_right,_red,_orange,_yellow,_green,_blue,_indigo,_violet)]  p-2">
          WELCOME TO MY ARCADE
        </p>
      </header>
      <div className="flex flex-wrap justify-center">
        {games.map((game, index) => (
          <Link key={index} to={game.path}>
            <div className="m-3  w-[170px] h-[170px] flex justify-center">
              <img
                src={game.image}
                className="w-full rounded-2xl h-full border-2 border-yellow-400 shadow-red-600 hover:shadow-lg   hover:scale-105 duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Mainpage;
