<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { reactive } from 'vue';
import { quotes } from '../assets/quotes.json'

const quotesTable = reactive(quotes)
</script>

<template>
    <div class="view-list">
        <DataTable :value="quotesTable" stripedRows>
            <Column field="emojis" header="Emojis" bodyStyle="font-size: 1.7rem"></Column>
            <!--<Column field="quote" header="Expression"></Column>-->
            <Column field="link" header="Lien">
                <template #body="{ data }">
                    <Button as="a" :href="data.link" icon="pi pi-link" :label="data.quote" link></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.view-list {
    max-width: 100%;
}

.p-datatable-table-container {
    padding: 1rem;
}

.view-list {
    max-width: 100%;
}

.p-button {
    --p-button-padding-x: 0;
    --p-button-padding-y: 0;
    --p-button-link-color: white;
    text-decoration: none;
    align-items: baseline;
}

@media (max-width: 640px) {
    .view-list {
        --p-datatable-header-cell-padding: 0.75rem 0.5rem;
        --p-datatable-body-cell-padding: 0.75rem 0.5rem;
    }
}
</style>