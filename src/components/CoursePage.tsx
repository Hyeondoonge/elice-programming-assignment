import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import CourseArea from './CourseArea';
import FilterArea from './FilterArea';
import PageNumberArea from './PageNumberArea';
import SearchArea from './SearchArea';
import useDebounce from '../hooks/useDebounce';
import useGetPost from '../hooks/useGetCourse';

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default function CoursePage() {
  const [courses, isLoading, updateCourses] = useGetPost();
  const debounce = useDebounce();
  const [option, setOption] = useState({ offset: 1, count: 20 });

  const onChangeTitleHandler = (title: string) => {
    debounce(() => {
      const newOption = { ...option, title };
      updateCourses(newOption);
      setOption(newOption);
    }, 300);
  };
  const onClickFilter = (filters: Array<string>) => {
    const newOption = { ...option, price: filters };
    updateCourses(newOption);
    setOption(newOption);
  };
  const onClickPageHandler = (page: number) => {
    const newOption = { ...option, offset: page };
    updateCourses(newOption);
    setOption(newOption);
  };

  return (
    <StyledCoursePage>
      <Container>
        <SearchArea onChange={onChangeTitleHandler} />
        <FilterArea onClickHandler={onClickFilter} />
        <CourseArea courses={courses} />
        <PageNumberArea onClick={onClickPageHandler} />
      </Container>
    </StyledCoursePage>
  );
}
