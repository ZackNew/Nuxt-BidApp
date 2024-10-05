export default defineEventHandler(async (event) => {
  try {
    const response: Listing[] = await $fetch("http://localhost:3001/listings");
    return response;
  } catch (error) {
    console.error("Error fetching product listings:", error);

    const err = error as { response?: { status: number }; message: string };

    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: "Failed to fetch product listings",
      data: {
        message: err.message,
      },
    });
  }
});
