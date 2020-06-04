<template>
  <div class="bg-grey-light">
    <div class="flex w-full border-b py-4 items-center bg-white">
      <button
        class="flex items-center uppercase px-4 py-3 hover:bg-grey-light mx-4"
        @click="back"
      >
        Go Back
      </button>
      <div class="text-grey-darkest text-xl px-4 border-l">
        Edit "{{ name }}"
      </div>
    </div>
    <div class="flex pt-8 px-5">
      <button
        class="focus:outline-none bg-grey-lighter m-auto flex-1 -m-0"
        @click.prevent="uploadBadge"
      >
        <cld-image
          :public-id="badge"
          responsive="true"
          crop="scale"
          v-show="badge"
          class="flex justify-center"
        />
        <div v-show="!badge">
          <icon :path="add_photo" color="#bfcbd9" size="50" class="m-4" />
          <div class="text-grey uppercase">Add badge template</div>
        </div>
      </button>
      <form @submit.prevent="save" class="w-2/3 p-5 border bg-white">
        <div class="text-center my-3">
          <button
            class="focus:outline-none bg-grey-lighter rounded-full m-auto"
            @click.prevent="uploadLogo"
          >
            <cld-image
              :public-id="logo"
              width="80"
              height="80"
              crop="scale"
              radius="max"
              v-show="logo"
              class="flex"
            />
            <icon
              :path="add_photo"
              color="#bfcbd9"
              size="50"
              class="m-4"
              v-show="!logo"
            />
          </button>
          <div class="m-4 text-grey-light" v-show="!logo">Event logo</div>
        </div>
        <div class="flex justify-between my-3 items-center">
          <div class="flex flex-col text-left flex-1 mr-6">
            <label for="name">Event Name</label>
            <input
              name="name"
              v-model="name"
              type="text"
              required
              class="p-3 border-b mt-2"
            />
          </div>
          <div class="text-center mt-3">
            <span>Activate?</span>
            <toggle-button :width="50" :height="30" v-model="active" />
          </div>
        </div>
        <div class="flex flex-col text-left my-3">
          <label for="preset">Event Upload Preset</label>
          <input
            name="preset"
            v-model="preset"
            type="text"
            required
            class="p-3 border-b mt-2"
          />
        </div>
        <div class="flex flex-col text-left my-3">
          <label for="eventId" class="mt-3">Event Id</label>
          <input
            name="eventId"
            v-model="id"
            type="text"
            required
            class="p-3 border-b mt-2"
            readonly
            aria-readonly="true"
          />
        </div>
        <div class="flex flex-col text-left my-3">
          <label for="location" class="mt-3">Event Location</label>
          <input
            name="location"
            v-model="location"
            type="text"
            required
            class="p-3 border-b mt-2"
          />
        </div>
        <button type="submit" class="button--green mt-4 mx-auto">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import Icon from "@/components/SvgIcon.vue";
import { add_photo } from "@/assets/icons";

export default {
  components: { Icon },
  async asyncData({ params, $axios }) {
    const event = await $axios.$get(`api/getEvent?id=${params.event_id}`);

    return !event.error ? { ...event } : {};
  },
  data() {
    return {
      name: "",
      eventId: "",
      preset: "",
      logo: "",
      badge: "",
      location: "",
      active: false,
      add_photo,
    };
  },
  methods: {
    async save() {
      if (!this.badge) {
        this.$toast.error("Need to upload badge.", {
          duration: 2000,
        });

        return;
      }

      this.$toast.info("Saving event details...");

      const payload = {
        name: this.name,
        preset: this.preset,
        logo: this.logo,
        badge: this.badge,
        location: this.location,
        active: this.active,
      };

      const response = await this.$axios.post(
        `/api/updateEvent?id=${this.id}`,
        {
          payload,
        }
      );

      console.log(response);

      if (response.error || response.data.error) {
        this.$toast.error(response.data.error || response.error);
      } else {
        this.$toast.success(
          "Event details updated succeeded. Redirecting back to event list",
          {
            duration: 2000,
          }
        );

        this.$router.push({
          path: `/admin/${this.$route.params.id}/`,
        });
      }
    },
    initUploadWidget(responseHandler) {
      return cloudinary.createUploadWidget(
        {
          cloudName: "cdemo",
          uploadPreset: "hackb4xmas",
          folder: `_cloudybadge/resources`,
        },
        responseHandler
      );
    },
    uploadLogo() {
      const uploadPhotoWidget = this.initUploadWidget((error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          this.logo = result.info.public_id;
        }
      });

      uploadPhotoWidget && uploadPhotoWidget.open();
    },
    uploadBadge() {
      const uploadPhotoWidget = this.initUploadWidget((error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          this.badge = result.info.public_id;
        }
      });

      uploadPhotoWidget && uploadPhotoWidget.open();
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
