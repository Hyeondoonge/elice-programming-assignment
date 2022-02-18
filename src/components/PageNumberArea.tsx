import React from 'react';
import styled from 'styled-components';
import List from '../common/List';

interface PageNumberAreaProps {
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const StyledBox = styled.div`
  cursor: pointer;
`;

export default function PageNumberArea({ onClick }: PageNumberAreaProps) {
  return (
    <div>
      <List>
        <StyledBox>1</StyledBox>
        <StyledBox>2</StyledBox>
        <StyledBox>3</StyledBox>
      </List>
    </div>
  );
}
