// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import MainLayout from '../layouts/layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default MyApp;
