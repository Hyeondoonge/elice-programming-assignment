import React, { createContext, useState } from 'react';
import ErrorPage from '../page/ErrorPage';

const ErrorContext = createContext<[(error: string) => void] | []>([]);

export function ErrorContextProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={[setError]}>
      {error ? <ErrorPage error={error} /> : children}
    </ErrorContext.Provider>
  );
}

export default ErrorContext;
