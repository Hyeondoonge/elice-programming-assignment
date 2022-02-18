import React from 'react';
import styled from 'styled-components';

interface SearchAreaProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledSearchArea = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
`;

export default function SearchArea({ onChange }: SearchAreaProps) {
  return (
    <div>
      <StyledInput
        type="text"
        placeholder="배우고 싶은 언어, 기술을 선택하세요"
        onChange={onChange}
      />
    </div>
  );
}
