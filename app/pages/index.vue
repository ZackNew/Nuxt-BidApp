<template>
  <div>
    <p class="text-xl text-pink-500">Private index page</p>
  </div>
</template>

<script setup lang="ts">
const { products, fetchProducts } = useProducts()

onMounted(async () => {
  await fetchProducts()
})
</script>

<style scoped></style>