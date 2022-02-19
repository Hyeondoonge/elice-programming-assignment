import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import CourseArea from './CourseArea';
import FilterArea from './FilterArea';
import PageNumberArea from './PageNumberArea';
import SearchArea from './SearchArea';
import useDebounce from '../hooks/useDebounce';
import useGetCourse from '../hooks/useGetCourse';
import ErrorPage from './ErrorPage';

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default function CoursePage() {
  const [courses, totalCount, updateCourses] = useGetCourse();
  const debounce = useDebounce();
  const [option, setOption] = useState({ title: '', offset: 0, count: 20 });
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const onChangeTitleHandler = (title: string) => {
    try {
      debounce(() => {
        const newOption = { ...option, offset: 0, title };
        setPage(1);
        updateCourses(newOption);
        setOption(newOption);
      }, 300);
    } catch (error) {
      setError(error);
    }
  };
  const onClickFilterHandler = (filters: Array<string>) => {
    try {
      const newOption = { ...option, offset: 0, price: filters };
      setPage(1);
      updateCourses(newOption);
      setOption(newOption);
    } catch (error) {
      setError(error);
    }
  };
  const onClickPageHandler = (page: number) => {
    try {
      const newOption = { ...option, offset: (page - 1) * 20 };
      updateCourses(newOption);
      setOption(newOption);
    } catch (error) {
      setError(error);
    }
  };
  if (error) return <ErrorPage error={error} />;

  return (
    <StyledCoursePage>
      <Container>
        <SearchArea onChangeHandler={onChangeTitleHandler} />
        <FilterArea onClickHandler={onClickFilterHandler} />
        {option.title !== '' &&
          (courses.length === 0 ? (
            <div>검색된 결과가 없습니다.</div>
          ) : (
            <>
              <CourseArea courses={courses} />
              <PageNumberArea totalCount={totalCount} page={page} updatePage={setPage} onClickHandler={onClickPageHandler} />
            </>
          ))}
      </Container>
    </StyledCoursePage>
  );
}
