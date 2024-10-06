export const useListing = () => {
  const productListings = ref<Listing[] | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const { showErrorMessage, showSuccessMessage } = useMessages();

  const fetchProductListings = async () => {
    try {
      loading.value = true;
      error.value = null;

      const listingResult = await $fetch("/api/listing/listings");

      productListings.value = listingResult;
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      error.value = errorMessage;
      showErrorMessage("Error fetching listings");

      console.error("Error fetching listings:", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const getMyListings = async (): Promise<Listing[] | undefined> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch("/api/listing/myListings");

      return response;
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      error.value = errorMessage;
      showErrorMessage("Error fetching your listings");
      console.error("Error fetching listings:", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const updateListingStatus = async (
    updatedListing: Listing
  ): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch("/api/listing/updateStatus", {
        method: "PUT",
        body: { updatedListing },
      });
      showSuccessMessage("Update successfull");
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      error.value = errorMessage;
      showErrorMessage("Error updating list");
      console.error("Error updating list: ", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const addToListing = async (
    description: string,
    initialPrice: number,
    product: Product
  ) => {
    try {
      loading.value = true;
      await $fetch("/api/listing/listing", {
        method: "POST",
        body: { description, initialPrice, product },
      });
      showSuccessMessage("Product listed successfully");
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      showErrorMessage("error while adding list");
      console.error("Error while adding list:", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  return {
    productListings,
    fetchProductListings,
    addToListing,
    getMyListings,
    updateListingStatus,
  };
};
