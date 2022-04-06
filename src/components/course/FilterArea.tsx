import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FilterProps } from '../../type/component';
import Chip from '../common/Chip';
import List from '../common/List';
import CourseContext from '../context/CourseContext';

const StyledFilterArea = styled.div`
  width: 100%;
`;

const typeList = ['가격'];

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d8d8d8;
  background-color: white;
`;

const StyledType = styled.div`
  background-color: #e8e8e8;
  border: 1px solid #d8d8d8;
  padding: 11px;
  width: 10%;
`;

type Filter = '가격';

export default function FilterArea() {
  const [option, setOption, data] = useContext(CourseContext);
  const [filterList, setFilterList] = useState({
    가격: [
      { name: '무료', selected: false },
      { name: '유료', selected: false }
    ]
  });

  return (
    <StyledFilterArea>
      {typeList.map((type: Filter, index) => (
        <StyledRow key={index}>
          <StyledType>{type}</StyledType>
          <div
            style={{
              width: '100%'
            }}
          >
            <List>
              {filterList[type].map(({ name, selected }: FilterProps, index: number) => (
                <div key={index} style={{ margin: '5px' }}>
                  <Chip
                    label={name}
                    selected={selected}
                    onClick={() => {
                      const newFilterList = { ...filterList };
                      newFilterList[type][index].selected = !newFilterList[type][index].selected;
                      // update 아이템 클릭 상태
                      // i, j를 전달해서 상태값 업데이트 진행 및 fetch 수행
                      setFilterList(newFilterList);
                      setOption({
                        ...option,
                        offset: 0,
                        price: newFilterList[type]
                          .filter(({ selected }) => selected)
                          .map(({ name }) => name)
                      });
                    }}
                  />
                </div>
              ))}
            </List>
          </div>
        </StyledRow>
      ))}
    </StyledFilterArea>
  );
}
