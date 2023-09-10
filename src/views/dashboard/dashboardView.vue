<script setup>
import { computed, onMounted } from "vue"
import { useStudentStore } from "../../stores/student";

const store = useStudentStore();
const getItems = computed(() => store.getItems)


onMounted(async () => {
    await store.fetchStudent({ page: 1, name: "" })
})
</script>

<template>
    <div class="md:mx-auto max-h-[96vh]">
        <div class="py-8 px-4 min-h-[72vh]">
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-[#17a2b8] shadow-sm flex items-center justify-between py-4 rounded-md">
                    <span class="px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="48" viewBox="0 -960 960 960" width="48">
                            <path
                                d="M120-120v-76l60-60v136h-60Zm165 0v-236l60-60v296h-60Zm165 0v-296l60 61v235h-60Zm165 0v-235l60-60v295h-60Zm165 0v-396l60-60v456h-60ZM120-356v-85l280-278 160 160 280-281v85L560-474 400-634 120-356Z" />
                        </svg>
                        <span>Data Santri</span>
                    </span>
                    <span class="px-4 text-3xl">{{ getItems.length + 1 }}</span>
                </div>
                <div class="bg-[#28a745] shadow-sm flex items-center justify-between py-4 rounded-md">
                    <span class="px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="48" viewBox="0 -960 960 960" width="48">
                            <path
                                d="M684-381q-39.48 0-66.74-27.26Q590-435.52 590-475q0-39.48 27.26-66.74Q644.52-569 684-569q39.48 0 66.74 27.26Q778-514.48 778-475q0 39.48-27.26 66.74Q723.48-381 684-381ZM488-160v-51q0-26 11-44.5t31-28.5q37-19 75-28t79-9q41 0 79 8.5t75 28.5q20 9 31 28t11 45v51H488Zm-88-321q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm0-150ZM80-160v-94q0-34 17-62.5t50.667-43.5Q215-390 276.5-405t123.245-15Q432-420 457-417t54 9l-25.5 25.5L460-357q-13-2-28-2.5t-32-.5q-56.627 0-110.814 11.5Q235-337 172-306q-14 7-23 22t-9 30v34h288v60H80Zm348-60Zm-28-321q39 0 64.5-25.5T490-631q0-39-25.5-64.5T400-721q-39 0-64.5 25.5T310-631q0 39 25.5 64.5T400-541Z" />
                        </svg>
                        <span>User</span>
                    </span>
                    <span class="px-4 text-3xl">1</span>
                </div>
            </div>
        </div>
    </div>
</template>