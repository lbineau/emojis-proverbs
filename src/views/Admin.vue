<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext'
import CitationItem from '../components/CitationItem.vue'

const toast = useToast()

const emojis = ref('')
const quote = ref('')
const link = ref('')
const loading = ref(false)
const submitted = ref(false)

const isFormValid = computed(() => {
  return emojis.value.trim() && quote.value.trim() && link.value.trim()
})

function resetForm() {
  emojis.value = ''
  quote.value = ''
  link.value = ''
  submitted.value = false
}

const citation = computed(() => ({
  emojis: emojis.value || '🫥',
  quote: quote.value || '…',
  link: link.value || '#'
}))

async function submitForm() {
  if (!isFormValid.value) return

  loading.value = true
  try {
    const response = await fetch('/.netlify/functions/create-pr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emojis: emojis.value.trim(),
        quote: quote.value.trim(),
        link: link.value.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create PR')
    }

    toast.add({
      severity: 'success',
      summary: 'Proposition envoyée !',
      detail: 'Ton expremoji a bien été soumis. Il sera examiné avant d\'être ajouté au site.',
      life: 10000
    })

    submitted.value = true
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible d\'envoyer la proposition. Réessaie dans quelques instants.',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="view-admin">
    <Toast />
    <h1>Proposer un Expremoji</h1>

    <template v-if="submitted">
      <div class="success-message">
        <i class="pi pi-check-circle"></i>
        <p>Merci pour ta proposition ! Elle sera examinée prochainement.</p>
        <Button
          label="Proposer un autre expremoji"
          icon="pi pi-plus"
          @click="resetForm"
          rounded
        />
      </div>
    </template>

    <template v-else>
      <form class="admin-form" @submit.prevent="submitForm">
        <div class="field">
          <label for="emojis">Emojis</label>
          <InputText id="emojis" v-model="emojis" placeholder="🐸💦→🙅🕊️" />
        </div>

        <div class="field">
          <label for="quote">Expression</label>
          <InputText id="quote" v-model="quote" placeholder="La bave du crapaud n'atteint pas la blanche colombe." />
        </div>

        <div class="field">
          <label for="link">Lien (source ou définition)</label>
          <InputText id="link" v-model="link" type="url" placeholder="https://fr.wiktionary.org/wiki/..." />
        </div>

        <Button
          type="submit"
          label="Envoyer la proposition"
          icon="pi pi-send"
          :loading="loading"
          :disabled="!isFormValid"
          rounded
        />
      </form>

      <div class="preview-section">
        <h2>Aperçu</h2>
        <CitationItem :citation="citation" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.view-admin {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  padding: 0 1rem;
  width: 100%;
}

h1 {
  text-align: center;
  font-size: clamp(1.8rem, 4vw + 1rem, 2.6rem);
  margin-bottom: 1.5rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 32rem;
  margin-bottom: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 600;
  font-size: 0.9rem;
}

.field :deep(.p-inputtext) {
  width: 100%;
}

.preview-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.preview-section h2 {
  font-size: 1.4rem;
  font-style: italic;
  opacity: 0.7;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
}

.success-message .pi-check-circle {
  font-size: 3rem;
  color: var(--p-green-400);
}

.success-message p {
  font-size: 1.2rem;
  max-width: 30ch;
  text-wrap: balance;
}
</style>
