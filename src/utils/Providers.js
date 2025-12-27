'use client';

import { CookiesProvider } from "react-cookie";
import { UserProvider } from "@/hooks/userProvider";
import ThemeToggle from "@/app/ThemeToggle";

export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <UserProvider>
        <ThemeToggle/>
        {children}
      </UserProvider>
    </CookiesProvider>
  );
}
