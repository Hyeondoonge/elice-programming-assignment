import React, { useContext } from 'react';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import { CoursePageContext } from '../page/CoursePage';
import useDebounce from '../../hooks/useDebounce';
import CourseContext from '../context/CourseContext';

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

export default function SearchArea() {
  const [option, setOption] = useContext(CourseContext);
  const debounce = useDebounce();

  return (
    <StyledSearchArea>
      <RiSearchLine style={{ margin: '0px 16px' }} />
      <StyledInput
        type="text"
        placeholder="배우고 싶은 언어, 기술을 선택하세요"
        onChange={e => {
          debounce(() => {
            setOption({ ...option, title: e.target.value, offset: 0 });
          }, 300);
        }}
      />
    </StyledSearchArea>
  );
}
