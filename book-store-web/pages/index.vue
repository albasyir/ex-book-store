<template>
  <v-container>
    <h1 class="text-center">Dashboard</h1>
    <v-row class="py-4">
      <v-spacer />
      <v-btn @click="addBook" color="primary">Add New Book</v-btn>
    </v-row>

    <v-data-table :headers="headers" :items="books" :loading="loading">
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-1" color="primary" @click="viewBook(item.id)">View</v-btn>
        <v-btn class="mx-1" color="success" @click="editBook(item.id)">Edit</v-btn>
        <v-btn class="mx-1" color="error" @click="deleteBook(item.id)">Delete</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts" setup>
import { useBookStore } from '~/store/book.store';

const router = useRouter()
const bookStore = useBookStore();
const headers = reactive<any[]>([
  {
    title: 'No',
    key: 'id',
  },
  {
    title: 'Item Name',
    key: 'name',
  },
  {
    title: 'Actions',
    align: 'center',
    key: 'action',
    sortable: false,
  }
]);

const books = computed<{ id: number; name: string; }[]>(() => {
  return bookStore.list.data
})

const loading = computed(() => {
  return bookStore.list.status === 'fetching';
})

const addBook = () => {
  router.push('/add');
};

const editBook = (id: number) => {
  router.push(`/edit/${id}`);
};

const deleteBook = (id: number) => {
  bookStore.deleteBook(id).finally(() => {
    bookStore.getList();
  });
}

const viewBook = (id: number) => {
  router.push(`book/${id}`);
}

onBeforeMount(async () => {
  bookStore.getList();
});
</script>
