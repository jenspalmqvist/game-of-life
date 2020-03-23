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
  color: string;
};

export const StyledCell = styled.button<CellProps>`
  background-color: ${props => props.color};
  border: 1px solid lightgrey;
`;

const Cell = ({ id, cellStatus, color }: CellProps) => {
  const dispatch = useDispatch();
  const status = cellStatus;
  return <StyledCell id={id} cellStatus={status} onClick={() => dispatch(actions.updateCell(id))} color={color} />;
};

export default Cell;
