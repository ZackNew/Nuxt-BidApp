<template>
  <div class="bg-primary-50 bg-opacity-40 min-h-[80vh]">
    <Header />
    <div class="max-w-[1280px] mx-auto px-4">
      <slot />
    </div>
    <!-- Modals -->
    <AuthModal />

    <!-- Toast -->
    <Toast />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>