export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { price, listingId } = body;
  const user: User = event.context.user;

  try {
    const newBid: Bid = {
      id: Date.now().toString(),
      price,
      listingId,
      userId: user.id,
      username: user.username,
    };
    await $fetch("http://localhost:3001/bids", {
      method: "POST",
      body: newBid,
    });

    const listing: Listing = await $fetch(
      `http://localhost:3001/listings/${listingId}`
    );

    listing.bids?.push(newBid);
    listing.bidCount = listing.bidCount + 1;

    await $fetch(`http://localhost:3001/listings/${listingId}`, {
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
