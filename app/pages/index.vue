<template>
  <div class="w-full">

    <HeroSection @click="register('new user', 'the_password')" />

    <!-- TODO: Product for bidding -->

    <!-- Product list -->
    <h2 class="text-xl text-primary-950 font-bold my-8">Available Products</h2>
    <div v-if="products" class="grid grid-cols-12 gap-4">
      <div v-for="product in products" :key="product.id" class="col-span-3">
        <ProductCard :title="product.title" :image="product.image" :category="product.category" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products, fetchProducts } = useProducts()
const { register } = useAuth()

onMounted(async () => {
  await fetchProducts()
})
</script>

<style scoped></style>