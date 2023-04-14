<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated>
      <q-toolbar class="background-dark text-dark">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Afk Arena Abyssal relic sim
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above elevated class="background-dark">
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable v-ripple :to="menuItem.to" active-class="text-positive background-light">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { uniqBy } from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const menuList = computed(() => {
      const items = router.getRoutes().filter(v => v.meta.menu !== undefined).map(v => {
        const menu = v.meta.menu as { label: string, icon: string };
        return { ...menu, to: v.path, name: v.name };
      });
      return uniqBy(items, v => v.name);
    });
    return {
      leftDrawerOpen,
      menuList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
