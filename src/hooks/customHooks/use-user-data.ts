import { TokenData } from "@/types/user.type";
import { useAuth } from "../storeHooks/use-auth-store";
import { jwtDecode } from "jwt-decode";

export const useUserData = (): TokenData | null => {
  const { token } = useAuth();

  if (!token) return null;

  const decodedToken = jwtDecode(token) as TokenData;

  return decodedToken;
};
