import { UserData } from "@/shared/types";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const types = {
  USER_DATA: "USER_DATA",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

export function useAuthData() {
  const accessToken = getCookie(types.ACCESS_TOKEN) || null;
  const refreshToken = getCookie(types.REFRESH_TOKEN) || null;
  const userData = getCookie(types.USER_DATA) ? (JSON.parse(getCookie(types.USER_DATA) as string) as UserData) : null;

  const setAuthData = (data: string | null, type: keyof typeof types) => {
    if (!data) deleteCookie(type);
    else setCookie(type, data);
  };

  return {
    userData,
    accessToken,
    refreshToken,

    setAuthData,
  };
}
