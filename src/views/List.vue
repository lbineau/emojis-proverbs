<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { reactive } from 'vue';
import { quotes } from '../assets/quotes.json'

const quotesTable = reactive(quotes)
</script>

<template>
    <div class="view-list">
        <DataTable :value="quotesTable">
            <Column field="emojis" header="Emojis" bodyStyle="width: 30%;max-width:150px"></Column>
            <Column field="quote" header="Expression">
                <template #body="{ data }">
                    <Button as="a" :href="data.link" :label="data.quote" link></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.view-list {
    max-width: 100%;
    --p-button-padding-x: 0;
    --p-button-padding-y: 0;
}
</style>