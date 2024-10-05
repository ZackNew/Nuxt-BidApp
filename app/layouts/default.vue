<template>
  <div class="bg-primary-50 bg-opacity-40">
    <Header />
    <div class="max-w-[1280px] mx-auto px-4">
      <slot />
    </div>
    <!-- Modals -->
    <AuthModal />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>