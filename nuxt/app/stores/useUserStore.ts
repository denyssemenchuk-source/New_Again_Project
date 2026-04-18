import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State (Ref/Reactive)
  const name = ref('Гість')
  const isLoggedIn = ref(false)
  const loginTime = ref<string | null>(null)

  // Async profile data (Крок 4)
  const profileData = ref<any>(null)
  const isLoading = ref(false)

  // Getters (Computed)
  const welcomeMessage = computed(() => `Вітаємо, ${name.value}!`)

  // Actions (Functions)
  function login(userName: string) {
    name.value = userName
    isLoggedIn.value = true
    loginTime.value = new Date().toLocaleTimeString()
  }

  function logout() {
    name.value = 'Гість'
    isLoggedIn.value = false
    loginTime.value = null
    profileData.value = null
  }

  // Async action for fetching profile (Крок 4)
  async function fetchProfile() {
    isLoading.value = true
    try {
      const response = await $fetch('https://api.github.com/users/octocat')
      profileData.value = response
    } finally {
      isLoading.value = false
    }
  }

  return {
    name,
    isLoggedIn,
    loginTime,
    profileData,
    isLoading,
    welcomeMessage,
    login,
    logout,
    fetchProfile
  }
})
