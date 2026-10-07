import './globals.css';

export const metadata = {
  title: 'תיאום שיחה | המרכז למטייל תאילנד',
  description: 'בחירת מועד נוח לשיחה עם נציג המרכז למטייל תאילנד',
};

export default function RootLayout({ children }) {
  return (
      <html lang="he" dir="rtl" translate="no">
        <meta name="google" content="notranslate" />
      <body>{children}</body>
    </html>
  );
}
