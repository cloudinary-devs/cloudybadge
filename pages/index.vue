<template>
  <section class="min-h-screen text-center mx-auto overflow-hidden flex flex-col">
    <div class="flex items-center justify-center">
      <cld-image public-id="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_100/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.png"/>
      <h1 class="mx-5 text-orange-dark">
        CloudyBadge
      </h1>
      <h4>V0.0.1</h4>
    </div>
    <div class="overflow-auto flex flex-col flex-1">
      <h3 class="text-grey-dark font-mono font-thin" v-if="events.length > 0">_Have fun customizing your conference badge_</h3>
      <main class="mt-5 bg-grey flex-1">
        <div class="mx-8 mt-8">
          <div class="text-2xl text-indigo-dark">Choose your conference and let's get started!</div>
          <list :items="currEvents" grid class="flex my-5 p-0 flex-wrap justify-center">          
            <card slot-scope="item" v-bind="item" :link="`/event/${item.id}`"/>
          </list>
        </div>
        <div class="pt-5 border-t border-grey-light mx-8">
          <div class="text-2xl text-indigo-dark">CloudyBadge in past tours</div>
          <list :items="pastEvents" grid class="flex my-5 p-0 flex-wrap justify-center">          
            <card slot-scope="item" v-bind="item" :link="`/event/${item.id}`"/>
          </list>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card';
import List from '@/components/List.vue';

export default {
  components: { Card, List }, 
  head() {
    return {
      title: `CloudyBadge by Cloudinary`,
      meta: [
        { hid: 'description', name: 'description', content: 'CloudyBadge in conferences' }
      ]
    };
  },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`api/getAllEvents`);
    return !response.error ? {
      events: response.events
    } : {}
  },
  data() {
    return {
      events: []
    }
  },
  computed: {
    currEvents() {
      //TODO - should be filtered by event.duration and event.active?
      return this.events.filter(event => event.active);
    },
    pastEvents() {
      return this.events.filter(event => !event.active);
    }
  }
}
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
