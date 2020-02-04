<template>
    <div class="overflow-hidden bg-grey-lightest" v-if="event">
      <top-bar class="bg-grey-dark">
        <back :link="`/event/${event.id}/`"/>
        <div class="flex items-center justify-center" v-if="event">
            <icon size="32" color="white" :path="cup" class="mr-3"/>
            <cld-image :public-id="event.logo" width="32" crop="scale"/>
            <h2 class="mx-5 flex items-center">
            {{event.name}} 
            </h2>
            <icon size="32" color="white" :path="cup" class="ml-3"/>
        </div>
      </top-bar>
      <div class="flex flex-col items-center">
        <div class="my-4">
          <button :class="['capitalize px-3 py-2 focus:outline-none font-bold', isTop5 ? 'text-black' : 'text-grey']" @click="selectTab('top5')">Top 5</button>
          <button :class="['capitalize px-3 py-2 border-l border-grey focus:outline-none font-bold', isAll ? 'text-black' : 'text-grey']" @click="selectTab('all')">All</button>
        </div>
      </div>
      <div class="flex overflow-hidden items-start h-full">
        <badge class="flex leaderboard--badge"
          :badgeUrl="event.badge"
          :name="top5Users[0].name"
          :company="top5Users[0].company"
          :title="top5Users[0].title"
          :avatarOverlay="top5Users[0].avatar.public_id.replace(/\//gm, ':')"
          :effect="top5Users[0].avatar.transformation"
        />
        <leaderboard-list
          :items="top5Users"
          :boardLength="leaderboard.length"
          v-show="isTop5"
        />
        <leaderboard-list
          :items="allUsers"
          :boardLength="leaderboard.length"
          v-show="isAll"
        />
      </div>
    </div>
    <div v-else>
      Event doesn't exist.
    </div>
</template>
<script>
import TopBar from '@/components/Header.vue';
import Back from '@/components/Back.vue';
import Badge from '@/components/Badge.vue';
import LeaderboardList from '@/components/LeaderboardList.vue';
import Icon from '@/components/Icon.vue';
import { cup } from '@/static/icons';

export default {
  components: {
    Back,
    TopBar,
    Badge,
    Icon,
    LeaderboardList
  },
  head() {
    const content = this.event ? `for ${this.event.name}` : ' per conference';

    return {
      title: `Leaderboard ${content}`,
      meta: [
        { hid: 'description', name: 'description', content: `Leaderboard ${content}` }
      ]
    };
  },
  async asyncData({ params, $axios, query }) {
    const response = await $axios.$get(`api/getLeaderboard?id=${params.event_id}`);
    return !response.error ? {
      ...response,
      voteId: query.vid,
    } : {
      voteId: query.vid,
    };
  },
  data() {
    return {
      selectedTab: 'top5',
      voteId: '',
      event: null,
      leaderboard: [],
      cup
    }
  },
  computed: {
    isTop5() { return this.selectedTab === 'top5' },
    isAll() { return this.selectedTab === 'all' },
    allUsers() {
      return this.leaderboard.sort((badgeA, badgeB) => badgeB.votes - badgeA.votes);
    },
    top5Users() {
      return this.allUsers.slice(0, 5);
    },
  },
  methods: {
    selectTab(tab) { this.selectedTab = tab; },
  },
}
</script>
<style scoped>
.leaderboard--badge {
  width: 250px;
  margin-left: 1.5rem;
  display: none;
}

@media only screen and (min-width: 650px) {
  .leaderboard--badge {
    display: block;
  }
}
</style>