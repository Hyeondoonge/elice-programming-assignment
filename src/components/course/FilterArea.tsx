import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterProps } from '@myTypes/component';
import Chip from '../common/Chip';
import List from '../common/List';
import CourseContext from '../context/CourseContext';
import { FilterOptionProps, OptionProps } from '@myTypes/data';

const StyledFilterArea = styled.div`
  border: 1px solid #d8d8d8;
  width: 100%;

  & > :not(:last-child) {
    border-bottom: 1px solid #d8d8d8;
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  gap: 1rem;
`;

const StyledType = styled.div`
  background-color: #f4f4f4;
  padding: 1rem;
  width: 7%;
`;

const mock_type: string[] = ['유형', '가격', '난이도'];
const mock_type_attribute: string[] = ['type', 'price', 'grade'];
const mock_filter: string[][] = [
  ['과목', '챌린지', '테스트'],
  ['무료', '유료', '구독'],
  ['입문', '초급', '중급', '고급']
];

export default function FilterArea() {
  const [option, updateCourses, updateQuery, data] = useContext(CourseContext);
  const [filter, setFilter] = useState<FilterOptionProps[][]>(
    mock_filter.map(e => e.map(e => ({ name: e, selected: false })))
  );

  const onClickChip = (type_index: number, filter_index: number) => {
    const newFilter = filter.map(r => r.map(f => f));
    newFilter[type_index][filter_index].selected = !newFilter[type_index][filter_index].selected;
    setFilter(newFilter);

    const newOption: OptionProps = { ...option, offset: 0 };

    const typeAttr = mock_type_attribute[type_index] as keyof OptionProps;
    newOption[typeAttr] = newFilter[type_index]
      .filter(({ selected }) => selected)
      .map(({ name }) => name);
    updateQuery(newOption);
  };

  useEffect(() => {
    const newFilter = filter.map(r => r.map(f => f));
    newFilter[1] = newFilter[1].map(({ name }) => ({
      name,
      selected: option?.price.includes(name) ?? false
    }));
    setFilter(newFilter);
  }, [option]);

  return (
    <StyledFilterArea>
      {mock_type.map((type, type_index) => (
        <StyledRow key={type_index}>
          <StyledType>{type}</StyledType>
          <List>
            {filter[type_index].map(({ name, selected }, filter_index) => (
              <Chip
                key={filter_index}
                label={name}
                selected={selected}
                onClick={() => {
                  onClickChip(type_index, filter_index);
                }}
              />
            ))}
          </List>
        </StyledRow>
      ))}
    </StyledFilterArea>
  );
}
