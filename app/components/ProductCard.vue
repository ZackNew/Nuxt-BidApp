<template>
  <div
    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded-lg flex flex-col bg-white">
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative mx-auto">
        <img class="rounded w-full h-48 object-contain" :src="product.image" :alt="product.title"
          style="max-width: 300px" />
      </div>
    </div>
    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <div>
          <span class="font-medium text-gray-500 dark:text-surface-400 text-sm">{{ product.category }}</span>
          <div class="text-sm font-medium mt-1 h-20">{{ product.title }}</div>
        </div>
      </div>
      <div>
        <Button icon="pi pi-hammer" label="Add to bid listing" size="small" :disabled="false"
          class="flex-auto whitespace-nowrap w-full"
          @click="userStore.currentUser ? showListingModal = true : toggleAuthModal()"></Button>
      </div>
    </div>
  </div>
  <!-- Add lisiting modal -->
  <Dialog v-model:visible="showListingModal" :header="`Add '${product.title}' to listing`" modal
    :style="{ width: '30rem' }">
    <AddListingModal :product="props.product" @modal-closed="showListingModal = false"
      @product-added="$emit('productAdded')" />
  </Dialog>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: 'productAdded'): void
}>()
const props = defineProps<{
  product: Product
}>()

const userStore = useUserStore()
const { toggleAuthModal } = useUiHelpers()

const showListingModal = ref<boolean>(false)
</script>

<style scoped></style>