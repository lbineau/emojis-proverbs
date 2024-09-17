<script setup>
import CitationItem from '../components/CitationItem.vue'

import _sample from 'lodash/sample'
import { ref } from 'vue'
import { quotes } from '../assets/quotes.json'
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
            key: 'icon',
            rel: 'icon',
            href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emojiFavicon}</text></svg>`
        }
    })
}

pickRandomQuote()
</script>

<template>
    <div class="view-random">
        <h1>Quel proverbe représente ces emojis?</h1>
        <CitationItem :citation="quote" :ref="quote.emojis" v-if="quote" />
        <Teleport to="footer">
            <Button icon="pi pi-question-circle" label="Proverbe au hasard" @click="pickRandomQuote" rounded></Button>
        </Teleport>
    </div>
</template>

<style scoped>
.view-random {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50rem;
}

h1 {
    font-style: italic;
    font-size: 2.6rem;
    max-inline-size: 50ch;
    text-wrap: balance;
    margin-bottom: 1.5rem;
}
</style>
