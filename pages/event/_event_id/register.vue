<template>
  <div>
    <div class="bg-cloudinary text-white text-center font-display">
      <h2 class="py-3 text-2xl">
        {{ $t("register.title") }} {{ $t("title") }}
      </h2>
      <div class="flex items-center justify-center">
        <c-image
          cloudName="cloudinary"
          public-id="logo/for_black_bg/cloudinary_icon_for_black_bg"
          width="60"
          quality="auto"
          fetchFormat="auto"
          crop="scale"
        />
        <div class="flex items-center" v-if="event && event.logo">
          <span class="text-3xl ml-5 mr-5">❤️</span>
          <c-image :public-id="event.logo" width="60" crop="scale" />
        </div>
      </div>
      <h3 class="my-3 text-xl">
        {{ $t("register.heading") }} {{ event.name }}
      </h3>
      <p class="text-sm mb-5">
        {{ $t("register.description") }}
      </p>
    </div>
    <div
      v-if="event"
      class="flex flex-col flex-1 items-center justify-center font-display relative"
    >
      <form @submit.prevent="register" class="mt-5 w-5/6 overflow-auto">
        <Input
          :label="$t('register.form.firstName')"
          name="fname"
          :value="fname"
          @input="fname = $event"
          required
        />
        <Input
          :label="$t('register.form.lastName')"
          name="lname"
          :value="lname"
          @input="lname = $event"
          required
          class="mt-3"
        />
        <Input
          :label="$t('register.form.company')"
          name="company"
          :value="company"
          @input="company = $event"
          required
          class="mt-3"
        />
        <Input
          :label="$t('register.form.title')"
          name="title"
          :value="title"
          @input="title = $event"
          required
          class="mt-3"
        />
        <Input
          :label="$t('register.form.email')"
          name="email"
          type="email"
          :value="email"
          @input="email = $event"
          required
          class="mt-3"
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          :title="$t('register.validation.errorEmail')"
        />
        <button
          type="submit"
          :disabled="disabled"
          class="text-white px-5 py-3 rounded block mx-auto mt-8 mb-4 font-semibold"
          :class="disableClass"
        >
          {{ $t("register.actions.register") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";

export default {
  async asyncData({ params, query, $axios }) {
    const { event } = await $axios.$post(
      `api/event/load?id=${params.event_id}`,
      {}
    );

    return !event.error ? { event } : {};
  },
  head() {
    const content = this.event ? `to ${this.event.name}` : " per conference";

    return {
      title: `Register ${content}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Register ${content}`,
        },
      ],
    };
  },
  data() {
    return {
      fname: "",
      lname: "",
      company: "",
      title: "",
      email: "",
      event: null,
    };
  },
  computed: {
    disabled() {
      return (
        !this.fname ||
        !this.lname ||
        !this.company ||
        !this.title ||
        !this.email ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) ||
        this.emailExisted
      );
    },
    disableClass() {
      return this.disabled ? "bg-gray-300" : "bg-cloudinary-green";
    },
    emailExisted() {
      return (
        this.event?.attendants?.find(
          (attendant) => attendant.email === this.email
        ) || false
      );
    },
  },
  methods: {
    async register(e) {
      this.$toast.info(this.$t("register.status.registering"));

      const payload = {
        firstName: this.fname,
        lastName: this.lname,
        company: this.company,
        title: this.title,
        email: this.email,
        eventId: this.event._id,
        eventName: this.event.name,
      };

      const response = await this.$axios.$post(`/api/badge/create`, {
        payload,
      });

      if (response.error) {
        const text = response.error || this.$t("register.status.error");
        this.$toast.error(text);
      } else {
        const text = this.$t("register.status.success");
        this.$toast.success(text);

        this.$router.push({
          path: `/event/${this.event.id}/badge/${response.badge.editKey}`,
        });
      }
    },
  },
};
</script>
