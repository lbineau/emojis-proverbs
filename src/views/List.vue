<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { reactive } from 'vue';
import { quotes } from '../assets/quotes.json'

const quotesTable = reactive(quotes)
</script>

<template>
    <DataTable :value="quotesTable" tableStyle="min-width: 50rem">
        <Column field="emojis" header="Emojis"></Column>
        <Column field="quote" header="Expression"></Column>
        <Column header="Lien">
            <template #body="slotProps">
                <Button as="a" :href="slotProps.data" label="&rArr;&nbsp;En savoir plus" link></Button>
            </template>
        </Column>
    </DataTable>
</template>
