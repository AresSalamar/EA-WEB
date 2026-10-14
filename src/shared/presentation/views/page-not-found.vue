<!-- File: src/shared/presentation/views/page-not-found.vue -->
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

/**
 * @summary View displayed when navigating to an unsupported route, showing the invalid path and a button to return Home.
 * @author John Doe
 */
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const unavailableRoute = route.fullPath;

const navigateHome = () => {
  router.push('/home');
};
</script>

<template>
  <section
      class="flex flex-column align-items-center justify-content-center p-5 text-center"
      role="region"
      aria-labelledby="not-found-title"
  >
    <pv-card class="w-full max-w-30rem shadow-2">
      <template #header>
        <div class="pt-4">
          <i class="pi pi-exclamation-triangle text-6xl text-orange-500" aria-hidden="true"></i>
        </div>
      </template>
      <template #title>
        <h1 id="not-found-title" class="text-3xl font-bold m-0">
          {{ t('page-not-found.title') }}
        </h1>
      </template>
      <template #content>
        <p class="text-color-secondary line-height-3 m-0">
          {{ t('page-not-found.content', { 'unavailable-route': unavailableRoute }) }}
        </p>
      </template>
      <template #footer>
        <pv-button
            :label="t('page-not-found.go-home')"
            icon="pi pi-home"
            aria-label="Return to Home"
            @click="navigateHome"
        />
      </template>
    </pv-card>
  </section>
</template>

<style scoped>
</style>