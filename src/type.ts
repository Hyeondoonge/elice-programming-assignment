export interface OptionProps {
  title: string;
  offset: number;
  count: number;
  price: Array<string>;
}

export interface CourseProps {
  id: number;
  title: string;
  short_description: string;
  logo_file_url: string;
  label: string;
  enroll_type: number;
  is_free: boolean;
}

export interface CoursesProps {
  courses: CourseProps[];
}

export interface CourseListResponse {
  courses: object[];
  course_count: number;
  _result: string;
}
