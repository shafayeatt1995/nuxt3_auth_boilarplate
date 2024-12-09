export default defineNuxtRouteMiddleware(async (to, from) => {
  const { path } = to;
  const guest = ["/login", "/social-login"];
  const authExactUrls = ["/admin"];
  const authStartsWithRoutes = ["/dashboard"];

  const { userLoggedIn, authUser } = useAuth();
  await userLoggedIn();

  const isExactRoute = authExactUrls.includes(path);
  const isStartsRoute = authStartsWithRoutes.some((route) =>
    path.startsWith(route)
  );
  if (!(isExactRoute || isStartsRoute)) {
    if (guest.includes(path)) {
      if (authUser.value) return navigateTo("/");
    }
  }
  if (isExactRoute || isStartsRoute) {
    if (!authUser.value) return navigateTo("/login");
  }
});
