import { CourseListResponse } from '@myTypes/data';

// const fetchCourse: (params: any) => Promise<CourseListResponse> = async (params: any) => {
//   const { filter_conditions, offset, count } = params;

//   // filter_conditions는 인코딩 되어야함.
//   // 데이터에 특수한 기능을하는 문자가 포함되면 encode

//   // decodeURIComponent: encode된 대상들을 decode 해줌 (사람이 읽을 수 있는 주소로 변환)
//   // encode된 URI를 사용해서 특수 문자가 포함된 데이터도 처리할 수 있도록 해야함.

//   // why URL Malformed 에러?
//   // 주소에 % 가 포함되어있는데 이를 통해 얻을 수 있는 문자가 없었기 때문에. (%XX, %uXX...)
//   // 특수문자가 포함될 수 있는, 데이터를 넣는 부분은 encode 했어야함.!!

//   try {
//     const res = await fetch(
//       `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(
//         JSON.stringify(filter_conditions)
//       )}&offset=${offset}&count=${count}`
//     );

//     if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

//     // 200 - 299 응답 코드, 성공적으로 원하는 응답데이터를 받았을 때
//     return res.json(); // Promise<any>
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const fetchCourse: (params: any) => Promise<Response> = async (params: any) => {
  const { filter_conditions, offset, count } = params;
  return fetch(
    `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(
      JSON.stringify(filter_conditions)
    )}&offset=${offset}&count=${count}`
  );
};
export { fetchCourse };
