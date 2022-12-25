'use client';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
