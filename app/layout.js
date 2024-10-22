// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
