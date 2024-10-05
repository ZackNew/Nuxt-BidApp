import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUser = ref<User | null>(null);

    return { currentUser };
  },
  {
    persist: true,
  }
);
