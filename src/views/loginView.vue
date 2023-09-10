<script setup>
import { reactive, computed } from "vue";
import { useAuthStore } from '../stores/auth.js';
import { useRouter } from 'vue-router';
import Alert from "../components/Alert.vue";

const store = useAuthStore();
const router = useRouter();

const form = reactive({
    email: "",
    password: ""
});

const getLoading = computed(() => store.getLoading);
const getStatus = computed(() => store.getStatus);
const getMessage = computed(() => store.getMessage);
const getAlert = computed(() => store.getIsAlert);

const closeAlert = () => {
    store.updateAlert(false)
}

const login = async () => {
    await store.fetchLogin({ router, payload: form });
    form.email = ""
    form.password = ""
}
</script>


<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-14 lg:px-8">
        <div class="mt-20 sm:mx-auto sm:w-full sm:max-w-sm bg-base px-4 py-8 rounded-md">
            <form class="bg-white" @submit.prevent="login">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 class="text-[#242424] font-bold text-2xl mb-1">Web Arsip Bumi Damai!</h1>
                    <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M172.309-180.001q-30.308 0-51.308-21t-21-51.308v-455.382q0-30.308 21-51.308t51.308-21h615.382q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H172.309ZM480-457.694 160-662.309v410q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h615.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-410L480-457.694ZM480-520l313.846-200H166.154L480-520ZM160-662.309V-720-252.309q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462H160v-422.309Z" />
                    </svg>
                    <input class="pl-2 outline-none border-none w-full" required type="text" placeholder="Email"
                        v-model="form.email" />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M280-415.386q-26.846 0-45.73-18.884-18.884-18.884-18.884-45.73 0-26.846 18.884-45.73 18.884-18.884 45.73-18.884 26.846 0 45.73 18.884 18.884 18.884 18.884 45.73 0 26.846-18.884 45.73-18.884 18.884-45.73 18.884Zm0 155.385q-91.538 0-155.768-64.231-64.23-64.23-64.23-155.768t64.23-155.768q64.23-64.231 155.768-64.231 64.307 0 116.307 33.193 52 33.192 79.384 86.807h360.078L935.767-480 781.923-326.925l-74.23-55.769-76.154 56.538-78.076-53.845h-77.772q-27.384 53.23-79.384 86.615T280-260.001ZM280-320q57.539 0 99.654-34.769 42.115-34.77 54.961-85.231h137.694l57.615 39.846 78.154-57.153L776-405.385 850.616-480l-40-40H434.615q-12.846-50.461-54.961-85.231Q337.539-640 280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                    </svg>
                    <input class="pl-2 outline-none border-none w-full" required type="password" placeholder="Password"
                        v-model="form.password" />
                </div>
                <button type="submit" class="block w-full bg-[#55b1df] mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
                    <span
                        :class="getLoading ? 'h-6 w-6 block ml-[50%] justify-center rounded-full border-4 border-t-[#55b1df] animate-spin' : 'text-white text-sm leading-6'">
                        {{ getLoading ? '' : 'Login' }}
                    </span>
                </button>
            </form>
        </div>
    </div>
    <Alert :open="getAlert" :message="getMessage"
        :responseStatus="getStatus" @close="closeAlert" />
</template>