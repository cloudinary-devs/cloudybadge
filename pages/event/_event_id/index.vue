<template>
  <div class="overflow-hidden bg-grey event-container">
    <top-bar class="bg-indigo-dark">
      <back link="/"/>
      <div class="flex items-center justify-center" v-if="event">
        <cld-image :public-id="event.logo" width="50" crop="scale"/>
        <h2 class="mx-5 text-orange-dark">
          {{event.name}}
        </h2>
      </div>
    </top-bar>
    <div class="my-5">
      <h2 class="text-center">{{headerTitle}}</h2>
    </div>
    <div class="flex justify-center" v-if="users">
      <nuxt-link :to="`/event/${event.id}/leaderboard`">
        <button class="bg-green-dark hover:bg-green-darker text-white font-bold p-4 rounded mt-4 m-auto">
          View board
        </button>
      </nuxt-link>
    </div>
    <list :items="filteredUsers" grid v-if="users" class="m-8 overflow-auto border-2 border-grey-light p-3 justify-center flex-1">
      <Thumbnail slot-scope="item" class="mb-4 mr-4 hover:border-green-dark border-transparent border-2 p-1 rounded-full relative"
        :id="`${event.id}/${item.viewKey}${voteId ? `?vid=${voteId}` : ''}`"
        :avatar="item.avatar"
        :hasWinnerIcon="item.isWinner && !event.active"
        :hasFavoriteIcon="event.active && voteId && voteId !== item.voteId"
        :isFavorited="favoriteBadge === item.viewKey"
      />        
    </list>
    <div v-else>Error loading the list of badges</div>
  </div>
</template>
<script>
import List from '@/components/List.vue';
import Thumbnail from '@/components/Thumbnail.vue';
import TopBar from '@/components/Header.vue';
import Back from '@/components/Back.vue';

//TODO: Add metadata
export default {
  head() {
    const content = this.event ? `for ${this.event.name}` : ' per conference';

    return {
      title: `CloudyBadge ${content}`,
      meta: [
        { hid: 'description', name: 'description', content: `List of badges ${content}` }
      ]
    };
  },
  components: {
    List,
    Thumbnail,
    Back,
    TopBar
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$get(`api/getAllPerEvent?id=${params.event_id}`);
    return !response.error ? {
      ...response,
      voteId: query.vid,
    } : {};
  },
  data() {
    return {
      users: [],
      event: null,
      favoriteBadge: '',
      voteId: '',
    }
  },
  computed: {
    headerTitle() {
      return this.event.active ? "Vote for the badge you ❤️" : "We ❤️ all the badges";
    },
    filteredUsers() {
      return this.users.filter(user => user.avatar && user.avatar.public_id);
    }
  },
}
</script>
<style scoped>
.user--icon {
  top: 0;
  right: 0;
  padding: 15px;
}

.event-container {
  display: grid;
  grid-template-rows: min-content min-content min-content auto;
  overflow: hidden;
  grid-gap: 1rem;
}
</style>