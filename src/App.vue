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
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>

  <footer>
  </footer>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  max-width: 100%;
  overflow: hidden;
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
