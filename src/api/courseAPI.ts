import { CourseListResponse } from '../components/type';

const fetchCourse: (params: any) => Promise<CourseListResponse> = async (params: any) => {
  const { filter_conditions, offset, count } = params;
  console.log(filter_conditions);

  try {
    const res = await fetch(
      `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${JSON.stringify(filter_conditions)}&offset=${offset}&count=${count}`
    );
    // if (res.status !== 200) return {};
    return res.json();
  } catch (error) {
    throw new Error('ERROR OCCUR');
  }
};

export { fetchCourse };
