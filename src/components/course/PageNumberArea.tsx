import React, { useContext } from 'react';
import styled from 'styled-components';
import List from '../common/List';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import CourseContext from '../context/CourseContext';
import { OptionProps } from '@myTypes/data';

const StyledPageNumber = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) => (selected ? theme.bg.main : 'transparent')};
  color: ${({ selected }) => (selected ? 'white' : '#999')};
`;

const StyledNav = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default function PageNumberArea() {
  const [option, updateCourses, updateQuery, data] = useContext(CourseContext);
  const { offset } = option;
  const { course_count } = data;
  const page = offset / 20 + 1;
  const totalPage = Math.ceil(course_count / 20);

  const getStartPage = (page: number) => {
    if (page - 4 > 0) {
      return page - 4;
    } else return 1;
  };

  const getEndPage = (page: number) => {
    if (page + 4 < totalPage) {
      return page + 4;
    } else return totalPage;
  };

  const startPage = getStartPage(page);
  const endPage = getEndPage(page);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <List>
        <StyledNav
          disabled={page === 1}
          onClick={() => {
            updateQuery({ ...option, offset: (page - 2) * 20 });
          }}
        >
          <RiArrowLeftSFill />
        </StyledNav>
        {new Array(endPage - startPage + 1).fill('').map((_, index) => {
          const pageIndex = startPage + index;
          return (
            <StyledPageNumber
              key={index}
              selected={page === pageIndex}
              onClick={() => {
                updateQuery({ ...option, offset: (pageIndex - 1) * 20 });
              }}
            >
              {pageIndex}
            </StyledPageNumber>
          );
        })}
        <StyledNav
          disabled={page === totalPage}
          onClick={() => {
            updateQuery({ ...option, offset: page * 20 });
          }}
        >
          <RiArrowRightSFill />
        </StyledNav>
      </List>
    </div>
  );
}
