export default defineEventHandler(async (event) => {
  const user: User = event.context.user;

  try {
    const response: Listing[] = await $fetch("http://localhost:3001/listings", {
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
