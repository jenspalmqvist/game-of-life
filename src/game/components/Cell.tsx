import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/gameActions';

enum CellStatus {
  Dead,
  Alive,
  Growing,
  Dying,
}

type CellProps = {
  id: string;
  cellStatus: CellStatus;
};

export const StyledCell = styled.button<CellProps>`
  background-color: ${props =>
    props.cellStatus === CellStatus.Alive
      ? `violet`
      : props.cellStatus === CellStatus.Growing
      ? `pink`
      : props.cellStatus === CellStatus.Dying
      ? 'brown'
      : 'light-grey'};
  flex-grow: 1;
  border: 1px solid lightgrey;
`;

const Cell = ({ id, cellStatus }: CellProps) => {
  const dispatch = useDispatch();
  const switchState = () => {
    switch (cellStatus) {
      case CellStatus.Alive:
        status = CellStatus.Dead;
        break;
      case CellStatus.Dead:
        status = CellStatus.Alive;
        break;
      default:
        return cellStatus;
    }
  };
  let status = cellStatus;
  return <StyledCell id={id} cellStatus={status} onClick={() => dispatch(actions.updateCell(id))} />;
};

export default Cell;
