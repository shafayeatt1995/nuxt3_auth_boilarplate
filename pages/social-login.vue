<template>
  <div class="container mx-auto h-screen">
    <div class="flex flex-col justify-center items-center h-full">
      <div ref="loading" class="max-h-80"></div>
      <div class="flex justify-center">
        <p class="text-gray-700">We are checking your information</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem, initLottie, removeItem } from "~/lib/utils";

export default {
  name: "socialLogin",
  head() {
    return { title: `Social login - ${this.$pageTitle}` };
  },
  mounted() {
    initLottie(this.$refs.loading, "/lottie/social-login.json");
    this.getDetails();
  },
  methods: {
    async getDetails() {
      const socialLogin = getItem("socialLogin");
      try {
        const { query } = this.$route;
        const { c, e } = query;
        if (e) {
          if (socialLogin) {
            const { name, query, params } = JSON.parse(socialLogin + "");
            removeItem("socialLogin");
            this.$router.push({ name, query, params });
          } else {
            this.$router.push({ name: "index" });
          }
        } else if (c) {
          const { email, id, provider } = JSON.parse(atob(c));
          const { login } = useAuth();
          const body = {
            email,
            id,
            provider,
            password: "f*#k you",
          };
          await login(body);
          if (socialLogin) {
            const { name, query, params } = JSON.parse(socialLogin + "");
            removeItem("socialLogin");
            this.$router.push({ name, query, params });
          } else {
            this.$router.push({ name: "index" });
          }
        } else {
          this.$router.push({ name: "index" });
        }
      } catch (error) {
        console.error(error);
        const { name, query, params } = JSON.parse(socialLogin + "");
        removeItem("socialLogin");
        if (params) {
          this.$router.push({ name, query, params });
        } else {
          this.$router.push({ name: "index" });
        }
      }
    },
  },
};
</script>
