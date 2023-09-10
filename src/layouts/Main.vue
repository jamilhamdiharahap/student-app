<script setup>
import { computed } from "vue"
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import { useRoute } from "vue-router";
import { useStudentStore } from "../stores/student";

const store = useStudentStore();
const getDrawel = computed(() => store.getIsDrawel)

const route = useRoute();

const breadcrumbs = computed(() => {
    return route.meta.title;
});

</script>


<template>
    <div>
        <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#F2F2F2]">
            <Header />
            <Sidebar />
            <div :class="getDrawel ? 'h-full ml-14 mt-20 mb-10 pr-4 pl-2' : 'h-full ml-14 mt-20 mb-10 md:ml-64 pr-4 pl-2'">
                <div class="sticky top-15 z-10 py-2">
                    <div class="flex justify-between">
                        <span class="leading-6 font-bold px-4 py-2">
                            {{ breadcrumbs }}
                        </span>
                        <span class="leading-6 text-xs text-gray-500 font-bold px-4 py-2">
                            Home / {{ breadcrumbs }}
                        </span>
                    </div>
                </div>
                <slot />
            </div>
            <footer :class="getDrawel ? 'ml-14 sticky bottom-0' : 'ml-14 md:ml-64 sticky bottom-0'">
                <div class="flex justify-between px-4 items-end text-xs">
                    <span>
                        Copyright © 2023 <span class="text-blue-600">Yayasan Bumi Damai.</span> All rights reserved.
                    </span>
                    <span>
                        Version 1.0.0
                    </span>
                </div>
            </footer>
        </div>
    </div>
</template>