import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCourse } from '../../api/courseAPI';
import { CourseListResponse, OptionProps } from '@myTypes/data';
import { DataProps } from '@myTypes/data';
import ErrorContext from './ErrorContext';
import { useNavigate } from 'react-router-dom';
import QueryString from 'query-string';
import { CourseQuery } from '../query/CourseQuery';
import { RiRestaurantLine } from 'react-icons/ri';

const CourseContext = createContext<
  | [
      OptionProps,
      (option: OptionProps) => void,
      (option: OptionProps) => void,
      CourseListResponse,
      boolean,
      boolean
    ]
  | []
>([]);

export function CourseContextProvider({ children }: { children: React.ReactNode }) {
  const [option, setOption] = useState<OptionProps | null>(null);
  const [setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  // isFetching 상태는 어떻게 써먹을까?
  const { isLoading, isFetching, error, data: myData } = CourseQuery(option);
  console.log('끙차 끙차 🤯');
  console.log(myData);
  console.log(error);

  const updateCourses = (option: OptionProps) => {
    setOption(option);
  };
  // const updateCourses = async (options: OptionProps) => {
  //   try {
  //     const { title, price, offset } = options;
  //     const param = {
  //       filter_conditions: {
  //         $and: [
  //           { title: `%${title}%` },
  //           {
  //             $or: price?.map(name =>
  //               name === '무료'
  //                 ? { enroll_type: 0, is_free: true }
  //                 : { enroll_type: 0, is_free: false }
  //             )
  //           }
  //         ]
  //       },
  //       offset,
  //       count: 20
  //     };
  //     const res = await fetchCourse(param);
  //     setOption(options);
  //     // setData({
  //     //   totalCount: res.course_count,
  //     //   courses: res.courses
  //     // });
  //     setLoading(false);
  //   } catch (error) {
  //     setError('course 데이터 업데이트 중 문제가 발생했습니다... ' + error);
  //   }
  // };

  const updateQuery = (option: OptionProps) => {
    const queryString = encodeURI(QueryString.stringify(option));
    navigate(`/?${queryString}`);
    updateCourses(option);
  };

  useEffect(() => {
    // 설계없이 때려 놓은 코드 ...👉👈
    if (!error) return;
    setError(error.message);
  }, [error]);

  return (
    <CourseContext.Provider
      value={[option, updateCourses, updateQuery, myData, isLoading, isFetching]}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContext;
