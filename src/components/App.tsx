import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'Types/theme';
import { CourseContextProvider } from './context/CourseContext';
import { ErrorContextProvider } from './context/ErrorContext';
import CoursePage from './page/CoursePage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorContextProvider>
        <CourseContextProvider>
          <CoursePage />
        </CourseContextProvider>
      </ErrorContextProvider>
    </ThemeProvider>
  );
}
