import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default function CoursePage() {
  return (
    <StyledCoursePage>
      <Container />
    </StyledCoursePage>
  );
}
