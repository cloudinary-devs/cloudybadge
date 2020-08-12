<template>
  <div class="bg-grey-light">
    <div class="flex w-full py-4 md:my-4 items-center justify-center bg-white">
      <h2 class="text-primary-800 text-xl md:text-3xl mx-4">
        {{ $t("admin.newEvent.heading") }}
      </h2>
    </div>
    <div class="flex px-5">
      <button
        class="focus:outline-none bg-grey-lighter flex-1 -m-0 h-100 border border-r-0"
        @click.prevent="uploadBadge"
      >
        <c-image
          :public-id="badge"
          responsive="true"
          crop="scale"
          v-show="badge"
          class="flex justify-center mx-4"
        />
        <div v-show="!badge">
          <svg-icon
            :icon="add_photo.path"
            :viewBox="add_photo.viewBox"
            size="50px"
            class="my-4 mx-auto text-white p-4 rounded-full bg-gray-400 w-fit m-auto"
          />
          <div class="text-gray-700 uppercase">
            {{ $t("admin.newEvent.actions.addBadge") }}
          </div>
        </div>
      </button>
      <form @submit.prevent="create" class="w-2/3 p-5 border bg-white">
        <div class="text-center my-5">
          <button
            class="focus:outline-none bg-grey-lighter rounded-full m-auto"
            @click.prevent="uploadLogo"
          >
            <c-image
              :public-id="logo"
              width="80"
              height="80"
              crop="scale"
              radius="max"
              v-show="logo"
              class="flex"
            />
            <svg-icon
              :icon="add_photo.path"
              :viewBox="add_photo.viewBox"
              size="50px"
              class="text-white p-4 rounded-full bg-gray-400"
              v-show="!logo"
            />
          </button>
          <div class="m-4 text-gray-700" v-show="!logo">
            {{ $t("admin.newEvent.fields.logo") }}
          </div>
        </div>
        <div class="flex justify-between my-3 items-center">
          <Input
            :label="$t('admin.newEvent.fields.name')"
            name="name"
            :value="name"
            @input="name = $event"
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
          :label="$t('admin.newEvent.fields.id')"
          name="eventId"
          :value="id"
          @input="id = $event"
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
          {{ $t("admin.newEvent.actions.create") }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { add_photo } from "@/assets/icons";
import Input from "@/components/Input";

export default {
  data() {
    return {
      name: "",
      id: "",
      preset: "",
      logo: "",
      badge: "",
      location: "",
      active: false,
      add_photo,
    };
  },
  methods: {
    async create() {
      if (!this.badge) {
        this.$toast.error(this.$t("admin.newEvent.status.noBadges"), {
          duration: 2000,
        });

        return;
      }

      this.$toast.info(this.$t("admin.newEvent.status.creating"));

      const payload = {
        name: this.name,
        id: this.id,
        preset: this.preset,
        logo: this.logo,
        badge: this.badge,
        location: this.location,
        active: this.active,
      };

      const response = await this.$axios.post(`/api/event/create`, {
        payload,
      });

      if (response.error) {
        this.$toast.error(response.error);
      } else {
        this.$toast.success(
          "Event created succeeded. Redirecting back to event list",
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
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    disabled() {
      return (
        !this.name ||
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
