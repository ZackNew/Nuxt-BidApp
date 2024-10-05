export const useUiHelpers = () => {
  const isAuthModal = useState<boolean>(() => false);

  const toggleAuthModal = () => {
    isAuthModal.value = !isAuthModal.value;
  };

  return {
    isAuthModal,
    toggleAuthModal,
  };
};
