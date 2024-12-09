import { cookieParse, removeCookie, setCookie } from "~/lib/utils";

export const useAuth = () => {
  const { api } = useApi();
  const authUser = useAuthUser();
  const setUser = (user) => {
    authUser.value = user;
  };
  const login = async (user) => {
    try {
      const data = await api.post("/auth/login", user);
      setUser(data.user);
      setCookie("sessionToken", data.token, { expires: 7 });
      return data;
    } catch (err) {
      return null;
    }
  };
  const userLoggedIn = async () => {
    try {
      if (!authUser.value) {
        let cookie = null;
        if (typeof window !== "undefined") {
          cookie = document?.cookie || null;
        } else {
          cookie = useRequestHeaders(["cookie"])?.cookie || null;
        }
        if (cookie && cookieParse(cookie)?.sessionToken) {
          const data = await api.get("/auth/user");
          setUser(data.user);
        }
      }
      return authUser;
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    removeCookie("sessionToken");
    setUser(null);
    return null;
  };
  return {
    login,
    userLoggedIn,
    logout,
    authUser,
  };
};
