<template>
  <div class="font-display">
    <div class="bg-cloudinary py-5 flex flex-col items-center">
      <div class="flex items-center justify-center">
        <c-image
          cloudName="cloudinary"
          public-id="logo/for_black_bg/cloudinary_icon_for_black_bg"
          width="80"
          quality="auto"
          fetchFormat="auto"
          crop="scale"
        />
        <h1
          class="mx-3 font-display self-end text-cloudinary-light text-title leading-title"
        >
          {{ $t("title") }}
        </h1>
      </div>
    </div>
    <div class="flex flex-col flex-1 justify-center">
      <h2 class="text-2xl mx-auto my-5">{{ $t("admin.login.heading") }}</h2>
      <div class="flex justify-center">
        <form
          @submit.prevent="login"
          class="mt-5 mx-8 text-center max-w-2xl flex-1"
        >
          <Input
            :label="$t('admin.login.form.email')"
            name="email"
            :value="email"
            @input="email = $event"
            required
          />
          <Input
            :label="$t('admin.login.form.password')"
            name="password"
            :value="password"
            @input="password = $event"
            required
          />

          <button
            type="submit"
            :disabled="disabled"
            class="text-white px-5 py-3 rounded block mx-auto mt-8 mb-4 font-semibold"
            :class="disableClass"
          >
            {{ $t("admin.login.actions.login") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    disabled() {
      return !this.email || !this.password;
    },
    disableClass() {
      return this.disabled ? "bg-gray-300" : "bg-cloudinary-green";
    },
  },
  methods: {
    async login(e) {
      const payload = {
        email: this.email,
        password: this.password,
      };

      // const response = await this.$auth.loginWith('local', {
      //   data: {
      //     email: this.email,
      //     password: this.password
      //   }
      // });

      // if (!response.error) {
      //   this.$router.push(`/admin/${response.data.id}`);
      // } else {
      //   this.$toast.error('Failed to log in.', {
      //     duration: 3000
      //   });
      // }
    },
  },
};
</script>
