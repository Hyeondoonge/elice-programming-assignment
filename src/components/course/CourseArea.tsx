import React, { useContext } from 'react';
import styled from 'styled-components';
import { RiBarChartLine, RiDashboardFill, RiFeedbackFill } from 'react-icons/ri';
import { CourseProps } from 'Types/data';
import CourseContext from '../context/CourseContext';
import { IconTextProps } from 'Types/component';

const EllipsisWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.6;
`;

const IconText = ({ Icon, text }: IconTextProps) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Icon />
    <span style={{ fontSize: 12, color: '#7d7e80' }}>{text}</span>
  </div>
);

const StyledCard = styled.div`
  width: 260px;
  height: 300px;
  border-radius: 8px;
  padding: 28px 24px;
  background-color: white;
  position: relative;
  display: grid;
  grid-template-rows: 5% 15% 15%;
  row-gap: 30px;
`;

const Card = (course: CourseProps) => {
  const { title, short_description, logo_file_url, enroll_type, is_free } = course;

  const getLabel: any = (enroll_type: number, is_free: Boolean) => {
    if (enroll_type === 4) return '구독';
    if (is_free) return '무료';
    return '유료';
  };

  const label = getLabel(enroll_type, is_free);

  return (
    <StyledCard>
      <div style={{ display: 'flex', alignItems: 'center' }}>{label}</div>
      <EllipsisWrapper>
        <span style={{ fontWeight: 600, color: '#222', fontSize: '16px' }}>{title}</span>
      </EllipsisWrapper>
      <EllipsisWrapper>
        <span style={{ color: '#5e5f61', fontSize: '14px' }}>{short_description}</span>
      </EllipsisWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <IconText Icon={RiBarChartLine} text={'난이도: 미설정'} />
          <IconText Icon={RiDashboardFill} text={'수업 : 온라인'} />
          <IconText Icon={RiFeedbackFill} text={'기간 : 무제한'} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img style={{ objectFit: 'cover' }} width={52} height={52} src={logo_file_url} />
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCourseArea = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  min-height: 300px;
`;

export default function CourseArea() {
  const [option, setOption, data] = useContext(CourseContext);

  return (
    <StyledCourseArea>
      {data.courses.map((course: CourseProps) => (
        <Card key={course.id} {...course} />
      ))}
    </StyledCourseArea>
  );
}
