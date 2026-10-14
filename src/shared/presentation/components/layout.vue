<!-- File: src/shared/presentation/components/layout.vue -->
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";

/**
 * @summary Main application layout containing the Toolbar with Logo.dev integration and collapsible Sidebar.
 * @author John Doe
 */
const { t } = useI18n();
const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const logoUrl = ref(import.meta.env.VITE_LOGO_DEV_URL || 'https://img.logo.dev/astararetail.pe?token=pk_YOUR_TOKEN');

const onLogoError = (event) => {
  event.target.src = 'https://ui-avatars.com/api/?name=Astara&background=ffffff&color=10b981&bold=true&length=6&size=128';
};

const navigationItems = [
  { labelKey: 'sidebar.home', to: '/home', icon: 'pi pi-home' },
  { labelKey: 'sidebar.new-inventory-item', to: '/vehicle/items/new', icon: 'pi pi-plus-circle' }
];
</script>

<template>
  <pv-toast aria-live="polite" />

  <!-- Top Toolbar -->
  <header class="w-full" role="banner">
    <pv-toolbar class="bg-primary text-white border-none border-noround px-4 py-3 shadow-2">
      <template #start>
        <div class="flex align-items-center gap-3">
          <pv-button
              icon="pi pi-bars"
              text
              rounded
              class="text-white"
              aria-label="Toggle navigation sidebar"
              @click="toggleDrawer"
          />
          <pv-image
              :src="logoUrl"
              alt="Astara Retail Perú Logo"
              image-class="h-2rem w-auto bg-white border-round p-1"
              @error="onLogoError"
          />
          <span class="font-bold text-xl text-white">
            {{ t('toolbar.title') }}
          </span>
        </div>
      </template>
    </pv-toolbar>
  </header>

  <!-- Collapsible Sidebar -->
  <pv-drawer
      v-model:visible="drawer"
      :header="t('sidebar.menu')"
      role="navigation"
      aria-label="Main Sidebar Navigation"
  >
    <div class="flex flex-column justify-content-between h-full">
      <!-- Navigation Options -->
      <div class="flex flex-column gap-2 mt-2">
        <router-link
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            custom
            v-slot="{ navigate, isActive }"
        >
          <pv-button
              :label="t(item.labelKey)"
              :icon="item.icon"
              :severity="isActive ? 'primary' : 'secondary'"
              :text="!isActive"
              class="w-full justify-content-start text-left"
              :aria-label="t(item.labelKey)"
              @click="() => { navigate(); drawer = false; }"
          />
        </router-link>
      </div>

      <!-- Language Switcher at Bottom of Sidebar -->
      <div class="pt-3 border-top-1 surface-border flex justify-content-center">
        <language-switcher />
      </div>
    </div>
  </pv-drawer>

  <!-- Main View Container -->
  <main class="p-4 md:p-5" role="main">
    <router-view />
  </main>
</template>

<style scoped>
</style>