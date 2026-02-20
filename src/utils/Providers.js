'use client';

import { CookiesProvider } from "react-cookie";
import { UserProvider } from "@/hooks/userProvider";

export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </CookiesProvider>
  );
}
