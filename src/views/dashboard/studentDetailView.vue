<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStudentStore } from "../../stores/student";
import Alert from '../../components/Alert.vue';


const store = useStudentStore();

const router = useRouter();
const route = useRoute();

const getItemDetail = computed(() => store.getItemDetail);
const getStatus = computed(() => store.getStatus);
const getMessage = computed(() => store.getMessage);
const getAlert = computed(() => store.getIsAlert);

const download = async (filename) => {
    await store.fetchDownload(filename);
}

const closeAlert = () => {
    store.updateAlert(false)
}

onMounted(() => {
    store.fetchStudentDetail(route.query.id)
})
</script>

<template>
    <div class="md:mx-auto max-h-[96vh]">
        <div class="py-4 px-4 min-h-[72vh] bg-white shadow-md rounded-xl">
            <div class="mb-4">
                <button @click="router.push('/student')"
                    class="flex items-center bg-blue-500 bg-base py-1 px-3 rounded-full">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="24" viewBox="0 -960 960 960"
                            width="24">
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </span>
                    <span class="text-xs text-white">Kembali</span>
                </button>
            </div>
            <div class="px-4 flex gap-4 py-8">
                <ul class="space-y-5 text-xs font-light">
                    <li>Nama</li>
                    <li>Nik</li>
                    <li>Tempat Tanggal Lahir</li>
                    <li>Status</li>
                    <li>Dibuat</li>
                </ul>
                <ul class="space-y-5 border-l-4 rounded-l-md px-2 text-xs">
                    <li>{{ getItemDetail.name }}</li>
                    <li>{{ getItemDetail.nik }}</li>
                    <li>{{ getItemDetail.place_date_of_birth }}</li>
                    <li
                        :class="getItemDetail.status == 'active' ? 'bg-green-400 text-white px-2 py-1 rounded-md' : 'bg-red-500 text-white px-2 py-1 rounded-md'">
                        {{ getItemDetail.status }}</li>
                    <li>{{ getItemDetail.created_at }}</li>
                </ul>
            </div>
            <div class="relative px-4 flex space-x-4 flex-wrap py-4">
                <button class="flex bg-[#28a745] bg-base rounded-md py-1 px-3 items-center" @click="download(getItemDetail.birth_certificate)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#FFFFFF" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                    </svg>
                    <span class="text-xs leading-3 text-white">Akte Kelahiran</span>
                </button>
                <button class="flex bg-[#ffc107] bg-base rounded-md py-1 px-3 items-center" @click="download(getItemDetail.family_card)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#FFFFFF" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                    </svg>
                    <span class="text-xs leading-3 text-white">Kartu Keluarga</span>
                </button>
            </div>
        </div>
        <Alert :open="getAlert" :message="getMessage" :responseStatus="getStatus" @close="closeAlert" />
    </div>
</template>