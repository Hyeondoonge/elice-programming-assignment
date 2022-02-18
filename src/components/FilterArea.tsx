import React from 'react';
import styled from 'styled-components';
import List from '../common/List';

interface FilterAreaProps {
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

interface ChipProps {
  label: string;
  // onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const StyledChip = styled.div`
  cursor: pointer;
`;

const Chip = ({ label }: ChipProps) => {
  return <StyledChip>{label}</StyledChip>;
};

const StyledFilterArea = styled.div`
  width: 100%;
`;

export default function FilterArea({ onClick }: FilterAreaProps) {
  return (
    <StyledFilterArea>
      필터영역
      <div>
        <List>
          <Chip label={'필터1'} />
          <Chip label={'필터2'} />
        </List>
      </div>
    </StyledFilterArea>
  );
}
