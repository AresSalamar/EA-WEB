<!-- File: src/shared/presentation/components/language-switcher.vue -->
<script setup>
import { useI18n } from "vue-i18n";

/**
 * @summary Language switcher component offering EN and ES select buttons.
 * @author John Doe
 */
const { locale, availableLocales } = useI18n();
</script>

<template>
  <div role="region" aria-label="Language selection">
    <pv-select-button
        v-model="locale"
        :options="availableLocales"
        aria-label="Select application language"
    >
      <template #option="slotProps">
        <span class="font-bold">{{ slotProps.option.toUpperCase() }}</span>
      </template>
    </pv-select-button>
  </div>
</template>

<style scoped>
</style>