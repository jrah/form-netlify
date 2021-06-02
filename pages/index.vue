<template>
  <div class="container">
    <form @submit.prevent="sendFormLambda">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Test inputs</h3>
      <p class="mt-1 text-sm text-gray-500">
        This is a test form. Please input any text.
      </p>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <div class="mt-1">
          <input
            v-model="form.email"
            type="text"
            name="email"
            id="email"
            class="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
      },
    }
  },
  methods: {
    async sendFormLambda() {
      try {
        await this.$axios.$post(
          'http://localhost:8888/.netlify/functions/mail',
          {
            email: this.form.email,
          }
        )
        console.log('success')
        this.form.email = ''
        // return response
      } catch (error) {
        console.log('error', error)
      }
    },
  },
}
</script>

<style>
.container {
  @apply mx-auto;
  @apply max-w-screen-md;
}

body {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #35495e;
}
</style>
