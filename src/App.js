import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import React from "react";
import { AI } from "boardgame.io/ai";
//import { TicTacToeBoard } from "./TicTacToeBoard";

class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) {
      return false;
    }
    if (this.props.G.cells[id] !== null) {
      return false;
    }
    return true;
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: "1px solid #000",
      width: "75px",
      height: "75px",
      lineHeight: "60px",
      textAlign: "center"
    };

    let tbody = [];

    for (var i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td style={cellStyle} key="id" onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] != symbol) {
        winner = null;
        break;
      }
    }
    if (winner != null) return true;
  }
  return false;
}

function IsDraw(cells) {
  return cells.filter(c => c === null).length == "0";
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];
      cells[id] = ctx.currentPlayer;
      return { ...G, cells };
    }
  },

  flow: {
    movesPerTurn: 1,
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (IsDraw(G.cells)) {
        return { draw: true };
      }
    }
  }
});

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: true,
  ai: AI({
    enumerate: (G, ctx) => {
      let moves = [];
      for (let it = 0; it < 9; it++) {
        if (G.cells[it] === null) {
          moves.push({ move: "clickCell", args: [it] });
        }
      }
      return moves;
    }
  })
});

export default App;
