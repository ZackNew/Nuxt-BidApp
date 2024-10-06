export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { updatedListing } = body;
  const user: User = event.context.user;

  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;

  try {
    if (user.id === updatedListing.userId) {
      await $fetch(`${dbUrl}/listings/${updatedListing.id}`, {
        method: "PUT",
        body: updatedListing,
      });
    }

    return { success: true, message: "Updated list" };
  } catch (error: any) {
    console.error("Error during updating:", error);

    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error during updating",
      });
    }

    throw error;
  }
});
