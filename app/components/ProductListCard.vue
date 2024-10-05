<template>
  <div
    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative mx-auto">
        <img class="rounded w-full h-48 object-contain" :src="product.product.image" :alt="product.product.title"
          style="max-width: 300px" />
      </div>
    </div>
    <div class="pt-6">
      <p class="text-gray-500 text-sm"> <span class="text-indigo-600 font-bold">{{ product.bidders.length }}</span> bids
      </p>
      <div class="text-sm font-medium mt-1 h-20">{{ product.product.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: Listing
}>()
</script>

<style scoped></style>