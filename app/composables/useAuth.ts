export const useAuth = () => {
  // const user = useState<User | null>(() => null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const { toggleAuthModal } = useUiHelpers();
  const userStore = useUserStore();

  const register = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch("/api/auth/register", {
        method: "POST",
        body: { username, password },
      });
      toggleAuthModal();
    } catch (err: any) {
      if (err.data?.statusMessage) {
        error.value = err.data.statusMessage;
      } else {
        error.value = "Error while registering user. Please try again";
      }
    } finally {
      loading.value = false;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      const result = await $fetch("/api/auth/signin", {
        method: "POST",
        body: { username, password },
      });

      result.user && (userStore.currentUser = result.user);

      toggleAuthModal();
    } catch (err: any) {
      if (err.data?.statusMessage) {
        error.value = err.data.statusMessage;
      } else {
        error.value = "Error while logging in. Please try again";
      }
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch("/api/auth/signout", {
        method: "POST",
      });
      const router = useRouter();
      router.push("/");
      userStore.currentUser = null;
    } catch (err: any) {
      if (err.data?.statusMessage) {
        error.value = err.data.statusMessage;
      } else {
        error.value = "Error while logging out.";
      }
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, register, login, logout };
};
