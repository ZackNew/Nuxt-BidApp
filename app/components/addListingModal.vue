<template>
  <div>
    <div class="mt-6">
      <FloatLabel>
        <Textarea v-model="description" rows="5" cols="40" />
        <label>Writea description about the product</label>
      </FloatLabel>
    </div>
    <div class="mt-6">
      <FloatLabel>
        <InputNumber v-model="initialPrice" prefix="ETB " locale="en-US" class="w-full" />
        <label>Initial Price</label>
      </FloatLabel>
    </div>

    <div class="flex justify-end gap-2 mt-8">
      <Button type="button" label="Cancel" severity="secondary" @click="$emit('modalClosed')"></Button>
      <Button type="button" label="Add" @click="addProductToListing()" :disabled="!canHitActionButton"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: 'modalClosed'): void
}>()
const props = defineProps<{
  product: Product
}>()

const { addToListing } = useListing()

const description = ref<string>('')
const initialPrice = ref<number | null>(null)

const canHitActionButton = computed(() => {
  return !!(description.value && initialPrice.value !== null && initialPrice.value >= 0)
})

async function addProductToListing() {
  if (initialPrice.value !== null) {
    await addToListing(description.value, initialPrice.value, props.product)
  }
}
</script>

<style scoped></style>