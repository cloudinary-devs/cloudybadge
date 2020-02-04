<template>
  <section class="container flex-col">
    <div class="flex">
      <cld-image public-id="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_100/v1/logo/for_white_bg/cloudinary_vertical_logo_for_white_bg.png"/>
      <div class="flex items-center" v-if="event && event.logo">
        <span class="text-3xl ml-5 mr-5">❤️</span>
        <cld-image :public-id="event.logo" width="80" crop="scale"/>
      </div>      
    </div>
    <div v-if="event" class="max-w-sm flex flex-col">
      <h1 class="my-3">
        Welcome to CloudyBadge
      </h1>
      <h3 class="text-grey-darker">
        Presented at {{event.name}}
      </h3>
      <div class="border-b-2 border-dashed w-1/6 self-center mt-3 mb-3" />
      <form @submit.prevent="register" class="mt-5">
        <div class="flex flex-col text-left">
          <label for="name">First Name</label>
          <input name="name" v-model="fname" type="text" required class="p-3 border-b mt-2"/>
        </div>
        <div class="flex flex-col text-left">
          <label for="name">Last Name</label>
          <input name="name" v-model="lname" type="text" required class="p-3 border-b mt-2"/>
        </div>
        <div class="flex flex-col text-left">
          <label for="company" class=" mt-3">Company</label>
          <input name="company" v-model="company" type="text" required  class="p-3 border-b mt-2"/>
        </div>
        <div class="flex flex-col text-left">
          <label for="title" class=" mt-3">Title</label>
          <input name="title" v-model="title" type="text" required  class="p-3 border-b mt-2"/>
        </div>
        <div class="flex flex-col text-left">
          <label for="email" class=" mt-3">Email</label>
          <input name="email" v-model="email" type="text" required class="p-3 border-b mt-2"/>
        </div>
        <button type="submit" class="button--green m-4">Register me!</button>
      </form>
    </div>
    <div v-else>
      <h2 class="mt-5 mb-5">Looks like the event does not exist.</h2>
      <h3 class="text-grey-darker">Go back to event list maybe?</h3>
      <nuxt-link to="/">
        <button class="button--green m-4">Yes, take me home.</button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

//TODO - change to middleware
export default {
  async asyncData({ params, query, $axios }) {
    const event = await $axios.$get(`api/getEvent?id=${params.event_id}`);      

    return !event.error ? { event } : {};
  },
  data() {
    return {
      fname: '',
      lname: '',
      company: '',
      title: '',
      email: '',
      event: null,
    }
  },
  methods: {
    async register(e) {
      this.$toast.info('Registering...');

      const payload = {
        firstName: this.fname,
        lastName: this.lname,
        company: this.company,
        title: this.title,
        email: this.email,
        eventId: this.event.id,
      };

      const response = await axios.post(`/api/insert`, {
        payload
      });

      if (response.error) {
        this.$toast.error('Failed to register. Please try again.');
      } else {
        this.$toast.success('Registered succeeded. Redirecting to your badge page');
        this.$router.push({
          path: `/event/${this.event.id}/${response.data.editKey}`
        });
      }
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
