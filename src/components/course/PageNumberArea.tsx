import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import List from '../common/List';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { CoursePageContext } from '../page/CoursePage';
import CourseContext from '../context/CourseContext';

interface PageNumberAreaProps {
  totalCount: number;
  offset: number;
  onClickHandler: (page: number) => void;
}

interface PageNumberProps {
  onClick: (page: number) => void;
  selected: boolean;
}

const StyledBox = styled.div<PageNumberProps>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ selected }) =>
    selected
      ? css`
          background-color: #524fa1;
          color: white;
        `
      : `
  color: #999;`};
`;

const StyledNav = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default function PageNumberArea() {
  const [option, setOption, data] = useContext(CourseContext);
  const { offset } = option;
  const { totalCount } = data;
  const page = offset / 20 + 1;
  const totalPage = Math.ceil(totalCount / 20);

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
            setOption({ ...option, offset: (page - 2) * 20 });
          }}
        >
          <RiArrowLeftSFill />
        </StyledNav>
        {new Array(endPage - startPage + 1).fill('').map((_, index) => {
          const pageIndex = startPage + index;
          return (
            <StyledBox
              key={index}
              selected={page === pageIndex}
              onClick={() => {
                setOption({ ...option, offset: (pageIndex - 1) * 20 });
              }}
            >
              {pageIndex}
            </StyledBox>
          );
        })}
        <StyledNav
          disabled={page === totalPage}
          onClick={() => {
            setOption({ ...option, offset: page * 20 });
          }}
        >
          <RiArrowRightSFill />
        </StyledNav>
      </List>
    </div>
  );
}
