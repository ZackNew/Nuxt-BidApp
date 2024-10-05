export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { description, initialPrice, product } = body;
  const user: User = event.context.user;

  try {
    const newListing: Listing = {
      id: Date.now().toString(),
      description,
      userId: user.id,
      open: true,
      bidders: [],
      initialPrice,
      product,
    };

    await $fetch("http://localhost:3001/listings", {
      method: "POST",
      body: newListing,
    });

    return { success: true, message: "Added to list" };
  } catch (error: any) {
    console.error("Error during registration:", error);

    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error during registration",
      });
    }

    throw error;
  }
});