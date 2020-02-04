<template>
  <list :items="items" list class="leaderboard--list overflow-x-hidden overflow-auto border-2 p-3 justify-center flex-1 border-2 border-grey-light">
    <div slot-scope="item" :class="getClassForUser(item.id)">
      <span :class="getPositionClass(item.id)">{{item.id + 1}}</span>
      <div>{{item.name}}</div>
      <div :class="getPositionClass(item.id)">
        <span>{{item.votes}}</span>
        <span>/{{boardLength}}</span>
      </div>
      <thumbnail 
        :class="getThumbnailClass(item.id)"
        :id="item.viewKey"
        :avatar="item.avatar"
        :index="item.id"
        :read-only="true"
      />
      <icon size="32" color="#e91e63" :path="cup" class="absolute leaderboard--user-item--winner" v-if="item.id === 0"/>
    </div>        
  </list>
</template>
<script>
import List from '@/components/List.vue';
import Thumbnail from '@/components/Thumbnail.vue';
import Icon from '@/components/Icon.vue';
import { cup } from '@/static/icons';

export default {
  components: { List, Thumbnail, Icon },
  props: {
    items: {
      type: Array,
      required: true
    },
    boardLength: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      cup
    }
  },
  methods: {
    getClassForUser(pos) {
      const baseClass = 'px-5 border rounded mb-4 relative leaderboard--user-item items-center py-1';

      if (pos === 0) {
        return `${baseClass} bg-teal-dark font-bold text-white text-2xl py-2`;
      }
      else if (pos > 0 && pos < 5 ) {
        const colors = {
          1: 'bg-pink-dark',
          2: 'bg-indigo',
          3: 'bg-orange-light',
          4: 'bg-blue-light'
        };

        return `${baseClass} ${colors[pos]} font-bold text-white text-lg`;
      }
      else {
        return `${baseClass} bg-grey-light text-sm`;
      }
    },
    getPositionClass(pos) {
      const baseClass = 'leaderboard--user-item--votes';

      if (pos === 0) {
        return `${baseClass} text-3xl`;
      }

      return baseClass;
    },
    getThumbnailClass(pos) {
      if (pos === 0) {
        return "leaderboard--user-item--thumbnail-top"
      } else {
        return "leaderboard--user-item--thumbnail";
      }
    }
  }
}
</script>

<style scoped>
  .leaderboard--user-item {
    display: grid;
    grid-template-columns: 20px 1fr 1fr auto;
    grid-gap: 15px;
  }

  .leaderboard--user-item--thumbnail-top {
    width: 90px;
    height: 90px;
    justify-self: flex-end;
    align-self: center;
  }

  .leaderboard--user-item--thumbnail {
    width: 70px;
    justify-self: flex-end;
    align-self: center;
    height: 70px;
    margin-left: 20px;
  }

  .leaderboard--list {
    max-height: calc(100% - 150px);
  }

  .leaderboard--user-item--votes {
    justify-self: flex-end;
  }

  .leaderboard--user-item--winner {
    top: -10px;
    right: -10px;
    transform: rotate(30deg);
  }

  @media only screen and (min-width: 650px) {
    .leaderboard--list {
      margin: 0 1.5rem;
    }
  }
</style>