import { useState } from 'react';

const useTicTacToe = () => {
  const [column, setcolumn] = useState(3);
  let initialBoardSize = Array(column * column).fill(null);
  const [board, setBoard] = useState<(string | null)[]>(initialBoardSize);
  const [isNextX, setIsNextX] = useState(true);

  const ROW_PATTERN = () => {
    const copyArray = [...board].map((_, item) => item);
    let result: number[][] = [];
    for (let i = 0; i < copyArray.length; i += column) {
      result.push(copyArray.slice(i, i + column));
    }
    return result;
  };

  const COLUMN_PATTERN = () => {
    const copyArray = ROW_PATTERN();
    let result: number[][] = [];
    for (let i = 0; i < column; i++) {
      let item: number[] = [];
      for (let j = 0; j < column; j++) {
        item.push(copyArray[j][i]);
      }
      result[i] = item;
    }
    return result;
  };

  const CROSS_PATTERN = () => {
    const copyArray = ROW_PATTERN();
    let result: number[][] = [];

    for (let i = 0; i < 2; i++) {
      let item: number[] = [];

      for (let j = 0; j < column; j++) {
        if (i === 0) {
          item.push(copyArray[j][j]);
        } else {
          item.push(copyArray[j][column - 1 - j]);
        }
      }
      result[i] = item;
    }
    return result;
  };

  const WINNING_PATTERN = [
    ...ROW_PATTERN(),
    ...COLUMN_PATTERN(),
    ...CROSS_PATTERN(),
  ];

  const calculaterWinner = (currBoard: (string | null)[]) => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const allEqualValues = WINNING_PATTERN[i].map((item) => currBoard[item]);
      if (allEqualValues.every((val) => val === allEqualValues[0])) {
        return allEqualValues[0];
      }
    }
    return null;
  };

  const getStatusMessage = () => {
    let message = '';
    let isWinner = 'X';
    const winner = calculaterWinner(board);

    if (winner) {
      isWinner = winner;
      message = `Winner is '${winner}'`;
      return { message, isWinner };
    }
    const nullBoard = board.filter((item) => item === null);
    if (nullBoard.length === 0) {
      message = 'Match is draw!';
      return { message, isWinner };
    }

    if (isNextX) {
      message = `Player 'X' Turn`;
      isWinner = 'X';
      return { message, isWinner };
    }
    isWinner = 'O';
    message = `Player 'O' Turn`;

    return { message, isWinner };
  };

  const handleClick = (index: number) => {
    const winner = calculaterWinner(board);
    // console.log(winner);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isNextX ? 'X' : 'O';

    setBoard(newBoard);
    setIsNextX(!isNextX);
  };

  const reset = () => {
    setBoard(initialBoardSize);
    setIsNextX(true);
  };

  const handleColumn = (column: number) => {
    setcolumn(column);
    initialBoardSize = Array(column * column).fill(null);
    setBoard(initialBoardSize);
    setIsNextX(true);
  };
  return { board, handleClick, reset, handleColumn, column, getStatusMessage };
};

export default useTicTacToe;
