<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { reactive } from 'vue';
import { quotes } from '../assets/quotes.json'

const quotesTable = reactive(quotes)
</script>

<template>
    <DataTable :value="quotesTable" tableStyle="min-width: 50rem">
        <Column field="emojis" header="emojis"></Column>
        <Column field="quote" header="quote"></Column>
        <Column header="link">
            <template #body="slotProps">
                <Button as="a" :href="slotProps.data" label="&rArr;&nbsp;Lien" link></Button>
            </template>
        </Column>
    </DataTable>
</template>
