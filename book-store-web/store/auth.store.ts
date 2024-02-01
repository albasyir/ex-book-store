import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as null | string
  }),

  actions: {
    async login(email: string, password: string) {
      const requestor = await useWebStoreRequestor()

      const response: any = await requestor("auth/login", {
        body: { email, password },
        method: 'POST'
      });

      this.setToken(response.token)
    },

    async setToken(token: string) {
      if (process.server) {
        throw Error("SSR isn't curretly supported")
      }

      this.token = token;
      window.localStorage.setItem('token', token);
    },

    async revokeToken() {
      if (process.server) {
        throw Error("SSR isn't curretly supported")
      }

      this.token = null;
      window.localStorage.removeItem('token')
    },

    async register(dataInfo: Record<string, any>) {
      const requestor = await useWebStoreRequestor()

      requestor("auth/register", {
        body: dataInfo,
        method: 'POST'
      })
    },
  }
})