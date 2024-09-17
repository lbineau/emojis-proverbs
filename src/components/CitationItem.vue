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
  <Panel header="Header" toggleable v-model:collapsed="collapsed">
    <template #toggleicon="{ collapsed }">
      <div class="pi" :class="collapsed ? 'pi-eye-slash' : 'pi-eye'" style="font-size: 1.5rem"></div>
    </template>
    <template #header>
      <h3>
        {{ citation.emojis }}
      </h3>
    </template>
    <blockquote :cite="citation.link">
      {{ citation.quote }}
    </blockquote>
    <Button as="a" :href="citation.link" label="&rArr;&nbsp;En savoir plus" link></Button>
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

h3 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-heading);
  margin-left: auto;
  margin-right: auto;
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
</style>