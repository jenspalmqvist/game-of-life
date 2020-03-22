import * as types from '../actions/gameActionTypes';

const initialState = { generations: [], grid: [[]], aliveCells: 0, numberOfGenerations: 0 };

const setInitialGrid = (state: any) => {
  let aliveCells = 0;
  const gridSize = 40;
  const grid: number[][] = [[]];
  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let cell = 0; cell < gridSize; cell++) {
      grid[row].push(Math.round(Math.random()));
      // grid[row].push(0);
    }
    aliveCells += grid[row].reduce((a, b) => a + b);
  }
  return { ...state, grid, aliveCells };
};

const updateCell = (state: any, id: string) => {
  const row: number = Number(id.split(',')[0]);
  const cell: number = Number(id.split(',')[1]);
  const clonedGrid: number[][] = [...state.grid];
  // const clonedRow = clonedGrid[row];
  // let clonedCell = clonedRow[cell];
  // clonedCell === 1 ? (clonedCell = 0) : (clonedCell = 1);
  // console.log(clonedCell);
  // clonedRow[cell] = clonedCell;
  clonedGrid[row][cell] === 1 ? (clonedGrid[row][cell] = 0) : (clonedGrid[row][cell] = 1);
  return { ...state, grid: clonedGrid };
};

const nextGeneration = (state: any) => {
  const numberOfGenerations = state.numberOfGenerations + 1;
  const clonedState = { ...state };
  const previousGenerations = clonedState.generations;
  const oldGrid: number[][] = state.grid.map((row: []) => row.slice());
  const newGrid: number[][] = state.grid.map((row: []) => row.slice());
  previousGenerations.push(oldGrid);
  for (let row = 0; row < oldGrid.length; row++) {
    for (let cell = 0; cell < oldGrid.length; cell++) {
      const aliveNeighbours = calculateNeighbours(oldGrid, row, cell);
      switch (oldGrid[row][cell]) {
        case 1:
          aliveNeighbours < 2 || aliveNeighbours > 3
            ? (newGrid[row][cell] = 0)
            : (newGrid[row][cell] = oldGrid[row][cell]);
          break;
        case 0:
          aliveNeighbours === 3 ? (newGrid[row][cell] = 1) : (newGrid[row][cell] = oldGrid[row][cell]);
          break;
        default:
          throw new Error('what happened?');
      }
    }
  }
  const aliveCells = newGrid.flat().reduce((a, b) => a + b);
  return { ...state, grid: newGrid, generations: previousGenerations, aliveCells, numberOfGenerations };
};

const calculateNeighbours = (oldGrid: number[][], row: number, cell: number) => {
  const previousRow = row === 0 ? oldGrid.length - 1 : row - 1;
  const nextRow = row === oldGrid.length - 1 ? 0 : row + 1;
  const previousCell = cell === 0 ? oldGrid.length - 1 : cell - 1;
  const nextCell = cell === oldGrid.length - 1 ? 0 : cell + 1;

  return (
    oldGrid[previousRow][cell] +
    oldGrid[previousRow][nextCell] +
    oldGrid[previousRow][previousCell] +
    oldGrid[row][previousCell] +
    oldGrid[row][nextCell] +
    oldGrid[nextRow][cell] +
    oldGrid[nextRow][nextCell] +
    oldGrid[nextRow][previousCell]
  );
};
const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_INITIAL_GRID:
      return setInitialGrid(state);
    case types.UPDATE_CELL:
      return updateCell(state, action.id);
    case types.START_GAME:
      return nextGeneration(state);
    default:
      return initialState;
  }
};

export default gameReducer;
