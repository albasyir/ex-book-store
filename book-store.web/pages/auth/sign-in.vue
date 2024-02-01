<template>
  <v-form @submit="submitted">
    <v-text-field v-model:model-value="form.email" class="mb-2" clearable label="Email"
      placeholder="yourmail@example.com" />
    <v-text-field v-model:model-value="form.password" clearable label="Password" placeholder="Enter your password"
      type="password" />

    <br />

    <div class="text-center">
      <v-btn color="success" type="submit">
        Login
      </v-btn>
    </div>

    <br />

    <div class="text-center">
      Don't have an account? <nuxt-link to="/auth/sign-up">register</nuxt-link>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';

definePageMeta({
  layout: 'auth',
})

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: '',
  password: '',
})

async function submitted(e: Event) {
  e.preventDefault();

  await auth.login(form.email, form.password).catch((e) => {
    console.warn(e);
    return Promise.reject(e)
  })

  router.push("/")
}
</script>