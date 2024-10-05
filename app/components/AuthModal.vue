<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="isAuthModal" modal :header="isSignin ? 'Sign in' : 'Create an account'"
      :style="{ width: '25rem' }">
      <div class="mt-6 flex flex-col gap-6">
        <div>
          <FloatLabel>
            <InputText id="username" class="w-full" v-model="userInfo.username"
              @focusout="!isSignin && (inputErrors.username = validateUsername(userInfo.username))" />
            <label for="username">Username</label>
          </FloatLabel>
          <p class="text-xs text-red-500">
            {{ inputErrors.username }}
          </p>
        </div>
        <div>
          <FloatLabel>
            <InputText id="password" type="password" class="w-full" v-model="userInfo.password"
              @focusout="!isSignin && (inputErrors.password = validatePassword(userInfo.password))" />
            <label for="password">Password</label>
          </FloatLabel>
          <p class="text-xs text-red-500">
            {{ inputErrors.password }}
          </p>
        </div>
        <div>
          <FloatLabel v-if="!isSignin">
            <InputText id="confirm-password" type="password" class="w-full" v-model="userInfo.confimPassword"
              @focusout="!isSignin && (inputErrors.confimPassword = validateConfirmPassword(userInfo.password, userInfo.confimPassword))" />
            <label for="confirm-password">Confirm password</label>
          </FloatLabel>
          <p class="text-xs text-red-500">
            {{ inputErrors.confimPassword }}
          </p>
        </div>
      </div>
      <p class="text-xs text-red-500">{{ error }}</p>
      <p v-if="isSignin" class="text-sm font-semibold text-gray-500 text-center my-4">Dont have an account? <span
          class="text-primary-500 cursor-pointer" @click="clearForm(); isSignin = false">register</span></p>
      <p v-else class="text-sm font-semibold text-gray-500 text-center my-4">Already have an account? <span
          class="text-primary-500 cursor-pointer" @click="clearForm(); isSignin = true">sign in</span></p>

      <div class="flex justify-end gap-2 mt-8">
        <Button type="button" label="Cancel" severity="secondary" @click="toggleAuthModal()"></Button>
        <Button v-if="isSignin" type="button" label="Sign in" @click="loginUser()"
          :disabled="!canHitActionButton"></Button>
        <Button v-else type="button" label="Register" @click="registerUser()" :disabled="!canHitActionButton"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const { isAuthModal, toggleAuthModal } = useUiHelpers()
const { register, login, error } = useAuth()

const isSignin = ref<boolean>(true)
const userInfo = reactive({
  username: '',
  password: '',
  confimPassword: ''
})
const inputErrors = reactive({
  username: '',
  password: '',
  confimPassword: ''
})

const canHitActionButton = computed<boolean>(() => {
  if (isSignin.value) {
    return !!(userInfo.username && userInfo.password);
  } else {
    return !!(userInfo.username && userInfo.password && userInfo.confimPassword && !inputErrors.username && !inputErrors.password && !inputErrors.confimPassword);
  }
});

function clearForm() {
  userInfo.username = ''
  userInfo.password = ''
  userInfo.confimPassword = ''
  inputErrors.username = ''
  inputErrors.password = ''
  inputErrors.confimPassword = ''
}

async function registerUser() {
  try {
    await register(userInfo.username, userInfo.password)
    clearForm()
    isSignin.value = true
  } catch (error) { }
}

async function loginUser() {
  try {
    await login(userInfo.username, userInfo.password)
    clearForm()
    isSignin.value = true
  } catch (error) { }
}

</script>

<style scoped></style>