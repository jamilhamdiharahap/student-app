<script setup>
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import { useStudentStore } from "../stores/student";

const store = useStudentStore();
const getDrawel = computed(() => store.getIsDrawel)

const router = useRoute();

function isActive(route) {
    return router.path === route;
}

const menuItems = ref([
    {
        path: "/dashboard",
        label: "dashboard",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M530.001-600v-219.999h289.998V-600H530.001Zm-390 139.999v-359.998h289.998v359.998H140.001Zm390 320v-359.998h289.998v359.998H530.001Zm-390 0V-360h289.998v219.999H140.001ZM200-520h170.001v-240H200v240Zm389.999 320H760v-240H589.999v240Zm0-459.999H760V-760H589.999v100.001ZM200-200h170.001v-100.001H200V-200Zm170.001-320Zm219.998-139.999Zm0 219.999ZM370.001-300.001Z"/></svg>'
    },
    {
        path: "/student",
        label: "santri",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-166.157-259.999-141.23v-216.922L81.541-600 480-816.921 878.458-600v287.69H818.46v-254.46l-78.461 42.461v216.922L480-166.157ZM480-452l273.615-148L480-748 206.385-600 480-452Zm0 217.537 200-108v-149.846L480-383.15 280-492.309v149.846l200 108ZM480-452Zm0 72.306Zm0 0Z"/></svg>'
    },
])
</script>

<template>
    <div :class="getDrawel ? 'fixed flex flex-col top-14 left-0 bg-[#FFFFFF] opacity-1 w-14 hover:w-64  shadow-xl h-full transition-all duration-300 border-none z-10 sidebar' : 'fixed flex flex-col top-14 left-0 bg-[#FFFFFF] opacity-1 w-14 hover:w-64 md:w-64 shadow-xl  h-full transition-all duration-300 border-none z-10 sidebar'">
        <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul class="flex flex-col py-4 space-y-1">
                <li :class="getDrawel ? 'px-2': 'px-5'" class="hidden md:block">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-400 uppercase text-left">Main</div>
                    </div>
                </li>
                <li v-for="item in menuItems" class="rounded-md"
                    :class="{ 'text-[#252525] bg-[#F2F2F2]': isActive(item.path) }">
                    <router-link :to="item.path"
                        class="relative flex flex-row items-center h-11 focus:outline-none text-white-600 border-l-4 border-transparent pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <div v-html="item.icon"></div>
                        </span>
                        <span class="ml-2 md:text-xs sm:text-md tracking-wide truncate">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>