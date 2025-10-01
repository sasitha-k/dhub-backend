// utils/auth.js (example)
import { cookies } from 'next/headers';

export function getServerAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value || null;
}
