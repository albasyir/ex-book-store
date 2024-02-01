<template>
  <v-form @submit="submitted">
    <v-text-field class="mb-2" clearable label="Email" placeholder="yourmail@example.com"
      v-model:model-value="form.email" />
    <v-text-field clearable label="Password" placeholder="Enter your password" type="password"
      v-model:model-value="form.password" />

    Role
    <v-radio-group inline v-model:model-value="form.role">
      <v-radio label="Employee" value="employee" />
      <v-radio label="Admin" value="admin" />
    </v-radio-group>

    <br />

    <div class="text-center">
      <v-btn color="success" type="submit" variant="elevated">
        Register
      </v-btn>
    </div>


    <br />

    <div class="text-center">
      Already have account? <nuxt-link to="/auth/sign-in">Login</nuxt-link>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { useAuthStore } from '~/store/auth.store';

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  email: '',
  password: '',
  role: null,
})

const authStore = useAuthStore();

function submitted(e: Event) {
  e.preventDefault();

  authStore.register(form).then(() => {
    Swal.fire({
      text: "Account has been created",
      icon: "success",
    });
  })
}


</script>