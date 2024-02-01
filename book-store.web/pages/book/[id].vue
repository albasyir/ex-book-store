<template>
  <h1 class="text-center">View Book</h1>
  <book-form readonly :="data" />
</template>

<script setup lang="ts">
import { useBookStore } from '~/store/book.store';

const route = useRoute();
const bookStore = useBookStore();

const data = reactive({
  name: "",
  desc: "",
  price: "",
});

onMounted(() => {
  bookStore.getBook(route.params['id']).then(book => {
    Object.assign(data, book)
  })
})

</script>