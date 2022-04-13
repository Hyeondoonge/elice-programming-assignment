export interface OptionProps {
  title: string;
  offset: number;
  count: number;
  price: Array<string>;
  type: Array<string>;
  grade: Array<string>;
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
  courses: CourseProps[];
  course_count: number;
  _result: string;
}

export interface DataProps {
  courses: CourseProps[];
  totalCount: number;
}

export interface hookProps {
  (): [OptionProps, (options: OptionProps) => void, DataProps, boolean];
}

export enum Filter {
  '유형',
  '가격',
  '난이도'
}

export interface FilterOptionProps {
  name: string;
  selected: boolean;
}
