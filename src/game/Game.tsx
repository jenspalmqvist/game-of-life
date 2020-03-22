import styled from 'styled-components';
import React, { useEffect } from 'react';
import Cell from './components/Cell';
import * as actions from './actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/Button';
enum CellStatus {
  Alive,
  Dead,
  Growing,
  Dying,
}

const GameBoard = styled.div`
  display: inline-block;
  width: 800px;
`;

const GridRow = styled.div`
  display: flex;
  height: 20px;
`;

let cellId = 0;

const renderGrid = (grid: number[][]) => {
  return grid.map((row: number[]) => (
    <GridRow key={grid.indexOf(row)}>
      {row.map((cell: number) => {
        if (cellId >= grid.length) {
          cellId = 0;
        }
        return (
          <Cell
            id={`${grid.indexOf(row)},${cellId++}`}
            key={`${grid.indexOf(row)},${cellId}`}
            cellStatus={cell === 1 ? CellStatus.Alive : CellStatus.Dead}
          />
        );
      })}
    </GridRow>
  ));
};

export const Game = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: any) => state.game.grid);
  console.log(grid);
  useEffect(() => {
    if (grid.length === 1) {
      dispatch(actions.getInitialGrid());
    }
  }, [grid]);
  return (
    <GameBoard>
      {renderGrid(grid)}
      <button onClick={() => dispatch(actions.startGame())}>Next generation</button>
    </GameBoard>
  );
};
