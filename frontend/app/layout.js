import "./globals.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
