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
  const [courses, totalCount, isLoading, updateCourses] = useGetPost();
  const debounce = useDebounce();
  const [option, setOption] = useState({ title: '', offset: 0, count: 20 });

  const onChangeTitleHandler = (title: string) => {
    debounce(() => {
      const newOption = { ...option, title };
      updateCourses(newOption);
      setOption(newOption);
    }, 300);
  };
  const onClickFilterHandler = (filters: Array<string>) => {
    const newOption = { ...option, price: filters };
    updateCourses(newOption);
    setOption(newOption);
  };
  const onClickPageHandler = (page: number) => {
    const newOption = { ...option, offset: (page - 1) * 20 };
    updateCourses(newOption);
    setOption(newOption);
  };

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
              <PageNumberArea totalPage={1 + Math.floor(totalCount / 20)} onClickHandler={onClickPageHandler} />
            </>
          ))}
      </Container>
    </StyledCoursePage>
  );
}
