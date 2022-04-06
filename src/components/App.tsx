import React from 'react';
import { CourseContextProvider } from './context/CourseContext';
import { ErrorContextProvider } from './context/ErrorContext';
import CoursePage from './page/CoursePage';

export default function App() {
  return (
    <ErrorContextProvider>
      <CourseContextProvider>
        <CoursePage />
      </CourseContextProvider>
    </ErrorContextProvider>
  );
}
