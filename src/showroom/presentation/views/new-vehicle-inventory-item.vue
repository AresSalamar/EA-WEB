<!-- File: src/showroom/presentation/views/new-vehicle-inventory-item.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { useShowroomStore } from "../../application/showroom.store.js";
import { useVehiclesStore } from "../../../vehicles/application/vehicles.store.js";
import { VehicleInventoryItem } from "../../domain/model/vehicle-inventory-item.entity.js";

/**
 * @summary View presenting a form to register a new Vehicle Inventory Item with section category lookup and capacity validation.
 * @author John Doe
 */
const { t } = useI18n();
const toast = useToast();
const router = useRouter();

const showroomStore = useShowroomStore();
const vehiclesStore = useVehiclesStore();

const formData = ref({
  sectionId: null,
  vehicleId: null,
  quantity: 1
});

onMounted(() => {
  showroomStore.fetchSections();
  showroomStore.fetchInventoryItems();
  vehiclesStore.fetchVehicles();
});

const selectedSection = computed(() => {
  return showroomStore.sections.find(s => Number(s.id) === Number(formData.value.sectionId)) || null;
});

const availableCapacity = computed(() => {
  if (!selectedSection.value) return 0;
  return showroomStore.getAvailableCapacityBySection(selectedSection.value);
});

const availableVehiclesForSection = computed(() => {
  if (!selectedSection.value) return [];
  return vehiclesStore.getVehiclesByCategory(selectedSection.value.vehicleCategory);
});

const onSectionChange = () => {
  formData.value.vehicleId = null;
  if (selectedSection.value && selectedSection.value.vehicleCategory) {
    vehiclesStore.fetchVehiclesByCategory(selectedSection.value.vehicleCategory);
  }
};

const isQuantityValid = computed(() => {
  if (!selectedSection.value) return false;
  return formData.value.quantity > 0 && formData.value.quantity <= availableCapacity.value;
});

const createItem = async () => {
  if (!selectedSection.value || !formData.value.vehicleId) return;

  if (!isQuantityValid.value) {
    toast.add({
      severity: 'warn',
      summary: t('errors.occurred'),
      detail: t('inventory-form.capacity-exceeded', { available: availableCapacity.value }),
      life: 4000
    });
    return;
  }

  const selectedVehicle = availableVehiclesForSection.value.find(
      v => Number(v.id) === Number(formData.value.vehicleId)
  );
  if (!selectedVehicle) return;

  const newItem = new VehicleInventoryItem({
    sectionId: Number(selectedSection.value.id),
    vehicleCategoryId: selectedVehicle.category,
    vehicleId: Number(selectedVehicle.id),
    vehicleName: selectedVehicle.title,
    quantity: Number(formData.value.quantity),
    registeredAt: new Date().toISOString()
  });

  try {
    await showroomStore.addInventoryItem(newItem);
    toast.add({
      severity: 'success',
      summary: t('inventory-form.create'),
      detail: t('inventory-form.success-message'),
      life: 3000
    });
    router.push('/home');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: error.message || t('errors.occurred'),
      life: 3000
    });
  }
};

const cancel = () => {
  router.push('/home');
};
</script>

<template>
  <section class="max-w-30rem mx-auto" role="region" aria-labelledby="new-item-title">
    <div class="mb-4 text-center">
      <h1 id="new-item-title" class="text-3xl font-bold text-color m-0 mb-2">
        {{ t('inventory-form.title') }}
      </h1>
      <p class="text-color-secondary m-0">
        {{ t('inventory-form.subtitle') }}
      </p>
    </div>

    <pv-card class="shadow-2">
      <template #content>
        <form @submit.prevent="createItem" class="flex flex-column gap-4" aria-label="New Vehicle Inventory Item Form">
          <!-- Showroom Section Selection -->
          <div class="flex flex-column gap-2">
            <label for="section-select" class="font-semibold">{{ t('inventory-form.section') }}</label>
            <pv-select
                id="section-select"
                v-model="formData.sectionId"
                :options="showroomStore.sections"
                optionLabel="name"
                optionValue="id"
                :placeholder="t('inventory-form.select-section')"
                class="w-full"
                aria-required="true"
                @change="onSectionChange"
            />
            <small v-if="selectedSection" class="text-primary font-medium">
              {{ t('showroom-section.available-capacity') }}: {{ showroomStore.formatNumber(availableCapacity) }}
            </small>
          </div>

          <!-- Vehicle Selection (loaded from DummyJSON by section category) -->
          <div class="flex flex-column gap-2">
            <label for="vehicle-select" class="font-semibold">{{ t('inventory-form.vehicle') }}</label>
            <pv-select
                id="vehicle-select"
                v-model="formData.vehicleId"
                :options="availableVehiclesForSection"
                optionLabel="title"
                optionValue="id"
                :disabled="!selectedSection"
                :placeholder="t('inventory-form.select-vehicle')"
                class="w-full"
                aria-required="true"
            />
          </div>

          <!-- Quantity Input -->
          <div class="flex flex-column gap-2">
            <label for="quantity-input" class="font-semibold">{{ t('inventory-form.quantity') }}</label>
            <pv-input-number
                id="quantity-input"
                v-model="formData.quantity"
                showButtons
                :min="1"
                class="w-full"
                aria-required="true"
            />
            <small
                v-if="selectedSection && formData.quantity > availableCapacity"
                class="text-red-500 font-medium"
                role="alert"
            >
              {{ t('inventory-form.capacity-exceeded', { available: availableCapacity }) }}
            </small>
          </div>

          <!-- Actions: Create and Cancel -->
          <div class="flex gap-3 mt-2">
            <pv-button
                type="submit"
                :label="t('inventory-form.create')"
                icon="pi pi-check"
                class="flex-1"
                :disabled="!selectedSection || !formData.vehicleId || !isQuantityValid"
                aria-label="Create Vehicle Inventory Item"
            />
            <pv-button
                type="button"
                :label="t('inventory-form.cancel')"
                icon="pi pi-times"
                severity="secondary"
                class="flex-1"
                aria-label="Cancel and return Home"
                @click="cancel"
            />
          </div>
        </form>
      </template>
    </pv-card>
  </section>
</template>

<style scoped>
</style>