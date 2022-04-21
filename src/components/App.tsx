import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'Types/theme';
import { CourseContextProvider } from './context/CourseContext';
import { ErrorContextProvider } from './context/ErrorContext';
import CoursePage from './page/CoursePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorContextProvider>
          <CourseContextProvider>
            <Routes>
              <Route path="/" element={<CoursePage />} />
            </Routes>
          </CourseContextProvider>
        </ErrorContextProvider>
      </ThemeProvider>
    </Router>
  );
}
