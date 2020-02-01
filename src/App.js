import React, { useState, useEffect } from 'react';
import './App.css';

const initMatrix = [];

function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize] = useState(3);
  const [currentPlayer, setcurrentPlayer] = useState("x");
  const [selR, setSelR] = useState(null);
  const [selC, setSelC] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);
  const [draw, setDraw] = useState(false);
  const [initPlayer, setInitPlayer] = useState("x");

  function resetGame() {
    setReset(!reset);
    setInitPlayer(!initPlayer);
  }

  useEffect(() => {
    setWinner(false);
    setDraw(false);
    setSelR(null);
    setSelC(null);
    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];

    for (let i=0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }

    setMatrix(tempMatrix);
  }, [reset]);

  function squareClick(r, c) {
    setSelC(c);
    setSelR(r);
    if(!matrix[r][c] && !winner) {
      let nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
      setcurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrix[r][c] = nextPlayer;
      setMatrix(matrixCopy);
    }

    const flatMatrix = matrix.flat();
    if(!flatMatrix.includes(null)) {
      setDraw(!draw);
    }
  }

  function isWinner() {
    let vertical = true;
    let horisontal = true;
    let d1 = true;
    let d2 = true;

    if(selC == null || selR == null) {
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
      if(matrix[i][selC] !== currentPlayer) {
        vertical = false;
      }
      if(matrix[selR][i] !== currentPlayer) {
        horisontal = false;
      }
      if(matrix[i][i] !== currentPlayer) {
        d1 = false;
      }
      if(matrix[i][matrixSize - i - 1] !== currentPlayer) {
        d2 = false;
      }
    }

    if (vertical || horisontal || d1 || d2) {
      setWinner(true);
    }
  }

  useEffect(() => {
    if(!winner) {
      isWinner();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            matrix.map((val, c) => {
              return (
                <div key={c} className="c">
                  {
                    val.map((val1, r) => (
                      <div key={c + r + c} className="r" onClick={() => squareClick(r, c)}>
                        {matrix[r][c]}
                      </div>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
        <h4>{winner && `Player "${currentPlayer}" wins.`}</h4>
        {(winner || draw) && <button className="reset-btn" onClick={resetGame}>Start again</button>}
      </header>
    </div>
  );
}

export default App;
