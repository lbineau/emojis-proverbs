<script setup>
import Menubar from 'primevue/menubar';
import { RouterLink } from 'vue-router';
import { useWebHaptics } from 'web-haptics/vue'

const { trigger } = useWebHaptics()

defineProps({
})
const items = [{
  route: '/',
  label: 'Aléatoire',
  icon: 'pi pi-question-circle'
}, {
  route: '/list',
  label: 'Liste',
  icon: 'pi pi-list'
}]
</script>

<template>
  <Menubar :model="items" breakpoint="0">
    <template #item="{ item }">
      <RouterLink @click="trigger()" class="p-menubar-item-link" v-if="item.route" :to="item.route">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </RouterLink>
    </template>
  </Menubar>
</template>

<style scoped>
.router-link-active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>