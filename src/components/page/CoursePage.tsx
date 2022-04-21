import React, { useContext, createContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Container from '../common/Container';
import CourseArea from '../course/CourseArea';
import FilterArea from '../course/FilterArea';
import PageNumberArea from '../course/PageNumberArea';
import SearchArea from '../course/SearchArea';
import CourseContext from '../context/CourseContext';
import Loader from '../common/Loader';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { OptionProps } from 'Types/data';

const StyledCoursePage = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const CoursePageContext = createContext([]);

export default function CoursePage() {
  const [option, updateCourses, updateQuery, data, loading] = useContext(CourseContext);
  const location = useLocation();

  useEffect(() => {
    const newOption: OptionProps = {
      title: '',
      offset: 0,
      count: 20,
      price: [],
      grade: [],
      type: []
    };

    if (location.search === '') {
      updateCourses(newOption);
      return;
    }
    const queryObj = queryString.parse(decodeURI(location.search));
    console.log(queryObj);

    for (const key in queryObj) {
      const value = queryObj[key];

      switch (key) {
        case 'title':
          if (typeof value === 'string') {
            newOption.title = value as string;
          }
          break;
        case 'price':
          // const priceList: { [index: string]: string } = {
          //   free: '무료',
          //   paid: '유료',
          //   subscribe: '구독'
          // };
          if (typeof value === 'string') {
            newOption.price = [value];
          } else {
            newOption.price = value;
          }
          break;
        case 'offset':
          if (typeof value === 'string') {
            newOption.offset = Number(value);
          }
      }
    }
    updateCourses(newOption);
  }, []);

  return (
    <StyledCoursePage>
      <Container>
        <SearchArea />
        <FilterArea />
        {loading ? (
          <Loader />
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
