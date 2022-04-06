import React, { useEffect, useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import Container from '../common/Container';
import CourseArea from '../course/CourseArea';
import FilterArea from '../course/FilterArea';
import PageNumberArea from '../course/PageNumberArea';
import SearchArea from '../course/SearchArea';
import { TailSpin } from 'react-loader-spinner';
import CourseContext from '../context/CourseContext';

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const CoursePageContext = createContext([]);

export default function CoursePage() {
  const [option, setOption, data, loading] = useContext(CourseContext);

  return (
    <StyledCoursePage>
      <Container>
        <SearchArea />
        <FilterArea />
        {loading ? (
          <TailSpin color="#af97b4" width={80} height={80} />
        ) : data.totalCount === 0 ? (
          <div>검색된 결과가 없습니다.</div>
        ) : (
          <>
            <CourseArea />
            <PageNumberArea />
          </>
        )}
      </Container>
    </StyledCoursePage>
  );
}
