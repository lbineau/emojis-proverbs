<script setup>
import VHeader from './components/VHeader.vue'
import CitationItem from './components/CitationItem.vue'
import _sample from 'lodash/sample'
import _head from 'lodash/head'
import { ref } from 'vue'
import { quotes } from './assets/quotes.json'
import { useHead } from '@unhead/vue'

const quote = ref(null)

const faviconEmojis = [
  '🍔',
  '😀',
  '🙅🏻‍♀️',
  '🐛',
  '🎛',
  '🤯',
  '🎯',
  '📕',
  '🎨',
  '🏆',
  '👀',
  '🔥',
  '📦',
  '🌴',
  '😑',
  '👻',
  '👋',
  '🐭',
  '🥨',
]

function pickRandomQuote() {
  quote.value = _sample(quotes)
  const emojiFavicon = _sample(faviconEmojis)
  useHead({
    link: {
      rel: 'icon',
      href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emojiFavicon}</text></svg>`
    }
  })
}

pickRandomQuote()
</script>

<template>
  <header>
    <div class="wrapper">
      <VHeader />
    </div>
  </header>

  <main>
    <CitationItem :citation="quote" :ref="quote.emojis" v-if="quote" />
  </main>

  <footer>
    <Button icon="pi pi-question-circle" label="Proverbe au hasard" @click="pickRandomQuote()" rounded></Button>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 1rem;
  text-align: center;
}

.p-button {
  font-style: italic;
}
</style>
