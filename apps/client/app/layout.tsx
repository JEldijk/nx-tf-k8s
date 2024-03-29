import Head from 'next/head';
import './global.css';

export const metadata = {
  title: 'Nx Next App',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}
