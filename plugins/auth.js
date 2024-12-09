import { cookieParse } from "~/lib/utils";

export default defineNuxtPlugin(async () => {
  const cookie = useRequestHeaders(["cookie"])?.cookie;
  if (cookie && cookieParse(cookie)?.sessionToken) {
    const { userLoggedIn } = useAuth();
    await userLoggedIn();
  }
});
