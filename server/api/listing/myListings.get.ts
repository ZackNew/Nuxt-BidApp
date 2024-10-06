export default defineEventHandler(async (event) => {
  const user: User = event.context.user;

  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;

  try {
    const response: Listing[] = await $fetch(`${dbUrl}/listings`, {
      params: {
        userId: user.id,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching my product listings:", error);

    const err = error as { response?: { status: number }; message: string };

    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: "Failed to fetch my product listings",
      data: {
        message: err.message,
      },
    });
  }
});
