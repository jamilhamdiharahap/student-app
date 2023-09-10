<template>
    <div class="paginations flex items-center justify-between">
        <span class="text-xs leading-6 font-normal">
            Total : {{ isNaN(totalData) ? 0 : totalData }} Rows
        </span>
        <ul class="pagination">
            <li class="pagination-item">
                <button class="btn pagination-content" type="button" :disabled="isInFirstPage" @click="previousPage">
                    <img src="../assets/left.svg" alt="iconrow" />
                </button>
            </li>
            <li v-for="page in pages" :key="page.name" class="pagination-item" :class="{ active: isPageActive(page.name) }">
                <button class="btn pagination-content" type="button" @click="onClickPage(page.name)"
                    :disabled="page.isDisabled">
                    {{ page.name }}
                </button>
            </li>
            <li class="pagination-item">
                <button class="btn pagination-content" type="button" @click="nextPage" :disabled="isInLastPage">
                    <img src="../assets/right.svg" alt="iconrow" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';

const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        default: 4,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
    totalData: {
        type: Number,
        required: true,
    }
});

const { maxVisibleButtons, totalPages, currentPage, totalData } = toRefs(props)

const emit = defineEmits(["pageChange"]);

const StartPage = () => {
    return currentPage.value === 1 ? 1 : currentPage.value - 1;
};

const calculatePageRange = () => {
    const range = [];
    const endPage = Math.min(StartPage() + maxVisibleButtons.value - 1, totalPages.value);

    for (let i = StartPage(); i <= endPage; i++) {
        range.push({
            name: i,
            isDisabled: i === currentPage.value,
        });
    }

    return range;
};

const pages = computed(calculatePageRange);

const isInFirstPage = computed(() => currentPage.value === 1);
const isInLastPage = computed(() => currentPage.value === totalPages.value);

const previousPage = () => {
    emit("pageChange", currentPage.value - 1);
};

const onClickPage = (page) => {
    emit("pageChange", page);
};

const nextPage = () => {
    emit("pageChange", currentPage.value + 1);
};

const isPageActive = (page) => currentPage.value === page;
</script>

<style scoped>
.paginations>span {
    font-weight: bold;
    margin-right: 40px;
    display: flex;
    align-items: center;
}

.pagination {
    list-style-type: none;
    margin: 0 !important;
    display: flex;
}

.btn {
    border: none;
    padding: 0;
    font-size: 0.6rem;
    font-weight: bold;
}

.pagination-item {
    display: inline-block;
    margin-right: 3px;
    width: 2vw;
    height: 2vw;
    display: flex;
    align-content: center;
    justify-content: center;
    color: #252525;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #7aeafb;
}

.pagination-item.startEnd {
    width: 3vw;
    height: 2vw;
}

.pagination-item:hover {
    color: #252525;
    border-color: #1da2b2;
}

.btn {
    border: none;
}

.pagination-content {
    color: #ccc;
    width: 2vw;
    height: 2vw;
}

.pagination-content:hover {
    color: #252525;
    border-color: #1da2b2;
}

.active {
    border-radius: 10px;
    color: #252525;
    background-color: #1da2b2;
    border-color: #fff;
}
</style>
