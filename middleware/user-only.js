export default defineNuxtRouteMiddleware(async (to, from) => {
  const { userLoggedIn, authUser } = useAuth();
  await userLoggedIn();
  if (!authUser.value) {
    return navigateTo("/login", { redirectCode: 301 });
  }
});
