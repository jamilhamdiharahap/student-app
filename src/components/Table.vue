<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    labels: Array
});

const { labels } = toRefs(props);
</script>

<template>
    <table class="min-w-full bg-white border-gray-300">
        <thead>
            <tr class="text-center">
                <th v-for="(label, index) in labels" :key="index" :class="[
                    'py-3 px-6 font-semibold leading-3 text-sm text-[#252525]',
                    index === 0 ? 'rounded-l-xl' : '',
                    index === labels.length - 1 ? 'rounded-r-xl' : '',
                    'bg-gray-200'
                ]">
                    {{ label }}</th>
            </tr>
        </thead>
        <slot />
    </table>
</template>