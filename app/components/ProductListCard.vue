<template>
  <div>
    <div
      class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 flex flex-col rounded-lg bg-white">
      <div class="bg-surface-50 flex justify-center rounded p-4">
        <div class="relative mx-auto">
          <img class="rounded w-full h-48 object-contain" :src="product.product?.image" :alt="product.product.title"
            style="max-width: 300px" />
        </div>
      </div>
      <div class="pt-6">
        <p class="text-gray-500 text-sm"> <span class="text-indigo-600 font-bold">{{ product.bidCount }}</span> bids
        </p>
        <div class="text-sm font-medium mt-1 h-20">{{ product.product.title }}</div>
      </div>
      <Button icon="pi pi-hammer" label="Set a bid" size="small" class="w-full"
        @click="userStore.currentUser ? showBidModal = true : toggleAuthModal()" />
    </div>

    <!-- Bid modal -->
    <Dialog v-model:visible="showBidModal" :header="`Add '${product.product.title}' to listing`" modal
      :style="{ width: '60rem' }">
      <SetBitModal :product="product" @modal-closed="showBidModal = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: Listing
}>()

const userStore = useUserStore()
const { toggleAuthModal } = useUiHelpers()

const showBidModal = ref<boolean>(false)

</script>

<style scoped></style>