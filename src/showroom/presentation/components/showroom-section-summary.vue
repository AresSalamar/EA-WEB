<!-- File: src/showroom/presentation/components/showroom-section-summary.vue -->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useShowroomStore } from "../../application/showroom.store.js";

/**
 * @summary Card component displaying a Showroom Section's name in header, vehicle items (or "No Vehicles") in content, and Total Vehicles & Available Capacity in footer.
 * @author John Doe
 */
const props = defineProps({
  section: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();
const showroomStore = useShowroomStore();

const sectionItems = computed(() => {
  return showroomStore.getItemsBySectionId(props.section.id);
});

const totalVehicles = computed(() => {
  return showroomStore.getTotalVehiclesBySection(props.section.id);
});

const availableCapacity = computed(() => {
  return showroomStore.getAvailableCapacityBySection(props.section);
});
</script>

<template>
  <pv-card class="h-full shadow-2 flex flex-column justify-content-between" role="article" :aria-label="section.name">
    <!-- Header: Showroom Section Name -->
    <template #header>
      <div class="bg-primary text-white p-3 border-round-top flex align-items-center justify-content-between">
        <span class="text-xl font-bold">{{ section.name }}</span>
        <pv-tag severity="secondary" :value="section.vehicleCategory" />
      </div>
    </template>

    <!-- Content: Each vehicle's name and quantity, or "No Vehicles" if empty -->
    <template #content>
      <div v-if="sectionItems.length > 0" class="flex flex-column gap-2" role="list">
        <div
            v-for="item in sectionItems"
            :key="item.id"
            class="flex justify-content-between align-items-center p-2 surface-100 border-round"
            role="listitem"
        >
          <span class="font-medium text-color">{{ item.vehicleName }}</span>
          <pv-tag
              severity="info"
              :value="`${t('showroom-section.quantity')}: ${showroomStore.formatNumber(item.quantity)}`"
          />
        </div>
      </div>
      <div v-else class="p-3 text-center text-color-secondary font-italic">
        {{ t('showroom-section.no-vehicles') }}
      </div>
    </template>

    <!-- Footer: Total Vehicles and Available Capacity -->
    <template #footer>
      <div class="pt-3 border-top-1 surface-border flex justify-content-between align-items-center text-sm font-semibold">
        <div>
          <span class="text-color-secondary mr-1">{{ t('showroom-section.total-vehicles') }}:</span>
          <span class="text-color font-bold">{{ showroomStore.formatNumber(totalVehicles) }}</span>
        </div>
        <div>
          <span class="text-color-secondary mr-1">{{ t('showroom-section.available-capacity') }}:</span>
          <span class="text-primary font-bold">{{ showroomStore.formatNumber(availableCapacity) }}</span>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
</style>