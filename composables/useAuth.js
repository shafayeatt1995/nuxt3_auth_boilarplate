import { removeCookie, setCookie } from "~/lib/utils";

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
        const data = await api.get("/auth/user");
        setUser(data.user);
        return data;
      }
    } catch (error) {}
  };
  const logout = async () => {
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
