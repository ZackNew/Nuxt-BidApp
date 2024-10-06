export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { price, listingId } = body;
  const user: User = event.context.user;

  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;

  try {
    const newBid: Bid = {
      id: Date.now().toString(),
      price,
      listingId,
      userId: user.id,
      username: user.username,
    };
    await $fetch(`${dbUrl}/bids`, {
      method: "POST",
      body: newBid,
    });

    const listing: Listing = await $fetch(`${dbUrl}/listings/${listingId}`);

    listing.bids?.push(newBid);
    listing.bidCount = listing.bids?.length || 0;

    await $fetch(`${dbUrl}/listings/${listingId}`, {
      method: "PUT",
      body: listing,
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
