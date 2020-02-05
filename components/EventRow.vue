<template>
  <div class="border-r border-l border-b bg-white events-table-row">
    <div class="py-2 px-3 border-r text-center h-full">{{item.name}}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{item.id}}</div>
    <div class="py-2 px-3 border-r text-center h-full">{{item.id}}</div>
    <div class="py-2 px-3 border-r text-center h-full">
      <icon :path="item.active ? event_active : event_inactive" :color="item.active ? 'green':'red'" size="24"/>
    </div>
    <cld-image :public-id="item.logo" width="30" crop="scale" class="m-auto flex items-center"/>
    <div class="border-r text-center uppercase border-l h-full flex items-center justify-center py-2">
      <button class="hover:bg-grey-light p-3 mr-3 uppercase">Edit</button>
      <button class="hover:bg-grey-light p-3 uppercase">Delete</button>
    </div>
  </div>
</template>
<script>
import { event_active, event_inactive } from '@/static/icons';
import Icon from '@/components/Icon.vue';

export default {
  components: { Icon },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      event_inactive,
      event_active
    }
  },
  methods: {
    edit() {},
    delete() {}
  }
}
</script>