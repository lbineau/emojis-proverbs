<script setup>
import { ref, watch } from 'vue';

const collapsed = ref(true)

const props = defineProps({
  citation: {
    required: true,
    type: Object
  }
})

watch(() => props.citation.emojis, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    collapsed.value = true
  }
})
</script>

<template>
  <Panel header="Header" toggleable v-model:collapsed="collapsed"
    :toggle-button-props="{ ariaLabel: 'Révéler l\'expression', rounded: true }">
    <template #toggleicon="{ collapsed }">
      <div class="pi" :class="collapsed ? 'pi-eye-slash' : 'pi-eye'" style="font-size: 1.5rem"></div>
    </template>
    <template #header>
      <h2>
        {{ citation.emojis }}
      </h2>
    </template>
    <blockquote :cite="citation.link">
      {{ citation.quote }}
    </blockquote>
    <Button as="a" :href="citation.link" label="En savoir plus" icon="pi pi-external-link" link></Button>
  </Panel>
</template>

<style scoped>
.p-panel {
  width: 100%;
  max-width: 100%;
  text-align: left;
}

.p-panel-toggleable :deep(.p-panel-header) {
  padding: 1rem;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-heading);
  margin-left: auto;
  margin-right: auto;
  /* center the title visally */
  transform: translateX(calc(0.5 * var(--p-button-icon-only-width)));
}

blockquote {
  font-size: 1.5rem;
  margin-bottom: 0.5em;
  font-style: italic;
  background-color: #333;
  padding: 1rem;
  border-radius: 0.5rem;
}

blockquote::before {
  content: '“';
}

blockquote::after {
  content: '”';
}

/* style link */
.p-button-link {
  text-decoration: none;
}

.p-button-link:not(:disabled) :deep(.p-button-label) {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 0.4em;
}
</style>