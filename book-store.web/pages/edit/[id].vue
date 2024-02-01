<template>
  <h1 class="text-center">Edit Book</h1>
  <book-form @submit="editBook" :="data">
    <template #submit>
      <v-btn type="submit" color="primary">
        Edit Item
      </v-btn>
    </template>
  </book-form>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { useBookStore } from '~/store/book.store';

const route = useRoute();
const router = useRouter();
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
});

async function editBook(book: {
  name: string;
  desc: string;
  price: string;
}) {

  bookStore.editBook(route.params['id'], book).then(() => {
    Swal.fire({
      icon: 'success',
      text: 'Item edited'
    })
  })
}

</script>