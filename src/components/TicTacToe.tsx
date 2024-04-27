import useTicTacToe from '../hooks/useTicTacToe';
import mergeClass from '../utils/mergeClass';

const TicTacToe = () => {
  const { board, handleClick, reset, handleColumn, column, getStatusMessage } =
    useTicTacToe();

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${column}, 1fr)`,
    gridTemplateRows: 'repeat(${column}, 1fr)',
  };

  return (
    <div
      className="space-y-6  font-medium tracking-wide text-lg p-24 pt-10 shadow-lg   bg-red-200 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20  font-sans
    "
    >
      <h2 className="text-center text-white text-2xl font-normal p-2 border-2 underline-offset-4 ">
        Advanced Tic Tac Toe
      </h2>
      <div className="flex  justify-between   items-center">
        <p
          className={mergeClass(
            'px-4 py-3 shadow-lg bg-white/100 uppercase rounded-md w-48 text-center',
            getStatusMessage().isWinner === 'X'
              ? 'text-blue-600'
              : 'text-red-600'
          )}
        >
          {getStatusMessage().message}
        </p>
        <button
          onClick={() => reset()}
          className="bg-white/20 shadow-lg  px-5 py-3 rounded-md hover:bg-white/30 transition-all text-white outline-2 uppercase hover:text-white"
        >
          Reset
        </button>
      </div>
      <div className="text-center px-4 py-3 bg-black/20 shadow-lg rounded-md uppercase text-white">
        Select a Grid
        <select
          className="px-2 border-none focus:outline-none w-20 ml-4 text-black bg-transparent "
          onChange={(e) => handleColumn(Number(e.target.value))}
        >
          <option value={3}>3 X 3</option>
          <option value={4}>4 X 4</option>
          <option value={5}>5 X 5</option>
          <option value={6}>6 X 6</option>
          <option value={7}>7 X 7</option>
          <option value={8}>8 X 8</option>
          <option value={9}>9 X 9</option>
        </select>
      </div>
      <div
        style={gridStyle}
        className={mergeClass(
          ' border border-white relative bg-white/15',
          column > 6 ? 'text-2xl' : 'text-4xl'
        )}
      >
        {board.map((b, index) => (
          <button
            key={index}
            className={mergeClass(
              'flex items-center justify-center  border border-white ',
              b === 'X' ? 'text-blue-600' : 'text-red-600',
              column > 6 ? 'w-16 h-16' : 'w-24 h-24'
            )}
            onClick={() => handleClick(index)}
            disabled={!!b}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
