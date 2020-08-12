<template>
  <div class="bg-grey-light">
    <div class="flex w-full border-b py-4 items-center bg-white">
      <button
        class="flex items-center uppercase p-3 hover:text-cloudinary-darkest text-cloudinary-gray mx-4"
        @click="goBack"
      >
        <svg-icon :icon="back.path" :viewBox="back.viewBox" size="28px" />
      </button>
      <div class="text-cloudinary-gray text-xl md:text-2xl">
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
          <svg-icon :path="add_photo" color="#bfcbd9" size="50" class="m-4" />
          <div class="text-grey uppercase">
            {{ $t("admin.newEvent.actions.addBadge") }}
          </div>
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
            <svg-icon
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
          <Input
            :label="$t('admin.newEvent.fields.name')"
            name="name"
            :value="newName"
            @input="newName = $event"
            required
            class="flex flex-col text-left flex-1 mr-6"
          />
          <div class="text-center mb-3 self-end">
            <span>{{ $t("admin.newEvent.fields.activate") }}</span>
            <toggle-button
              :width="50"
              :height="30"
              v-model="active"
              color="#48bb78"
            />
          </div>
        </div>
        <Input
          :label="$t('admin.newEvent.fields.preset')"
          name="preset"
          :value="preset"
          @input="preset = $event"
          required
          class="my-4"
        />
        <Input
          :label="$t('admin.newEvent.fields.location')"
          name="location"
          :value="location"
          @input="location = $event"
          required
          class="my-4"
        />
        <button
          type="submit"
          :disabled="disabled"
          class="text-white px-5 py-3 rounded block my-8 font-semibold"
          :class="disableClass"
        >
          {{ $t("admin.newEvent.actions.save") }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { add_photo, back } from "@/assets/icons";

export default {
  async asyncData({ params, $axios }) {
    const event = await $axios.$get(`api/event/load?id=${params.event_id}`);

    return !event.error ? { ...event, newName: event.name } : {};
  },
  data() {
    return {
      newName: "",
      id: "",
      preset: "",
      logo: "",
      badge: "",
      location: "",
      active: false,
      add_photo,
      back,
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
        name: this.newName,
        preset: this.preset,
        logo: this.logo,
        badge: this.badge,
        location: this.location,
        active: this.active,
        duration: this.duration,
        _id: this._id,
        id: this.id,
      };

      const response = await this.$axios.post(`/api/event/update`, {
        payload,
      });

      if (response.error) {
        this.$toast.error(response.error);
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
          this.logo = result.info.public_id;
        }
      });

      uploadPhotoWidget && uploadPhotoWidget.open();
    },
    uploadBadge() {
      const uploadPhotoWidget = this.initUploadWidget((error, result) => {
        if (!error && result && result.event === "success") {
          this.badge = result.info.public_id;
        }
      });

      uploadPhotoWidget && uploadPhotoWidget.open();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    disabled() {
      return (
        !this.newName ||
        !this.preset ||
        !this.id ||
        !this.location ||
        !this.logo ||
        !this.badge
      );
    },
    disableClass() {
      return this.disabled ? "bg-gray-300" : "bg-cloudinary-green";
    },
  },
};
</script>
