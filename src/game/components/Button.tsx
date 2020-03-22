import React from 'react';
import styled, { css } from 'styled-components/macro';

type ButtonProps = {
  children: object | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const StyledButton = styled.button``;

const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick} />;
};

export default Button;
