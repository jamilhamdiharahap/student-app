<script setup>
import { ref, onMounted, computed, reactive, watch } from "vue";
import Table from "../../components/Table.vue";
import Modal from "../../components/Modal.vue";
import { useStudentStore } from "../../stores/student";
import { useRouter } from "vue-router";
import Pagination from '../../components/Pagination.vue';
import Alert from '../../components/Alert.vue';

const labels = ref([
    "No",
    "Nama",
    "NIK",
    "TTL",
    "Status",
    "Action"
]);

const pageIn = ref(1);
const name = ref("");

const payload = reactive({
    name: "",
    place_date_of_birth: "",
    nik: "",
    status: "",
    birth_certificate: "",
    family_card: ""
});

const open = ref(false)
const deleteOpen = ref(false)
const updateOpen = ref(false)
const deleteTitle = reactive({
    name: "",
    id: ""
})

const store = useStudentStore();
const router = useRouter();


const getItems = computed(() => store.getItems)
const pages = computed(() => Math.ceil(row.value / 5));
const row = computed(() => store.getCountRow);
const getLoading = computed(() => store.getLoading);
const getStatus = computed(() => store.getStatus);
const getMessage = computed(() => store.getMessage);
const getAlert = computed(() => store.getIsAlert);
const getItemDetail = computed(() => store.getItemDetail);

const getStudent = async () => {
    await store.fetchStudent({ page: pageIn.value, name: name.value })
}

const pageChange = (page) => {
    pageIn.value = page;
    getStudent()
};

const modalCreate = () => {
    open.value = true;
}

const updateId = ref("");

const modalUpdate = (params) => {
    updateOpen.value = true
    updateId.value = params.id
    store.fetchStudentDetail(params.id)
    payload.name = getItemDetail.value.name
    payload.place_date_of_birth = getItemDetail.value.place_date_of_birth
    payload.family_card = getItemDetail.value.family_card
    payload.birth_certificate = getItemDetail.value.birth_certificate
    payload.status = getItemDetail.value.status
    payload.nik = getItemDetail.value.nik
}

const update = () => {
    store.fetchUpdateStudent(payload, updateId.value);
    getStudent();
    closeUpdate();
}

const closeUpdate = () => {
    updateOpen.value = false;
    payload.name = ""
    payload.place_date_of_birth = ""
    payload.nik = ""
    payload.status = ""
    payload.birth_certificate = ""
    payload.family_card = ""
}

const closeCreate = () => {
    open.value = false;
    payload.name = ""
    payload.place_date_of_birth = ""
    payload.nik = ""
    payload.status = ""
    payload.birth_certificate = ""
    payload.family_card = ""
}

const createSantri = async () => {
    await store.fetchCreateStudent(payload);
    getStudent();
    closeCreate();
}

const handleFileUpload = (event) => {
    payload.family_card = event.target.files[0];
}

const handleFileAKte = (event) => {
    payload.birth_certificate = event.target.files[0];
}

const modalDelete = (params) => {
    deleteTitle.name = params.name
    deleteTitle.id = params.id

    deleteOpen.value = true;
}

const closeDelete = () => {
    deleteOpen.value = false;
}

const detailStudent = (id) => {
    router.push({ path: '/student-detail', query: { id } });
}

const removeStudent = async () => {
    await store.fetchDeleteStudent(deleteTitle.id);
    getStudent();
    closeDelete();
}

const handleSearch = () => {
    pageIn.value = 1
    getStudent()
}

const closeAlert = () => {
    store.updateAlert(false)
}

watch(name, (value) => {
    if (value == "") {
        getStudent()
    }
});

onMounted(() => {
    getStudent();
})
</script>

