import React, { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import CourseArea from './CourseArea';
import FilterArea from './FilterArea';
import PageNumberArea from './PageNumberArea';
import SearchArea from './SearchArea';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default function CoursePage() {
  const [data, setData] = useState([]);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onClickFilter = (e: React.MouseEvent<HTMLInputElement>) => {};
  const onClickPage = (e: React.MouseEvent<HTMLInputElement>) => {};

  return (
    <StyledCoursePage>
      <Container>
        <SearchArea onChange={onChangeKeyword} />
        <FilterArea onClick={onClickFilter} />
        <CourseArea />
        <PageNumberArea onClick={onClickPage} />
      </Container>
    </StyledCoursePage>
  );
}
