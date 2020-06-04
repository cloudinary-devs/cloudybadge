<template>
  <div>
    <div class="bg-cloudinary text-white text-center font-display">
      <h2 class="py-3 text-2xl">
        {{ $t("register.title") }} {{ $t("title") }}
      </h2>
      <div class="flex items-center justify-center">
        <cld-image
          cloudName="cloudinary"
          public-id="logo/for_black_bg/cloudinary_icon_for_black_bg"
          width="60"
          quality="auto"
          fetchFormat="auto"
          crop="scale"
        />
        <div class="flex items-center" v-if="event && event.logo">
          <span class="text-3xl ml-5 mr-5">❤️</span>
          <cld-image :public-id="event.logo" width="60" crop="scale" />
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
          Register me!
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";
import axios from "axios";

export default {
  async asyncData({ params, query, $axios }) {
    const event = await $axios.$get(`api/getEvent?id=${params.event_id}`);

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
  components: { Input },
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
      // return this.$page.Fauna.Badges.data.find(
      //   (badge) => badge.email === this.email
      // )
      return false;
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
        eventId: this.event.id,
        eventName: this.event.name,
      };

      const response = await axios.post(`/api/insert`, {
        payload,
      });

      if (response.error || response.data.error) {
        const text =
          response.data.error ||
          response.error ||
          this.$t("register.status.error");
        this.$toast.error(text);
      } else {
        const text = this.$t("register.status.success");
        this.$toast.success(text);

        this.$router.push({
          path: `/event/${this.event.id}/badge/${response.data.editKey}`,
        });
      }
    },
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
