<template>
  <div class="border-r border-l border-b bg-white events-table-row">
    <div class="py-2 px-3 border-r text-center h-full">{{ item.name }}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{ item.id }}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{ item.id }}</div>
    <div class="py-2 px-3 border-r text-center h-full">
      <svg-icon
        :icon="item.active ? event_active.path : event_inactive.path"
        :viewBox="item.active ? event_active.viewBox : event_inactive.viewBox"
        class="flex justify-center"
        :class="item.active ? 'text-cloudinary-green' : 'text-cloudinary-gray'"
        size="32px"
      />
    </div>
    <c-image
      :public-id="item.logo"
      width="30"
      crop="scale"
      class="m-auto flex items-center"
    />
    <div
      class="border-r text-center uppercase border-l h-full flex items-center justify-center py-2"
    >
      <button
        class="hover:bg-cloudinary-light p-3 mr-3 uppercase rounded text-primary-600"
        @click="edit"
      >
        {{ $t("admin.dashboard.actions.edit") }}
      </button>
      <button
        class="hover:bg-cloudinary-light rounded p-3 uppercase text-red-600"
        @click="deleteIt"
      >
        {{ $t("admin.dashboard.actions.delete") }}
      </button>
    </div>
  </div>
</template>
<script>
import { event_active, event_inactive } from "@/assets/icons";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      event_inactive,
      event_active,
    };
  },
  methods: {
    edit() {
      this.$router.push({
        path: `/admin/${this.$route.params.id}/${this.item.id}`,
      });
    },
    deleteIt() {
      const modal = this.$modal;

      this.$modal.show("dialog", {
        title: "Confirm deletion".toUpperCase(),
        text: `Are you sure you want to delete event ${this.item.name}?`,
        buttons: [
          {
            title: "Cancel".toUpperCase(),
          },
          {
            title: "Confirm".toUpperCase(),
            default: true,
            handler: async () => {
              const response = await this.$axios.$post(
                `/api/event/delete?id=${this.item._id}`
              );
              this.$modal.hide("dialog");

              if (response.event) {
                this.$toast.success(
                  `Event ${this.item.name} has been deleted.`,
                  {
                    duration: 2000,
                  }
                );
                this.$emit("delete_event", this.item.id);
              } else {
                this.$toast.error(response.error, {
                  duration: 2000,
                });
              }
            },
          },
        ],
      });
    },
  },
};
</script>
