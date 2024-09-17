<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { MenuItem } from 'primevue/menuitem';
import { RouterLink } from 'vue-router';

defineProps({
})
const items: MenuItem[] = [{
  route: '/',
  label: 'Random',
  icon: 'pi pi-question-circle'
}, {
  route: '/list',
  label: 'List',
  icon: 'pi pi-list'
}]
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <RouterLink class="p-menubar-item-link" v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </RouterLink>
    </template>
  </Menubar>
</template>

<style>
.router-link-active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>