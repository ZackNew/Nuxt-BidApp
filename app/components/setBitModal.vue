<template>
  <div>
    <div class="flex gap-4">
      <div><img :src="product.product.image" alt="" class="max-w-[30rem]"></div>
      <div>
        <h2 class="font-bold text-gray-600 mb-4">{{ product.product.title }}</h2>
        <p class="flex flex-wrap mb-4">{{ product.description }}</p>
        <p class="my-2"><span class="font-bold text-gray-700">Bids count: </span> {{ product.bidCount }}</p>
        <p class="my-2 "><span class="font-bold text-gray-700">Initial price: </span> {{
          (product.initialPrice).toLocaleString()
        }} ETB</p>
        <Tag v-if="product.open" severity="success" value="Open"></Tag>
        <Tag v-else severity="warn" value="Closed"></Tag>
        <div class="flex items-center gap-4">
          <InputNumber v-model="setPrice" prefix="ETB " locale="en-US" placeholder="Bid price" class="" />
          <Button label="Set bid" class="my-8" :disabled="!canHitActionButton" @click="setBid()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: 'modalClosed'): void
}>()
const props = defineProps<{
  product: Listing
}>()

const { addBid } = useBid()

const setPrice = ref<number>()

const canHitActionButton = computed(() => {
  return !!(props.product.open && setPrice.value && setPrice.value > 0)
})

async function setBid() {
  if (setPrice.value) {
    await addBid(setPrice.value, props.product.id)
    emits('modalClosed')
  }
}
</script>

<style scoped></style>