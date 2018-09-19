import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { AI } from "boardgame.io/ai";
import TicTacToe from "./Game";
import TicTacToeBoard from "./TicTacToeBoard";

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  ai: AI({
    enumerate: G => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: "clickCell", args: [i] });
        }
      }
      return moves;
    }
  })
});

render(<App />, document.getElementById("root"));
