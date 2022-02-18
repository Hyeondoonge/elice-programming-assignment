import React from 'react';

interface RootProps {
  title: string;
}

export default function Root({ title }: RootProps) {
  return <div>THIS IS {title}</div>;
}
