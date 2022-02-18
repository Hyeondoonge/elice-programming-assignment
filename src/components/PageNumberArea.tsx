import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import List from '../common/List';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';

interface PageNumberAreaProps {
  totalPage: number;
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

export default function PageNumberArea({ totalPage, onClickHandler }: PageNumberAreaProps) {
  const [page, setPage] = useState(1);

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
            onClickHandler(page - 1);
            setPage(page - 1);
          }}
        >
          <RiArrowLeftSFill />
        </StyledNav>
        {new Array(page - startPage + 1).fill('').map((_, index) => {
          const pageIndex = startPage + index;
          return (
            <StyledBox
              selected={page === pageIndex}
              onClick={() => {
                onClickHandler(pageIndex);
                setPage(pageIndex);
              }}
            >
              {pageIndex}
            </StyledBox>
          );
        })}
        {new Array(endPage - page).fill('').map((_, index) => {
          const pageIndex = page + index + 1;
          return (
            <StyledBox
              selected={page === pageIndex}
              onClick={() => {
                onClickHandler(pageIndex);
                setPage(pageIndex);
              }}
            >
              {pageIndex}
            </StyledBox>
          );
        })}
        <StyledNav
          disabled={page === totalPage}
          onClick={() => {
            onClickHandler(page + 1);
            setPage(page + 1);
          }}
        >
          <RiArrowRightSFill />
        </StyledNav>
      </List>
    </div>
  );
}
