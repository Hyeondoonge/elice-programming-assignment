import React from 'react';
import styled from 'styled-components';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

interface StyledChipProps {
  selected: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const StyledChip = styled.div<StyledChipProps>`
  cursor: pointer;
  background-color: ${props => (props.selected ? '#af97b4' : '#E8E8E8')};
  color: ${props => (props.selected ? 'white' : 'black')};
  border-radius: 40px;
  padding: 5px;
  transition: 0.3s;
`;

export default function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <StyledChip selected={selected} onClick={onClick}>
      {label}
    </StyledChip>
  );
}
