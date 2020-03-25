import * as types from '../actions/gameActionTypes';

const initialState = {
  generations: [],
  grid: [[]],
  aliveCells: 0,
  numberOfGenerations: 0,
  currentGeneration: 0,
  gameOver: false,
};

const changeCurrentGrid = (state: any, action: any) => {
  try {
    const clonedGrid: number[][] = state.generations[state.currentGeneration - 1 + action.change].map((grid: [[]]) =>
      grid.slice()
    );
    const currentGeneration = state.currentGeneration + action.change;
    let aliveCells = clonedGrid.flat().reduce((a, b) => (b === 1 ? a + 1 : a + 0));
    aliveCells = (aliveCells / (clonedGrid.length * clonedGrid.length)) * 100;
    aliveCells = aliveCells > 15 ? 15 : aliveCells;
    return { ...state, grid: clonedGrid, aliveCells, currentGeneration };
  } catch (e) {
    return state;
  }
};

const setInitialGrid = (state: any) => {
  let aliveCells = 0;
  const gridSize = 24;
  const grid: number[][] = [[]];
  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let cell = 0; cell < gridSize; cell++) {
      grid[row].push(Math.round(Math.random()));
      // grid[row].push(0);
    }
    aliveCells += grid[row].reduce((a, b) => a + b);
  }
  aliveCells = (aliveCells / (gridSize * gridSize)) * 100;
  aliveCells = aliveCells > 15 ? 15 : aliveCells;
  const newGrid = setGrowingOrDying(grid);
  return { ...state, grid: newGrid, aliveCells };
};

const setGrowingOrDying = (grid: number[][]) => {
  const newGrid: number[][] = grid.map((row: number[], rowIndex: number) =>
    row.map((cell: number, cellIndex) => {
      const aliveNeighbours = calculateNeighbours(grid, rowIndex, cellIndex);
      switch (cell) {
        case 0:
          return aliveNeighbours === 3 ? 2 : 0;
        case 1:
          return aliveNeighbours < 2 || aliveNeighbours > 3 ? 3 : 1;
        case 2:
          return 1;
        case 3:
          return 0;
        default:
          throw new Error('what happened?');
      }
    })
  );
  return newGrid;
};
const updateCell = (state: any, id: string) => {
  const row: number = Number(id.split(',')[0]);
  const cell: number = Number(id.split(',')[1]);
  const clonedGrid: number[][] = [...state.grid];
  clonedGrid[row][cell] === 1 ? (clonedGrid[row][cell] = 0) : (clonedGrid[row][cell] = 1);
  return { ...state, grid: clonedGrid };
};

const nextGeneration = (state: any) => {
  if (state.currentGeneration < state.numberOfGenerations) {
    return changeCurrentGrid(state, { change: 1 });
  } else {
    const numberOfGenerations = state.numberOfGenerations + 1;
    const currentGeneration = state.currentGeneration + 1;
    const previousGenerations = state.generations.slice();
    const newGrid = setGrowingOrDying(state.grid);
    if (previousGenerations.length > 200) {
      previousGenerations.shift();
      previousGenerations.push(state.grid);
    } else {
      previousGenerations.push(state.grid);
    }
    let aliveCells = newGrid.flat().reduce((a, b) => (b === 1 ? a + 1 : a + 0));
    aliveCells = (aliveCells / (newGrid.length * newGrid.length)) * 100;
    aliveCells = aliveCells > 15 ? 15 : aliveCells;
    if (aliveCells === 0) {
      return {
        ...state,
        grid: newGrid,
        generations: previousGenerations,
        aliveCells,
        numberOfGenerations,
        currentGeneration,
        gameOver: true,
      };
    }
    return {
      ...state,
      grid: newGrid,
      generations: previousGenerations,
      aliveCells,
      numberOfGenerations,
      currentGeneration,
    };
  }
};

const calculateNeighbours = (oldGrid: number[][], row: number, cell: number) => {
  const previousRow = row === 0 ? oldGrid.length - 1 : row - 1;
  const nextRow = row === oldGrid.length - 1 ? 0 : row + 1;
  const previousCell = cell === 0 ? oldGrid.length - 1 : cell - 1;
  const nextCell = cell === oldGrid.length - 1 ? 0 : cell + 1;
  const neighbourCells: number[] = [
    oldGrid[previousRow][cell],
    oldGrid[previousRow][nextCell],
    oldGrid[previousRow][previousCell],
    oldGrid[row][previousCell],
    oldGrid[row][nextCell],
    oldGrid[nextRow][cell],
    oldGrid[nextRow][nextCell],
    oldGrid[nextRow][previousCell],
  ];
  return neighbourCells.reduce((a, b) => (b === 1 || b === 2 ? a + 1 : a + 0));
};
const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_INITIAL_GRID:
      return setInitialGrid(state);
    case types.UPDATE_CELL:
      return updateCell(state, action.id);
    case types.START_GAME:
      return nextGeneration(state);
    case types.CHANGE_CURRENT_GRID:
      return changeCurrentGrid(state, action);
    default:
      return state;
  }
};

export default gameReducer;
