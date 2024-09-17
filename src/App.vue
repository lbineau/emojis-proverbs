<script setup>
import VHeader from './components/VHeader.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <VHeader />
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
  </footer>
</template>

<style scoped>
header {
  position: fixed;
  top: 1rem;
}

main {
  padding-top: 6rem;
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
