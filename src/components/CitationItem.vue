<script setup>
import gsap from 'gsap';
import _toArray from 'lodash/toArray'
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

const emojisTemplate = useTemplateRef('emojis')

const collapsed = ref(true)

const props = defineProps({
  citation: {
    required: true,
    type: Object
  }
})

const animateEmojis = () => {
  gsap.from(emojisTemplate.value.childNodes,
    {
      duration: 0.5, opacity: 0, scale: 5, stagger: 0.15, ease: "circ.out"
    }
  )
}

watch(() => props.citation.emojis, async (newValue, oldValue) => {
  if (oldValue !== newValue) {
    collapsed.value = true
  }
  await nextTick()
  animateEmojis()
})

const emojisSplitted = computed(() => {
  return _toArray(props.citation.emojis).map(item => `<span class='emoji'>${item}</span>`).join('')
})

onMounted(() => animateEmojis())
</script>

<template>
  <Panel header="Header" toggleable v-model:collapsed="collapsed"
    :toggle-button-props="{ ariaLabel: 'Révéler l\'expression', rounded: true }">
    <template #toggleicon="{ collapsed }">
      <div class="pi" :class="collapsed ? 'pi-eye-slash' : 'pi-eye'" style="font-size: 1.5rem"></div>
    </template>
    <template #header>
      <h2 ref="emojis" v-html="emojisSplitted"></h2>
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
  font-size: 2.2rem;
  font-weight: 500;
  margin-left: auto;
  margin-right: auto;
}


@media (min-width: 1024px) {
  h2 {
    /* center the title visally */
    transform: translateX(calc(0.5 * var(--p-button-icon-only-width)));
  }
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

:deep(.emoji) {
  display: inline-block;
}
</style>