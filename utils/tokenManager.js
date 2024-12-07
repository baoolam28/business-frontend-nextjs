// utils/tokenManager.js
import { getSession } from "next-auth/react";

export const getToken = async () => {
  const session = await getSession();
  return session?.user?.accessToken; // Return the access token if it exists
};
