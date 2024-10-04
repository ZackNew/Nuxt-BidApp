export const useProducts = () => {
  const products = ref<Product[] | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchProducts = async () => {
    try {
      loading.value = true;
      error.value = null;

      const productResult = await $fetch("api/products");

      products.value = productResult as Product[];
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";

      error.value = errorMessage;

      console.error("Error fetching products:", errorMessage);
    } finally {
      loading.value = false;
    }
  };

  return { products, error, fetchProducts };
};
