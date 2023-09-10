import { defineStore } from 'pinia'
import { getStudent, postStudent, deleteStudent, getStudentDetail, getDownload, updateStudent } from '../service/studentService.js';

export const useStudentStore = defineStore('santri', {
  state: () => ({
    items: [],
    itemDetail: [],
    row: 0,
    drawel: false,
    isLoading: false,
    isAlert: false,
    message: null,
    responseStatus: null
  }),

  actions: {
    async fetchStudent(params) {
      const { data, status, count_rows } = await getStudent(params);
      if (status == 2000) {
        this.items = data
        this.row = count_rows
      }
    },

    async fetchStudentDetail(paramId) {
      const { data, status } = await getStudentDetail(paramId);
      if (status == 2000) {
        this.itemDetail = data
      }
    },

    async fetchDownload(filename) {
      const data = await getDownload(filename);
      if (data.response?.status == 404) {
        setTimeout(() => {
          this.message = "File Not Found"
          this.responseStatus = 4004
          this.updateAlert(true)
          setTimeout(() => {
            this.updateAlert(false)
          }, 3000)
        }, 100)
      }
    },

    async fetchCreateStudent(payload) {
      this.isLoading = true
      const { status, message } = await postStudent(payload);
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
      }
    },

    async fetchUpdateStudent(payload, id) {
      this.isLoading = true
      const { status, message } = await updateStudent(payload, id);
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
      }
    },

    async fetchDeleteStudent(paramsId) {
      this.isLoading = true;
      const { data, status, message } = await deleteStudent(paramsId);
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
      }
    },

    updateAlert(status) {
      this.isAlert = status
    },

    updateDrawel() {
      this.drawel = !this.drawel
    },
  },

  getters: {
    getItems: (state) => state.items,
    getItemDetail: (state) => state.itemDetail,
    getCountRow: (state) => state.row,
    getLoading: (state) => state.isLoading,
    getMessage: (state) => state.message,
    getStatus: (state) => state.responseStatus,
    getIsAlert: (state) => state.isAlert,
    getIsDrawel: (state) => state.drawel,
  },
})
