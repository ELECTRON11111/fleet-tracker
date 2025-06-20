import "./globals.css";

export const metadata = {
  title: "Fleet Tracker",
  description: "Track your fleet with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
