import React from 'react';
import styled from 'styled-components';
import List from '../common/List';

const StyledCourseArea = styled.div`
  width: 100%;
`;

interface CardProps {
  data: {
    title: string;
    description: string;
    logo: string;
    label: string;
  };
}

const StyledCard = styled.div``;

const Card = ({ data }: CardProps) => {
  const { title, description, logo, label } = data;

  return (
    <StyledCard>
      <div>{title}</div>
      <div>{description}</div>
      <div>{logo}</div>
      <div>{label}</div>
    </StyledCard>
  );
};

export default function CourseArea() {
  const data = {
    title: 'docker',
    description: '쉬워요',
    logo: '??',
    label: '무료'
  };

  return (
    <StyledCourseArea>
      강좌목록영역
      <List>
        <Card data={data} />
        <Card data={data} />
      </List>
    </StyledCourseArea>
  );
}
