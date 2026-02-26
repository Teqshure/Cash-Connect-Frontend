import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cash Connect",
  description: "Simplifying digital exchange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body
        suppressHydrationWarning
        className="antialiased font-sans  lg:pt-0 no-scrollbar"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
