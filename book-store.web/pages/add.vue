<template>
  <h1 class="text-center">Add New Item</h1>
  <book-form @submit="addBook">
    <template #submit>
      <v-btn type="submit" color="primary">
        Add Item
      </v-btn>
    </template>
  </book-form>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { useBookStore } from '~/store/book.store';

const bookStore = useBookStore()

async function addBook(book: {
  name: string;
  desc: string;
  price: string;
}) {
  bookStore.add(book).then(() => {
    Swal.fire({
      text: "New book has been added",
      icon: "success"
    })
  })
}
</script>