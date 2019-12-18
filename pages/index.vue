<template>
  <section class="container">
    <div>
      <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg-svg.png" height="150" crop="scale"/>
      <h1 class="my-3">
        Welcome to CloudyBadge
      </h1>
      <form @submit="register" class="flex flex-col text-left mt-5">
        <label for="name">Name</label>
        <input name="name" v-model="name" type="text" required class="p-3 border-b mt-2"/>
        <label for="company" class=" mt-3">Company</label>
        <input name="company" v-model="company" type="text" required  class="p-3 border-b mt-2"/>
        <label for="title" class=" mt-3">Title</label>
        <input name="title" v-model="title" type="text" required  class="p-3 border-b mt-2"/>
        <label for="email" class=" mt-3">Email</label>
        <input name="email" v-model="email" type="text" required class="p-3 border-b mt-2"/>
        <button type="submit" class="button--green m-4">Register me!</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      company: '',
      title: '',
      email: '',
    }
  },
  methods: {
    async register(e) {
      e.preventDefault();
      const payload = {
        name: this.name,
        company: this.company,
        title: this.title,
        email: this.email
      };
      try {
        const response = await axios.post(`/api/insert`, {
          payload
        });
        this.$router.push({
          path: `/upload/${response.data.id}`
      })
      } catch(error) {
        console.error('error', error)
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
