<template>
  <div class="border-r border-l border-b bg-white events-table-row">
    <div class="py-2 px-3 border-r text-center h-full">{{ item.name }}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{ item.id }}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{ item.id }}</div>
    <div class="py-2 px-3 border-r text-center h-full">
      <icon
        :path="item.active ? event_active : event_inactive"
        :color="item.active ? 'green' : 'red'"
        size="24"
      />
    </div>
    <cld-image
      :public-id="item.logo"
      width="30"
      crop="scale"
      class="m-auto flex items-center"
    />
    <div
      class="border-r text-center uppercase border-l h-full flex items-center justify-center py-2"
    >
      <button class="hover:bg-grey-light p-3 mr-3 uppercase" @click="edit">
        Edit
      </button>
      <button class="hover:bg-grey-light p-3 uppercase" @click="deleteIt">
        Delete
      </button>
    </div>
  </div>
</template>
<script>
import { event_active, event_inactive } from "@/assets/icons";
import Icon from "@/components/SvgIcon.vue";

export default {
  components: { Icon },
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
      console.log("delete");
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
                `/api/deleteEvent?id=${this.item.id}`
              );
              this.$modal.hide("dialog");

              if (response.success) {
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
