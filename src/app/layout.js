import { Inter } from "next/font/google";
import "./globals.css";
import { PublicEnvScript } from "next-runtime-env";
import Providers from "@/utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DRIVER - HUB",
  description: "Developed by YALU (PVT) LTD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
