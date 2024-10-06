export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { description, initialPrice, product } = body;
  const user: User = event.context.user;

  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;

  try {
    const newListing: Listing = {
      id: Date.now().toString(),
      description,
      userId: user.id,
      open: true,
      bidCount: 0,
      bids: [],
      initialPrice,
      product,
    };

    await $fetch(`${dbUrl}/listings`, {
      method: "POST",
      body: newListing,
    });

    return { success: true, message: "Added to list" };
  } catch (error: any) {
    console.error("Error during adding:", error);

    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error during adding",
      });
    }

    throw error;
  }
});
