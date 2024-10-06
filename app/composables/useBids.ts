export const useBid = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const { showErrorMessage, showSuccessMessage } = useMessages();

  const addBid = async (price: number, listingId: string) => {
    try {
      loading.value = true;
      await $fetch("/api/bid/bid", {
        method: "POST",
        body: { price, listingId },
      });
      showSuccessMessage("Bid have been set");
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      showErrorMessage(error.value || "");
      console.error("Error creating bid:", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  return { addBid };
};
