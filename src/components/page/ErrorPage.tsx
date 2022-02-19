import React from 'react';

interface ErrorPageProps {
  error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        gap: 50
      }}
    >
      <div>
        <h1>{error}</h1>
      </div>
    </div>
  );
}
