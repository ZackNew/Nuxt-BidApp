export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch("https://fakestoreapi.com/products");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);

    const err = error as { response?: { status: number }; message: string };

    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: "Failed to fetch products",
      data: {
        message: err.message,
      },
    });
  }
});
