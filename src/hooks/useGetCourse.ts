import { useEffect, useState } from 'react';
import { fetchCourse } from '../api/courseAPI';
import { CourseProps, OptionProps } from '../type';

interface DataProps {
  courses: CourseProps[];
  totalCount: number;
}

interface hookProps {
  (): [DataProps, (options: OptionProps) => void, boolean];
}

export const useGetCourse: hookProps = function (): [
  DataProps,
  (options: OptionProps) => void,
  boolean
] {
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
        courses: res.courses.map(
          ({
            id,
            title,
            short_description,
            logo_file_url,
            label,
            enroll_type,
            is_free
          }: CourseProps) => ({
            id,
            title,
            short_description,
            logo_file_url,
            label,
            enroll_type,
            is_free
          })
        )
      });
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return [data, updateCourses, loading];
};
