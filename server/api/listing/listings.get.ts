export default defineEventHandler(async (event) => {
  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;

  try {
    const response: Listing[] = await $fetch(`${dbUrl}/listings`);

    response.forEach((listing) => {
      delete listing.bids;
    });

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
