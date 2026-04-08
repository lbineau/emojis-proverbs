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

const isFormValid = computed(() => {
  return emojis.value.trim() && quote.value.trim() && link.value.trim()
})

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
      summary: 'PR créée !',
      detail: `Pull request créée avec succès : ${data.url}`,
      life: 10000
    })

    emojis.value = ''
    quote.value = ''
    link.value = ''
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: error.message || 'Une erreur est survenue',
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
    <h1>Backoffice Expremojis</h1>

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
        <label for="link">Lien</label>
        <InputText id="link" v-model="link" type="url" placeholder="https://fr.wiktionary.org/wiki/..." />
      </div>

      <Button
        type="submit"
        label="Créer la Pull Request"
        icon="pi pi-github"
        :loading="loading"
        :disabled="!isFormValid"
        rounded
      />
    </form>

    <div class="preview-section">
      <h2>Aperçu</h2>
      <CitationItem :citation="citation" />
    </div>
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
</style>
