import React from 'react';
import styled from 'styled-components';

interface ListProps {
  children: React.ReactNode;
}
const StyledList = styled.div`
  flex-wrap: wrap;
  display: flex;
  position: relative;
  gap: 1rem;
`;

export default function List({ children }: ListProps) {
  return <StyledList>{children}</StyledList>;
}
