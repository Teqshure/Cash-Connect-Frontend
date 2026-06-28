import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Preloader from "@/components/ui/Preloader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cash Connect",
    default: "Cash Connect - Secure Financial Platform",
  },
  description: "Simplifying digital exchange and financial freedom",
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
        className="antialiased font-sans pt-14 lg:pt-0 no-scrollbar"
      >
        <Preloader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
