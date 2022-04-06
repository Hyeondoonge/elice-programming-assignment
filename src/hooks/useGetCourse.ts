import { useEffect, useState } from 'react';
import { fetchCourse } from '../api/courseAPI';
import { CourseProps, OptionProps } from '../type';
import { DataProps, hookProps } from '../type/data';

export const useGetCourse: hookProps = function (): [
  OptionProps,
  (options: OptionProps) => void,
  DataProps,
  boolean
] {
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
      throw new Error(error);
    }
  };

  useEffect(() => {
    updateCourses(option);
  }, [option]);

  return [option, setOption, data, loading];
};
