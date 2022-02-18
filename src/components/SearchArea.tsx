import React from 'react';
import styled from 'styled-components';

const StyledSearchArea = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
`;

export default function SearchArea() {
  return (
    <div>
      <StyledInput type="text" />
    </div>
  );
}
