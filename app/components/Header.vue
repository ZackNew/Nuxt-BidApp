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
      </nuxt-link>
    </template>
    <template #end>
      <div v-if="userStore.currentUser" class="flex align-items-center gap-2">
        <Avatar icon="pi pi-user" shape="circle" @click="toggleMenuProfile" aria-haspopup="true"
          aria-controls="overlay_menu" class="bg-primary-100 text-primary-500" />
        <Menu ref="menuProfile" id="overlay_menu" :model="menuProfileItems" :popup="true" />
      </div>
      <div v-else class="flex align-items-center gap-2">
        <Button label="Sign in" outlined @click="toggleAuthModal()" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string,
  icon: string,
  link: string,
}

const { toggleAuthModal, isAuthModal } = useUiHelpers()
const { logout } = useAuth()
const userStore = useUserStore()

const menuProfile = ref();

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    link: '/',
  },
  {
    label: 'My Listings',
    icon: 'pi pi-list',
    link: "/my-listings"
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
    command: () => { logout() },
  },
]);

function toggleMenuProfile(event: any) {
  menuProfile.value.toggle(event);
};
</script>

<style scoped></style>