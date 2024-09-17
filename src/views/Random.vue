<script setup>
import CitationItem from '../components/CitationItem.vue'

import _shuffle from 'lodash/shuffle'
import { useCycleList } from '@vueuse/core'
import { quotes } from '../assets/quotes.json'
import { favicons } from '../assets/favicons.json'
import { useHead } from '@unhead/vue'

const { state: quote, next: nextQuote } = useCycleList(_shuffle(quotes))
const { state: emojiFavicon, next: nextFavicon } = useCycleList(_shuffle(favicons))

function pickRandomQuote() {
    nextQuote()
    nextFavicon()
    useHead({
        link: {
            key: 'icon',
            rel: 'icon',
            href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emojiFavicon.value}</text></svg>`
        }
    })
}
</script>

<template>
    <div class="view-random">
        <h1>Quelle expression représente ces emojis?</h1>
        <CitationItem :citation="quote" :ref="quote.emojis" v-if="quote" />
        <Teleport to="footer">
            <Button class="btn-random" icon="pi pi-question-circle" label="Expression au hasard"
                @click="pickRandomQuote" rounded></Button>
        </Teleport>
    </div>
</template>

<style scoped>
.view-random {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50rem;
    padding: 0 1rem;
}

h1 {
    text-align: center;
    font-style: italic;
    font-size: 2.6rem;
    font-size: clamp(2rem, 4vw + 1rem, 3rem);
    max-inline-size: 50ch;
    text-wrap: balance;
    margin-bottom: 1.5rem;
}

.btn-random {
    --p-button-label-font-weight: bold;
    font-style: italic;
}
</style>
