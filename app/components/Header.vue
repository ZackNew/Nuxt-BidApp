<template>
  <Menubar :model="items" class="text-sm">
    <template #start>
      <div class="flex gap-2 items-center mr-10">
        <img src="/images/Bid_logo.svg" alt="logo" class="w-14">
        <h2 class="text-2xl font-black text-primary-500">BID HERE</h2>
      </div>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <nuxt-link v-ripple class="flex items-center" v-bind="props.action" :to="item.link">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
          }}</span>
        <i v-if="hasSubmenu"
          :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </nuxt-link>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Avatar icon="pi pi-user" shape="circle" @click="toggleMenuProfile" aria-haspopup="true"
          aria-controls="overlay_menu" class="bg-primary-100 text-primary-500" />
        <Menu ref="menuProfile" id="overlay_menu" :model="menuProfileItems" :popup="true" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string,
  icon: string,
  link: string
}

const menuProfile = ref();

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    link: '/#'
  },
  {
    label: 'My Listings',
    icon: 'pi pi-list',
    link: "/#"
  },
  {
    label: 'My bids',
    icon: 'pi pi-hammer',
    link: "/#"
  },
]);

const menuProfileItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => { },
  },
  {
    label: 'Log out',
    icon: 'pi pi-cog',
    command: () => { },
  },
]);

function toggleMenuProfile(event: any) {
  menuProfile.value.toggle(event);
};
</script>

<style scoped></style>