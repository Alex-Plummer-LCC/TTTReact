import './App.css';
import Status from './components/Status';
import Square from './components/Square';
import { useState } from 'react';

// The variable lines doesn't have to do with state, so it can be global.
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Convert calculateWinner to a function expression and completely remove the keyword "this", as calculateWinner is now global (and no longer part of a class).
const calculateWinner = (squares) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return { winner: null, winningLine: [] };
}

// App is the parent functional component (its children are Status and Square).
function App() {
  // Use the useState method to create and set the state variables (instead of this.state).
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState({ winner: null, winningLine: [] });

  // handleClick is now a function expression, and it does not use the keyword "this".
  const handleClick = (event) => {
    const i = parseInt(event.target.id);
    let localSquares = [...squares];
    localSquares[i] = xIsNext ? 'X' : 'O';
    const theWinner = calculateWinner(localSquares);

    // Instead of calling setState, use the functions returned by useState to modify the state variables.
    setSquares(localSquares);
    setXIsNext(!xIsNext);
    setWinner(theWinner);
  }

  /* Convert renderSquare to a function expression, and, once again, completely remove the keyword "this", as App
  is now a functional component. */
  const renderSquare = (i) => {
    const className = (squares[i] == null) ? "square" :
      (winner.winner != null && // winner is now an object, so I need to access the individual properties of that object.
        winner.winner === squares[i]) &&
        winner.winningLine.includes(i) ?
        "square-winner" : "square-full";
    const enabled = (winner.winner == null && squares[i] == null) ? true : false;
    const eventHandler = (enabled) ? handleClick : () => { };
    const value = (squares[i] != null) ? squares[i] : "";

    // Return the JSX involving the component Square and all of its corresponding props.
    return (
      <Square
        className={className}
        eventHandler={eventHandler}
        value={value}
        index={i}
      />
    );
  }

  let status;
  if (winner.winner) {
    status = "Winner: " + winner.winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  /* The JSX returned by App now uses the functional component Status to display the status and, like the other functions,
  doesn't use "this" at all. */
  return (
    <div>
      <Status status={status} />
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
}

export default App;