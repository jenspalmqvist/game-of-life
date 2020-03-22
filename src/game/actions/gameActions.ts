import * as actions from './gameActionTypes';

export const setInitialGrid = (payload: any) => ({
  type: actions.SET_INITIAL_GRID,
  payload,
});

export const getInitialGrid = () => ({
  type: actions.GET_INITIAL_GRID,
});

export const updateCell = (id: string) => ({
  type: actions.UPDATE_CELL,
  id,
});

export const startGame = () => ({
  type: actions.START_GAME,
});
