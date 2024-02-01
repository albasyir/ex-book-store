<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar>
        <v-spacer />
        <v-app-bar-title class="text-center">Book Store</v-app-bar-title>
        <v-spacer />
        <v-btn-group class="pr-2">
          <v-btn color="error" @click="logout">
            Logout
          </v-btn>
        </v-btn-group>
      </v-app-bar>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  router.push("/auth/sign-in");
  authStore.revokeToken();
}
</script>