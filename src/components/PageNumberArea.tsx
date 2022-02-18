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
        {new Array(totalPage).fill('').map((_, index) => (
          <StyledBox
            selected={page === index + 1}
            onClick={() => {
              onClickHandler(index + 1);
              setPage(index + 1);
            }}
          >
            {index + 1}
          </StyledBox>
        ))}
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
