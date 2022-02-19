import { useEffect, useState } from 'react';
import { fetchCourse } from '../api/courseAPI';
import { CourseProps, OptionProps } from '../type';

type ReturnTypes = [CourseProps[], number, Function];

export default function useGetCourse(): ReturnTypes {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const count = 20;

  const updateCourses = (options: OptionProps) => {
    try {
      (async () => {
        const { title, price, offset } = options;

        if (!title) {
          setTotalCount(0);
          setCourses([]);
          return;
        }

        const param = {
          filter_conditions: {
            $and: [
              { title: `%${title}%` },
              { $or: price?.map(name => (name === '무료' ? { enroll_type: 0, is_free: true } : { enroll_type: 0, is_free: false })) }
            ]
          },
          offset,
          count
        };

        const res = await fetchCourse(param);
        setTotalCount(res.course_count);
        setCourses(
          res.courses.map(({ id, title, short_description, logo_file_url, label, enroll_type, is_free }: CourseProps) => ({
            id,
            title,
            short_description,
            logo_file_url,
            label,
            enroll_type,
            is_free
          }))
        );
      })();
    } catch (error) {
      throw new Error(error);
    }
  };

  return [courses, totalCount, updateCourses];
}
