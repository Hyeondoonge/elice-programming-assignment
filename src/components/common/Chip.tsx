import React from 'react';
import styled from 'styled-components';
import { ChipProps } from 'Types/component';

// { selected: boolean } => chipprops 속성 타입 변경 시 함께 변경되어야함.
// Pick<ChipProps, 'selected'>> => 조금 길긴 하지만, 타입을 한개만 사용할 수 있고, 사용할 속성을 명시적으로 지정해야된다는 점은 위의 방법과 동일, 타입을 ChipProps의 속성이랑 공유할 수 있다는 점
// Omit<ChipProps, 'label'>> 이런 방법도 있지만 위의 방법이 코드 읽기가 더 쉬움. 스타일링에 사용해야할 속성을 명시함으로

const StyledChip = styled.div<Pick<ChipProps, 'selected'>>`
  cursor: pointer;
  background-color: ${props => (props.selected ? '#af97b4' : '#E8E8E8')};
  color: ${props => (props.selected ? 'white' : 'black')};
  border-radius: 40px;
  padding: 5px;
  transition: 0.3s;
`;

export default function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <StyledChip selected={selected} onClick={onClick}>
      {label}
    </StyledChip>
  );
}
