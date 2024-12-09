<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-white">
    <header class="p-3 mx-auto w-full max-w-4xl">
      <nav class="flex gap-3 text-white justify-between">
        <div class="flex gap-2">
          <NuxtLink to="/" class="underline">Home</NuxtLink>
          <NuxtLink to="/public" class="underline">Public</NuxtLink>
          <NuxtLink to="/private" class="underline">Private</NuxtLink>
          <NuxtLink to="/admin" class="underline">Admin</NuxtLink>
        </div>
        <div>
          <Button @click="login()">Login</Button>
          <Button @click="logout()">Logout</Button>
        </div>
      </nav>
    </header>
    <main class="p-3 mx-auto w-full max-w-4xl">
      <slot />
    </main>
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  computed: {
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
  },
  methods: {
    logout() {
      const { logout } = useAuth();
      logout();
    },
    login() {
      const config = useRuntimeConfig();
      const { API_URL } = config.public;
      window.open(`${API_URL}/auth/social-login/google`, "_self");
    },
  },
};
</script>
