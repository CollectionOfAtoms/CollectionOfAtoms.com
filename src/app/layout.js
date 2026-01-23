import '../index.css';
import '../App.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'CollectionOfAtoms',
  description: 'Thoughts, projects, and things still becoming.',
  icons: {
    icon: '/CollectionOfAtoms_logo/Heart_favicon_64.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&family=EB+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="App dark">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
