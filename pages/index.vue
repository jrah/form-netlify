<template>
  <div class="container h-screen flex justify-center items-center">
    <div v-if="formConfirmation">
      <p class="mt-1 text-sm text-gray-500">Form submitted succesfully.</p>
    </div>
    <form v-else @submit.prevent="sendFormLambda">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Test inputs</h3>
      <p class="mt-1 text-sm text-gray-500">
        This is a test form. Please input any text.
      </p>
      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700 leading-8"
          >Email to send message to</label
        >
        <div class="mt-1 mb-2">
          <input
            v-model="form.email"
            type="text"
            name="email"
            id="email"
            class="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border rounded-md"
            placeholder="you@example.com"
          />
        </div>
        <label for="message" class="block text-sm font-medium text-gray-700 leading-8"
          >Message</label
        >
        <div class="mt-1 mb-2">
          <textarea
            v-model="form.message"
            type="text"
            name="message"
            id="message"
            class="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border rounded-md"
            placeholder="Your message"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-end">
          <button
            type="submit"
            :class="
              isSending ? 'disabled:opacity-50 cursor-not-allowed' : false
            "
            :disabled="isSending"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ isSending ? 'Sending' : 'Send' }}
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
        message: '',
      },
      isSending: false,
      formConfirmation: false,
    }
  },
  methods: {
    async sendFormLambda() {
      this.isSending = true
      try {
        await this.$axios.$post(
          `https://hungry-hamilton-94675d.netlify.app/.netlify/functions/mail`,
          {
            email: this.form.email,
            message: this.form.message,
          }
        )
        this.formConfirmation = true
        console.log('success')
        this.form.email = ''
        this.form.message = ''
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
