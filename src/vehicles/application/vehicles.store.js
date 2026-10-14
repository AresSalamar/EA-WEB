// File: src/vehicles/application/vehicles.store.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { VehiclesApi } from "../infrastructure/vehicles-api.js";
import { VehicleAssembler } from "../infrastructure/vehicle.assembler.js";

const vehiclesApi = new VehiclesApi();

/**
 * @summary Pinia store for managing external vehicle catalog data from the DummyJSON API.
 * @author John Doe
 */
export const useVehiclesStore = defineStore('vehicles', () => {
    const vehicles = ref([]);
    const errors = ref([]);

    /**
     * Loads vehicles from the default DummyJSON vehicle category endpoint.
     */
    function fetchVehicles() {
        vehiclesApi.getVehicles()
            .then(response => {
                vehicles.value = VehicleAssembler.toEntitiesFromResponse(response);
            })
            .catch(error => {
                errors.value.push(error);
            });
    }

    /**
     * Loads vehicles from DummyJSON for a specific category associated with a Showroom Section.
     * @param {string} categoryId - Category identifier from the selected ShowroomSection.
     */
    function fetchVehiclesByCategory(categoryId) {
        vehiclesApi.getVehiclesByCategory(categoryId)
            .then(response => {
                const fetched = VehicleAssembler.toEntitiesFromResponse(response);
                if (fetched.length > 0) {
                    vehicles.value = fetched;
                }
            })
            .catch(error => {
                errors.value.push(error);
            });
    }

    /**
     * Filters loaded vehicles matching a given category using Array.prototype.filter().
     * @param {string} categoryId - Category identifier.
     * @returns {Array} Filtered list of Vehicle entities.
     */
    function getVehiclesByCategory(categoryId) {
        if (!categoryId) return vehicles.value;
        const filtered = vehicles.value.filter(
            vehicle => vehicle.category.toLowerCase() === String(categoryId).toLowerCase()
        );
        return filtered.length > 0 ? filtered : vehicles.value;
    }

    return {
        vehicles,
        errors,
        fetchVehicles,
        fetchVehiclesByCategory,
        getVehiclesByCategory
    };
});