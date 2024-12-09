<template>
  <div>
    <div v-if="myListings?.length">
      <div class="mt-24">
        <h2 class="text-3xl font-bold text-gray-600 mb-12">My product listings</h2>
      </div>
      <div class="card">
        <DataTable v-model:expandedRows="expandedRows" :value="myListings" dataKey="id" tableStyle="min-width: 60rem">
          <Column expander style="width: 5rem" />
          <Column header="Image" style="width: 20%">
            <template #body="{ data }">
              <img :src="data.product.image" :alt="data.product.title" class="shadow-lg" width="64" />
            </template>
          </Column>
          <Column field="product.title" header="Name" style="width: 20%">
          </Column>
          <Column header="Initial price" style="width: 20%">
            <template #body="{ data }">
              <p>{{ data.initialPrice.toLocaleString() }} ETB</p>
            </template>
          </Column>
          <Column field="bidCount" header="Bids count" style="width: 20%">
          </Column>
          <Column header="Status" style="width: 20%">
            <template #body="{ data }">
              <ToggleSwitch :modelValue="data.open" @update:modelValue="onStatusUpdate(data)" />
            </template>
          </Column>
          <template #expansion="{ data }">
            <div v-if="data.bids.length" class="p-4">
              <DataTable :value="data.bids">
                <Column field="username" header="User"></Column>
                <Column header="Price">
                  <template #body="{ data }">
                    <p>{{ data.price.toLocaleString() }} ETB</p>
                  </template>
                </Column>
              </DataTable>
            </div>
            <div v-else>
              <p class="text-center">No bids were set so far</p>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
    <div v-else class="my-20">
      You have not created any lisitng yet
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['client-auth'],
});

const { getMyListings, updateListingStatus } = useListing()

const myListings = ref<Listing[] | null>(null)
const expandedRows = ref({});

async function onStatusUpdate(listing: Listing) {
  listing.open = !listing.open
  await updateListingStatus(listing)
  await getMyListings()
}

async function fetchListings() {
  const listing = await getMyListings()
  if (listing) {
    myListings.value = listing
    return true
  } else {
    return false
  }
}

const { resume } = useIntervalFn(async () => {
  await fetchListings()
}, 10000, { immediate: false })

onMounted(async () => {
  const result = await fetchListings()
  if (result) {
    resume()
  }
})

</script>
