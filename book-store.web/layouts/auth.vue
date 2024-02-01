<template>
  <v-app>
    <v-main>
      <v-sheet class="bg-primary pa-12" height="100%">
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <slot />
        </v-card>
      </v-sheet>
    </v-main>
  </v-app>
</template>