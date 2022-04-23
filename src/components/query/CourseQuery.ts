import { useQuery } from 'react-query';
import { fetchCourse } from '@api/courseAPI';
import { CourseListResponse, DataProps, OptionProps } from '@myTypes/data';

const COURSECOUNT_PER_PAGE = 20;

// CourseListResponse의 속성 그대로 사용하자.

export function CourseQuery(option: OptionProps) {
  return useQuery<CourseListResponse, Error>(
    ['option', option],
    async () => {
      const { title, price, offset } = option;

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
        count: COURSECOUNT_PER_PAGE
      };

      const response = await fetchCourse(param);
      if (!response.ok) throw new Error('an error occured...' + response.status);
      return response.json(); // courseListResponse
    },
    {
      enabled: !!option,
      initialData: {
        course_count: 0,
        courses: [],
        _result: 'no option'
      }
    }
  );
}
