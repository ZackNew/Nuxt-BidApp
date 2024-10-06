export const useAuth = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const { toggleAuthModal } = useUiHelpers();
  const userStore = useUserStore();
  const { showErrorMessage, showSuccessMessage } = useMessages();

  const register = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch("/api/auth/register", {
        method: "POST",
        body: { username, password },
      });
      toggleAuthModal();
      showSuccessMessage("user registered successfully");
    } catch (err: any) {
      if (err.data?.statusMessage) {
        error.value = err.data.statusMessage;
      } else {
        error.value = "Error while registering user. Please try again";
      }
      showErrorMessage(error.value || "");
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
      showSuccessMessage("logged in successful");
    } catch (err: any) {
      if (err.data?.statusMessage) {
        error.value = err.data.statusMessage;
      } else {
        error.value = "Error while logging in. Please try again";
      }
      showErrorMessage(error.value || "");
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
      showErrorMessage(error.value || "");
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, register, login, logout };
};
