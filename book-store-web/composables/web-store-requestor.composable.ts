import Swal from "sweetalert2";
import { useAuthStore } from "~/store/auth.store"

export const useWebStoreRequestor = async () => {
  return $fetch.create({
    async onRequest({ request, options }) {
      const authStore = useAuthStore();
      options.baseURL = "http://localhost:8000"

      if (authStore.token) {
        options.headers = {}
        options.headers['Authorization'] = `Bearer ${authStore.token}`
      }

    },

    async onResponse(context) {
      if (context.response.status >= 400) {
        if (process.client) {
          Swal.fire({
            title: context.response._data.error,
            text: context.response._data.message,
            icon: 'error',
            confirmButtonText: 'got it'
          })
        }

        throw Error(context.response._data.message)
      }
    },
  })
}