<template>
    <div class="md:mx-auto max-h-[96vh]">
        <div class="py-8 px-4 min-h-[72vh] bg-white shadow-md rounded-xl">
            <div class="py-4 flex sm:justify-between justify-start items-center px-4">
                <div>
                    <button @click="modalCreate"
                        class="flex items-center justify-end rounded-full px-3 py-1 text-white gap-1 bg-base bg-[#0097B1]">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#FFFFFF" viewBox="0 -960 960 960"
                                width="24">
                                <path
                                    d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.615q-49.5 0-84.75-35.25T240-624.615q0-49.501 35.25-84.751 35.25-35.25 84.75-35.25t84.75 35.25Q480-674.116 480-624.615q0 49.5-35.25 84.75T360-504.615ZM80-215.384v-65.847Q80-306 94.423-327.577q14.423-21.577 38.808-33.5 56.615-27.154 113.307-40.731Q303.231-415.385 360-415.385q56.769 0 113.462 13.577 56.692 13.577 113.307 40.731 24.385 11.923 38.808 33.5Q640-306 640-281.231v65.847H80Zm40-40.001h480v-25.846q0-13.307-8.577-25-8.577-11.692-23.731-19.769-49.384-23.923-101.836-36.654Q413.405-375.385 360-375.385q-53.405 0-105.856 12.731Q201.692-349.923 152.308-326q-15.154 8.077-23.731 19.769-8.577 11.693-8.577 25v25.846Zm240-289.23q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.23Z" />
                            </svg>
                        </span>
                        <span class="text-xs">
                            Tambah
                        </span>
                    </button>
                </div>
                <div class="relative">
                    <input type="text" v-model="name"
                        class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-[#1da2b2] transition-colors"
                        placeholder="Search...">
                    <button @click="handleSearch"
                        class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-[#1da2b2] transition-colors">
                        <svg fill="#1da2b2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto h-auto relative p-4 rounded-md">
                <Table :labels="labels">
                    <tbody class="divide-y divide-gray-300">
                        <tr v-for="(item, index) in getItems" :key="index" class="text-center">
                            <td class="py-2 px-6 text-xs">{{ index + 1 + (pageIn - 1) * 5 }}</td>
                            <td class="py-2 px-6 text-xs">{{ item.name }}</td>
                            <td class="py-2 px-6 text-xs">{{ item.nik }}</td>
                            <td class="py-2 px-6 text-xs">{{ item.place_date_of_birth }}</td>
                            <td class="py-2 px-6 text-xs">{{ item.status }}</td>
                            <td class="py-2 px-8 text-xs space-x-3">
                                <button @click="detailStudent(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#28a745" height="24"
                                        viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                    </svg>
                                </button>
                                <button @click="modalUpdate(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffc107" height="24"
                                        viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M206.154-200h49.461l370.387-370.386-49.461-49.462-370.387 370.387V-200Zm548.152-413.77L619.309-747.537l52.154-52.153q17.615-17.615 42.845-17.615t42.845 17.615l48.692 48.691q17.615 17.615 18.23 42.23.615 24.615-17 42.23l-52.769 52.769Zm-43.383 43.999-429.77 429.77H146.156v-134.998l429.769-429.77 134.998 134.998Zm-109.844-25.538-24.538-24.539 49.461 49.462-24.923-24.923Z" />
                                    </svg>
                                </button>
                                <button @click="modalDelete(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#dc3545" height="24"
                                        viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-40v-59.999H360v-35.384h240v35.384h179.999V-720h-40v507.691q0 30.308-21 51.308t-51.308 21H292.309ZM680-720H280v507.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h375.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-720ZM376.155-280h59.999v-360h-59.999v360Zm147.691 0h59.999v-360h-59.999v360ZM280-720v520-520Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div class="py-8 px-4">
                    <Pagination :totalPages="pages" :totalData="row" :currentPage="pageIn" :pageSize="5"
                        @pageChange="pageChange" />
                </div>
            </div>
        </div>
        <Modal :open="open" @close="closeCreate">
            <div class="flex">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="m547.692-267.692-28.307-28.77L682.923-460H200v-40h482.923L519.385-663.538l28.307-28.77L760-480 547.692-267.692Z" />
                    </svg>
                </span>
                <h1 class="text-sm leading-6 text-[#3F3F44]">Tambah Data Santri</h1>
            </div>
            <form @submit.prevent="createSantri" class="py-8">
                <div class="md:grid grid-cols-2 flex-wrap space-y-4 md:space-y-0 md:gap-4 gap-1 mb-4 py-4">
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input v-model="payload.name" type="text" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Nama Lengkap
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text" v-model="payload.place_date_of_birth" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Tempat Tanggal Lahir
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text" v-model="payload.nik" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            NIK
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text" v-model="payload.status" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Status Keaktifan
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <div class="space-x-3">
                            <label for="" class="text-xs font-semibold">Kartu Keluarga</label>
                            <span class="font-light text-xs">jpg,png,pdf (max:1mb)</span>
                        </div>
                        <input type="file" v-on:change="handleFileUpload"
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2">
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <div class="space-x-3">
                            <label for="" class="text-xs font-semibold">Akte Kelahiran</label>
                            <span class="font-light text-xs">jpg,png,pdf (max:1mb)</span>
                        </div>
                        <input type="file" v-on:change="handleFileAKte"
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2">
                    </div>
                </div>
                <button :disabled="payload.family_card?.length <= 0 || payload.birth_certificate?.length <= 0" type="submit" class="bg-base bg-[#45CFDD] flex items-center rounded-md px-2 gap-1 ml-auto py-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                            fill="#FFFFFF">
                            <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </svg>
                    </span>
                    <span
                        :class="getLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#45CFDD] animate-spin' : 'text-white text-md leading-6'">
                        {{ getLoading ? '' : 'New' }}
                    </span>
                </button>
            </form>
        </Modal>
        <Modal :open="updateOpen" @close="closeUpdate">
            <div class="flex">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="m547.692-267.692-28.307-28.77L682.923-460H200v-40h482.923L519.385-663.538l28.307-28.77L760-480 547.692-267.692Z" />
                    </svg>
                </span>
                <h1 class="text-sm leading-6 text-[#3F3F44]">Tambah Data Santri</h1>
            </div>
            <form @submit.prevent="update" class="py-8">
                <div class="md:grid grid-cols-2 flex-wrap space-y-4 md:space-y-0 md:gap-4 gap-1 mb-4 py-4">
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input v-model="payload.name" type="text" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Nama Lengkap
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text"  v-model="payload.place_date_of_birth" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Tempat Tanggal Lahir
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text" v-model="payload.nik" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            NIK
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <input type="text" v-model="payload.status" required
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2196F3] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            class="font-bold text-[#6B6B6B] before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2196F3] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#2196F3] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#2196F3] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Status Keaktifan
                        </label>
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <div class="space-x-3">
                            <label for="" class="text-xs font-semibold">Kartu Keluarga</label>
                            <span class="font-light text-xs">jpg,png,pdf (max:1mb)</span>
                        </div>
                        <input type="file" v-on:change="handleFileUpload"
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2">
                    </div>
                    <div class="relative h-10 w-auto min-w-[250px]">
                        <div class="space-x-3">
                            <label for="" class="text-xs font-semibold">Akte Kelahiran</label>
                            <span class="font-light text-xs">jpg,png,pdf (max:1mb)</span>
                        </div>
                        <input type="file" v-on:change="handleFileAKte"
                            class="peer h-full w-full rounded-md border border-[#8C999A] bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2">
                    </div>
                </div>
                <button :disabled="payload.family_card?.length <= 0 || payload.birth_certificate?.length <= 0" type="submit" class="bg-base bg-[#45CFDD] flex items-center rounded-md px-2 gap-1 ml-auto py-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                            fill="#FFFFFF">
                            <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </svg>
                    </span>
                    <span
                        :class="getLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#45CFDD] animate-spin' : 'text-white text-md leading-6'">
                        {{ getLoading ? '' : 'Save' }}
                    </span>
                </button>
            </form>
        </Modal>
        <Modal :open="deleteOpen" @close="closeDelete">
            <div class="flex text-center py-4 space-y-4">
                <h1 class="text-sm leading-6 text-[#3F3F44] m-auto">Apakah anda ingin menghapus data {{ deleteTitle.name
                }} ?
                </h1>
            </div>
            <div class="flex items-end flex-wrap justify-center gap-4">
                <button @click="removeStudent" class="bg-base bg-[#DF2E38] py-1 px-4 rounded-md">
                    <div class="flex items-center gap-2 text-gray-500">
                        <span
                            :class="getLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#F15A59] animate-spin' : 'text-white text-md leading-6'">
                            {{ getLoading ? '' : 'Ok' }}
                        </span>
                    </div>
                </button>
                <button @click="closeDelete"
                    class="border border-[#8C999A] py-1 px-4 rounded-md text-[#000000] leading-6 text-md">Cancel</button>
            </div>
        </Modal>
    </div>
    <Alert :open="getAlert" :message="getMessage" :responseStatus="getStatus" @close="closeAlert" />
</template>