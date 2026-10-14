<!-- File: src/shared/presentation/views/home.vue -->
<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useShowroomStore } from "../../../showroom/application/showroom.store.js";
import ShowroomSectionSummary from "../../../showroom/presentation/components/showroom-section-summary.vue";

/**
 * @summary Home view displaying welcome message and a two-column grid of Showroom Section Summary cards.
 * @author John Doe
 */
const { t } = useI18n();
const showroomStore = useShowroomStore();

onMounted(() => {
  showroomStore.fetchSections();
  showroomStore.fetchInventoryItems();
});
</script>

<template>
  <section role="region" aria-labelledby="home-title">
    <div class="mb-5">
      <h1 id="home-title" class="text-4xl font-bold text-color m-0 mb-2">
        {{ t('home.title') }}
      </h1>
      <p class="text-xl text-color-secondary m-0">
        {{ t('home.content') }}
      </p>
    </div>

    <div role="region" aria-labelledby="collections-title">
      <h2 id="collections-title" class="text-2xl font-bold text-color mb-4 pb-2 border-bottom-1 surface-border">
        {{ t('home.collections-title') }}
      </h2>

      <!-- Grid list of two Showroom Section Summary components per column -->
      <div class="grid" role="list" aria-label="Showroom sections list">
        <div
            v-for="section in showroomStore.sections"
            :key="section.id"
            class="col-12 md:col-6 p-2"
            role="listitem"
        >
          <showroom-section-summary :section="section" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>