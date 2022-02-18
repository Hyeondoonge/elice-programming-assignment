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
  ${props => (props.selected ? `background-color: #af97b4; color: white;` : `background-color: grey; color: black;`)}
  border-radius: 40px;
  padding: 5px;
`;

export default function Chip({ label, selected }: ChipProps) {
  return <StyledChip selected={selected}>{label}</StyledChip>;
}
