export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { userLoggedIn, authUser } = useAuth();
  await userLoggedIn();
  if (authUser.value) {
    return navigateTo("/", { redirectCode: 301 });
  }
});
