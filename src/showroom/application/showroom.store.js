// File: src/showroom/application/showroom.store.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { ShowroomApi } from "../infrastructure/showroom-api.js";
import { ShowroomSectionAssembler } from "../infrastructure/showroom-section.assembler.js";
import { VehicleInventoryItemAssembler } from "../infrastructure/vehicle-inventory-item.assembler.js";

const showroomApi = new ShowroomApi();

/**
 * @summary Pinia store orchestrating state and analytical calculations for the Showroom bounded context.
 * @author John Doe
 */
export const useShowroomStore = defineStore('showroom', () => {
    const sections = ref([]);
    const inventoryItems = ref([]);
    const errors = ref([]);

    /**
     * Fetches all showroom sections from the API.
     */
    function fetchSections() {
        showroomApi.getSections()
            .then(response => {
                sections.value = ShowroomSectionAssembler.toEntitiesFromResponse(response);
            })
            .catch(error => {
                errors.value.push(error);
            });
    }

    /**
     * Fetches all vehicle inventory items from the API.
     */
    function fetchInventoryItems() {
        showroomApi.getInventoryItems()
            .then(response => {
                inventoryItems.value = VehicleInventoryItemAssembler.toEntitiesFromResponse(response);
            })
            .catch(error => {
                errors.value.push(error);
            });
    }

    /**
     * Filters inventory items belonging to a specific showroom section using Array.prototype.filter().
     * @param {number|string} sectionId - Section identifier.
     * @returns {Array} Filtered list of VehicleInventoryItem entities.
     */
    function getItemsBySectionId(sectionId) {
        return inventoryItems.value.filter(item => Number(item.sectionId) === Number(sectionId));
    }

    /**
     * Calculates the sum of quantities for all vehicles in a Showroom Section using Array.prototype.reduce().
     * @param {number|string} sectionId - Section identifier.
     * @returns {number} Total vehicles in the section.
     */
    function getTotalVehiclesBySection(sectionId) {
        const itemsInSection = getItemsBySectionId(sectionId);
        return itemsInSection.reduce((sum, item) => sum + Number(item.quantity), 0);
    }

    /**
     * Calculates the available capacity of a section (maxCapacity - totalVehicles).
     * @param {Object} section - ShowroomSection entity.
     * @returns {number} Available capacity.
     */
    function getAvailableCapacityBySection(section) {
        if (!section) return 0;
        const totalVehicles = getTotalVehiclesBySection(section.id);
        return Number(section.maxCapacity) - totalVehicles;
    }

    /**
     * Formats a numeric value using JavaScript Intl.NumberFormat.
     * @param {number} value - Number to format.
     * @returns {string} Formatted number string.
     */
    function formatNumber(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }

    /**
     * Creates a new vehicle inventory item and updates local reactive state.
     * @param {import('../domain/model/vehicle-inventory-item.entity.js').VehicleInventoryItem} itemEntity - Entity to persist.
     * @returns {Promise} Promise resolving to the created entity.
     */
    function addInventoryItem(itemEntity) {
        const resource = VehicleInventoryItemAssembler.toResourceFromEntity(itemEntity);
        return showroomApi.createInventoryItem(resource)
            .then(response => {
                const createdEntity = VehicleInventoryItemAssembler.toEntityFromResource(response.data);
                inventoryItems.value.push(createdEntity);
                return createdEntity;
            })
            .catch(error => {
                errors.value.push(error);
                throw error;
            });
    }

    return {
        sections,
        inventoryItems,
        errors,
        fetchSections,
        fetchInventoryItems,
        getItemsBySectionId,
        getTotalVehiclesBySection,
        getAvailableCapacityBySection,
        formatNumber,
        addInventoryItem
    };
});