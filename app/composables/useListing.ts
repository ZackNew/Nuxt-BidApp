export const useListing = () => {
  const productListings = ref<Listing[] | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchProductListings = async () => {
    try {
      loading.value = true;
      error.value = null;

      const listingResult = await $fetch("/api/listing/listings");

      productListings.value = listingResult as Listing[];
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      error.value = errorMessage;

      console.error("Error fetching products:", errorMessage);
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
      await $fetch("/api/listing/listing", {
        method: "POST",
        body: { description, initialPrice, product },
      });
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      console.error("Error fetching products:", errorMessage);
    }
  };

  return { productListings, fetchProductListings, addToListing };
};
