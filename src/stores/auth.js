import { defineStore } from 'pinia'
import { login } from '../service/userService.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    items: [],
    isLoading: false,
    isAlert: false,
    message: null,
    responseStatus: null
  }),

  actions: {

    updateAlert(status) {
      this.isAlert = status
    },

    async fetchLogin({ router, payload }) {
      this.isLoading = true
      const { data, token, status, message } = await login(payload)
      if (status == 2000) {
        setTimeout(() => {
          this.isLoading = false
          this.message = message
          this.responseStatus = status
          this.updateAlert(true)
          setTimeout(() => {
            this.updateAlert(false)
          }, 3000)
        }, 100)
        localStorage.setItem('token', token)
        localStorage.setItem('auth', true)
        router.push("/dashboard")
      } else {
        setTimeout(() => {
          this.isLoading = false
          this.message = message
          this.responseStatus = status
          this.updateAlert(true)
          setTimeout(() => {
            this.updateAlert(false)
          }, 3000)
        }, 100)
        router.push("/login")
      }
    },
  },

  getters: {
    getLoading: (state) => state.isLoading,
    getMessage: (state) => state.message,
    getStatus: (state) => state.responseStatus,
    getIsAlert: (state) => state.isAlert,
  },
})
