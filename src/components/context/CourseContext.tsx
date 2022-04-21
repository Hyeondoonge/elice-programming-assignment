import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCourse } from '../../api/courseAPI';
import { OptionProps } from 'Types/data';
import { DataProps } from 'Types/data';
import ErrorContext from './ErrorContext';
import { useNavigate } from 'react-router-dom';
import QueryString from 'query-string';

const CourseContext = createContext<
  | [OptionProps, (option: OptionProps) => void, (option: OptionProps) => void, DataProps, boolean]
  | []
>([]);

export function CourseContextProvider({ children }: { children: React.ReactNode }) {
  const [option, setOption] = useState<OptionProps | null>(null);
  const [setError] = useContext(ErrorContext);
  const [data, setData] = useState<DataProps>({ totalCount: 0, courses: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const count = 20;

  const updateCourses = async (options: OptionProps) => {
    try {
      const { title, price, offset } = options;

      const param = {
        filter_conditions: {
          $and: [
            { title: `%${title}%` },
            {
              $or: price?.map(name =>
                name === '무료'
                  ? { enroll_type: 0, is_free: true }
                  : { enroll_type: 0, is_free: false }
              )
            }
          ]
        },
        offset,
        count
      };

      const res = await fetchCourse(param);

      setOption(options);
      setData({
        totalCount: res.course_count,
        courses: res.courses
      });
      setLoading(false);
    } catch (error) {
      setError('course 데이터 업데이트 중 문제가 발생했습니다... ' + error);
    }
  };

  const updateQuery = (option: OptionProps) => {
    const queryString = encodeURI(QueryString.stringify(option));
    navigate(`/?${queryString}`);
    updateCourses(option);
  };

  return (
    <CourseContext.Provider value={[option, updateCourses, updateQuery, data, loading]}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContext;
