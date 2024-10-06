<template>
  <Menubar class="text-sm">
    <template #start>
      <nuxt-link to="/">
        <div class="flex gap-2 items-center mr-10 cursor-pointer">
          <img src="/images/Bid_logo.svg" alt="logo" class="w-14">
          <h2 class="text-2xl font-black text-primary-500">AFRI BID</h2>
        </div>
      </nuxt-link>
      <nuxt-link v-ripple class="flex items-center mx-4" to="/">
        <span class="pi pi-home" />
        <span class="ml-2">Home</span>
      </nuxt-link>
      <nuxt-link v-if="userStore.currentUser" v-ripple class="flex items-center" to="/my-listings">
        <span class="pi pi-list " />
        <span class="ml-2"> My listing </span>
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
  show: boolean
}

const { toggleAuthModal, isAuthModal } = useUiHelpers()
const { logout } = useAuth()
const userStore = useUserStore()

const isUser = computed<boolean>(() => !!userStore.currentUser)

const menuProfile = ref();

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    show: true,
    link: '/',
  },
  {
    label: 'My Listings',
    icon: 'pi pi-list',
    show: isUser.value,
    link: "/my-listings"
  },
  {
    label: 'My bids',
    icon: 'pi pi-hammer',
    show: isUser.value,
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