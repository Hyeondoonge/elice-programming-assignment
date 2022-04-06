import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCourse } from '../../api/courseAPI';
import { CourseProps, OptionProps } from '../../type';
import ErrorContext from './ErrorContext';

interface DataProps {
  courses: CourseProps[];
  totalCount: number;
}

const CourseContext = createContext<
  [OptionProps, (option: OptionProps) => void, DataProps, boolean] | []
>([]);

export function CourseContextProvider({ children }: { children: React.ReactNode }) {
  const [setError] = useContext(ErrorContext);
  const [option, setOption] = useState<OptionProps>({ title: '', offset: 0, count: 20, price: [] });
  const [data, setData] = useState<DataProps>({ totalCount: 0, courses: [] });
  const [loading, setLoading] = useState(false);
  const count = 20;

  const updateCourses = async (options: OptionProps) => {
    try {
      setLoading(true);
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
      setData({
        totalCount: res.course_count,
        courses: res.courses
      });
      setLoading(false);
    } catch (error) {
      setError('course 데이터 업데이트 중 문제가 발생했습니다... ' + error);
    }
  };

  useEffect(() => {
    updateCourses(option);
  }, [option]);

  return (
    <CourseContext.Provider value={[option, setOption, data, loading]}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContext;
