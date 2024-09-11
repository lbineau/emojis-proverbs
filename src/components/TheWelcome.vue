<script setup>
import WelcomeItem from './WelcomeItem.vue'
defineProps({
  citation: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <WelcomeItem>
    <template #heading>{{ citation.emojis }}</template>
    <blockquote :cite="citation.link">
      {{ citation.quote }}
    </blockquote>
    <Button as="a" :href="citation.link" label="Lien" link></Button>
  </WelcomeItem>
</template>

<style scoped>
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