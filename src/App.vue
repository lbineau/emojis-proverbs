<script setup>
import VHeader from './components/VHeader.vue'
import CitationItem from './components/CitationItem.vue'
import _sample from 'lodash/sample'
import { ref } from 'vue'
import { quotes } from './assets/quotes.json'

const quote = ref(null)

function pickRandomQuote() {
  quote.value = _sample(quotes)
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
    <Button icon="pi pi-question-circle" label="Citation au hasard" @click="pickRandomQuote()" rounded></Button>
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
