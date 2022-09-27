import React from 'react';

const Square: React.FC<{
  position: number,
  handleClick: (position: number) => void,
  clicked: boolean
}> = ({position, handleClick, clicked}) => {
  return (
    <li className={`square-li position-${position} ${clicked ? 'clicked' : ''}`}>
      <button onClick={() => handleClick(position)}></button>
    </li>
  );
};

const SquareContainer: React.FC<{squares: Array<number>}> = ({squares}) => {
  const [squaresState, setSquaresState] = React.useState<Array<number>>([]);

  const isClicked = (position: number): boolean => {
    return squaresState.findIndex((item) => item === position) === -1 ? false : true;
  };

  const handleSquareClicked = (position: number) => {
    setSquaresState([...squaresState, position]);
  };

  const removeSquarePromise = React.useCallback((idx: number): Promise<Array<number>> => {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        const newSquaresArray = squaresState;
        newSquaresArray.pop();
        resolve(newSquaresArray);
      }, 1000 * (idx + 1));
    });
  }, [squaresState]);

  const removeClickedSquares = React.useCallback(() => {
    let timeOut;
    squaresState.forEach(async (ele, idx) => {
      const remainingArray: Array<number> = await removeSquarePromise(idx);
      setSquaresState([...remainingArray]);
    });

    clearInterval(timeOut);
  }, [squaresState, removeSquarePromise]);

  React.useEffect(() => {
    if (squaresState.length === squares.length) {
      removeClickedSquares();
    }
  }, [squaresState.length, squares.length, removeClickedSquares, removeSquarePromise]);

  return (
    <ul className='square-ul'>
      {
       squares.map((item: number) => (
          <Square
            key={item}
            position={item}
            handleClick={handleSquareClicked}
            clicked={isClicked(item)}
          />
        ))
      }
    </ul>
  )
};

function App() {
  const squaresArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="App">
      <SquareContainer squares={squaresArray}/>
    </div>
  );
}

export default App;
