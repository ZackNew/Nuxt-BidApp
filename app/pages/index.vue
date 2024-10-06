<template>
  <div class="w-full">

    <HeroSection />

    <!-- TODO: Product for bidding -->
    <div v-if="productListings">
      <h2 class="text-xl text-primary-950 font-bold my-8">Listed Products</h2>
      <div class="grid grid-cols-12 gap-4">
        <div v-for="product in productListings" :key="product.id" class="col-span-3">
          <ProductListCard :product="product" />
        </div>
      </div>
    </div>

    <!-- Product list -->
    <div v-if="products">
      <h2 class="text-xl text-primary-950 font-bold my-8">Available Products</h2>
      <div class="grid grid-cols-12 gap-4">
        <div v-for="product in products" :key="product.id" class="col-span-3">
          <ProductCard :product="product" @product-added="fetchProductListings()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products, fetchProducts } = useProducts()
const { productListings, fetchProductListings } = useListing()

onMounted(async () => {
  await fetchProductListings()
  await fetchProducts()
})
</script>

<style scoped></style>