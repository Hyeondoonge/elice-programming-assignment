import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@myTypes/theme';
import { CourseContextProvider } from './context/CourseContext';
import { ErrorContextProvider } from './context/ErrorContext';
import CoursePage from './page/CoursePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ErrorContextProvider>
            <CourseContextProvider>
              <Routes>
                <Route path="/" element={<CoursePage />} />
              </Routes>
              <ReactQueryDevtools />
            </CourseContextProvider>
          </ErrorContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}
