import { useAuthStore } from '@/store/auth.store';

export default defineNuxtRouteMiddleware((to, from) => {

  const router = useRouter();
  const authStore = useAuthStore();

  const token = computed(() => {
    if (process.server) {
      throw Error("SSR is not currently supported")
    }

    return window.localStorage.getItem("token");
  });

  authStore.token = token.value;

  if (!authStore.token) {
    console.warn("blocked user");

    if (to.path !== '/auth/sign-in') {
      return navigateTo('/auth/sign-in')
    }
  }
})