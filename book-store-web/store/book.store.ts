import { defineStore } from "pinia";
import { useWebStoreRequestor } from "~/composables/web-store-requestor.composable";

export const useBookStore = defineStore("book", {
  state: () => {
    return {
      list: {
        data: [] as any[],
        status: 'never-fetch' as 'never-fetch' | 'fetching' | 'fetched',
      }
    }
  },

  actions: {
    async getList() {
      const requestor = await useWebStoreRequestor();

      this.list.status = 'fetching';
      const result: any[] = await requestor("/book").finally(() => {
        this.list.status = 'fetched'
      })

      this.list.data = result;
    },

    async add(book: {
      name: string;
      desc: string;
      price: string;
    }) {
      const requestor = await useWebStoreRequestor();

      return requestor("book", {
        body: book,
        method: 'POST'
      })
    },

    async deleteBook(bookId: number) {
      const requestor = await useWebStoreRequestor();

      return requestor(`book/${bookId}`, {
        method: 'DELETE'
      })
    },

    async getBook(bookId: number) {
      const requestor = await useWebStoreRequestor();

      return requestor(`book/${bookId}`)
    },

    async editBook(bookId: number, book: {
      name: string;
      desc: string;
      price: string;
    }) {
      const requestor = await useWebStoreRequestor();

      return requestor(`book/${bookId}`, {
        method: "PUT",
        body: book
      })
    }
  }
})