// /lib/api/authorized.js

import authInstance from './authInstance';

export const getUserProfile = async () => {
  const res = await authInstance.get('/user/profile');
  return res.data;
};
