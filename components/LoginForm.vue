<template>
  <form class="space-x-5 text-black" @submit.prevent="handleLogin">
    <input
      v-model="form.email"
      type="text"
      placeholder="username"
      class="p-1.5 rounded-md shadow-xl"
    />
    <input
      v-model="form.password"
      type="password"
      placeholder="password"
      class="p-1.5 rounded-md shadow-xl"
    />
    <Button type="submit" variant="destructive"> Login </Button>
  </form>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        email: "admin@gmail.com",
        password: "password",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
