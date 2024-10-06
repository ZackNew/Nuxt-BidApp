export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const userStore = useUserStore();

  if (!userStore.currentUser) {
    return navigateTo("/");
  }
});
