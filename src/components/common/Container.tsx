import React from 'react';
import styled from 'styled-components';
import { ComponentProps } from 'Types/component';

const StyledContainer = styled.div`
  @media screen and (min-width: 1280px) {
    width: 1280px;
  }
  width: 100%;
  margin: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export default function Container({ children }: ComponentProps) {
  return <StyledContainer>{children}</StyledContainer>;
}
