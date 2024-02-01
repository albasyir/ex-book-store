<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-form @submit="onFormSubmit" :readonly="props.readonly">
      <v-text-field label="Item Name" v-model="name" />
      <v-textarea label="Item Description" v-model="desc" />
      <v-text-field type="number" label="Item Price" v-model="price" />

      <div class="text-center">
        <slot name="submit" />
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  readonly?: boolean;
}>();

const name = defineModel('name');
const desc = defineModel('desc');
const price = defineModel('price');

const emit = defineEmits<{
  (e: 'submit', args: { name: string; desc: string; price: string; }): void
}>()

const allData = computed(() => {
  return {
    name: String(name.value),
    desc: String(desc.value),
    price: String(price.value)
  };
})

function onFormSubmit(e: Event) {
  e.preventDefault();

  emit("submit", allData.value)
}
</script>