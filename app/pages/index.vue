<template>
  <div class="w-full">

    <HeroSection @click="register('new user', 'the_password')" />

    <!-- TODO: Product for bidding -->
    <h2 class="text-xl text-primary-950 font-bold my-8">Listed Products</h2>
    <div v-if="productListings" class="grid grid-cols-12 gap-4">
      <div v-for="product in productListings" :key="product.id" class="col-span-3">
        <ProductListCard :product="product" />
      </div>
    </div>

    <!-- Product list -->
    <h2 class="text-xl text-primary-950 font-bold my-8">Available Products</h2>
    <div v-if="products" class="grid grid-cols-12 gap-4">
      <div v-for="product in products" :key="product.id" class="col-span-3">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products, fetchProducts } = useProducts()
const { productListings, fetchProductListings } = useListing()
const { register } = useAuth()

onMounted(async () => {
  await fetchProducts()
  await fetchProductListings()
})
</script>

<style scoped></style>