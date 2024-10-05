<template>
  <div class="mt-24">
    <h2 class="text-3xl font-bold text-gray-600 mb-12">My product listings</h2>
    {{ myListings }}
  </div>
</template>

<script setup lang="ts">
const { getMyListings } = useListing()

const myListings = ref<Listing[] | null>(null)

onMounted(async () => {
  const listing = await getMyListings()
  if (listing) {
    myListings.value = listing
  }
  console.log(listing);

})
</script>

<style scoped></style>