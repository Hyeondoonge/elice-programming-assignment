import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ThemeContext } from 'styled-components';

export default function Loader() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TailSpin color={theme.util.secondary} width={80} height={80} />
    </div>
  );
}
