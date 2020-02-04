<template>
  <section class="flex justify-center items-center">
    <div class="max-w-sm flex flex-col">
      <h1 class="my-3">
        Welcome to CloudyBadge
      </h1>
      <div class="border-b-2 border-dashed w-1/6 self-center mt-3 mb-3" />
      <form @submit.prevent="login" class="mt-5 text-center">
        <div class="flex flex-col text-left">
          <label for="email">Email</label>
          <input name="email" v-model="email" type="text" required class="p-3 border-b mt-2"/>
        </div>
        <div class="flex flex-col text-left mt-4">
          <label for="password">Password</label>
          <input name="password" v-model="password" type="password" required class="p-3 border-b mt-2"/>
        </div>
        <button type="submit" class="button--green m-4">Login</button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login(e) {
      const payload = {
        email: this.email,
        password: this.password,
      };

      const response = await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      });

      if (!response.error) {
        this.$router.push(`/admin/${response.data.id}`);
      } else {
        this.$toast.error('Failed to log in.', {
          duration: 3000
        });
      }
    }
  }
}
</script>