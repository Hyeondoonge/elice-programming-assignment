import React from 'react';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';

interface SearchAreaProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledSearchArea = styled.div`
  width: 100%;
  border: 1px solid rgb(201, 202, 204);
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: white;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 12px 0px;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholer {
    color: grey;
  }
`;

export default function SearchArea({ onChange }: SearchAreaProps) {
  return (
    <StyledSearchArea>
      <RiSearchLine style={{ margin: '0px 16px' }} />
      <StyledInput type="text" placeholder="배우고 싶은 언어, 기술을 선택하세요" onChange={onChange} />
    </StyledSearchArea>
  );
}
