// File: src/showroom/infrastructure/vehicle-inventory-item.assembler.js
import { VehicleInventoryItem } from "../domain/model/vehicle-inventory-item.entity.js";

/**
 * @summary Assembler for transforming VehicleInventoryItem resources and domain entities.
 * @author John Doe
 */
export class VehicleInventoryItemAssembler {
    /**
     * Maps a raw API resource into a VehicleInventoryItem domain entity.
     * @param {Object} resource - Raw inventory item payload.
     * @returns {VehicleInventoryItem} Domain entity.
     */
    static toEntityFromResource(resource) {
        return new VehicleInventoryItem({
            id: resource.id,
            sectionId: Number(resource.sectionId),
            vehicleCategoryId: resource.vehicleCategoryId,
            vehicleId: Number(resource.vehicleId),
            vehicleName: resource.vehicleName,
            quantity: Number(resource.quantity),
            registeredAt: resource.registeredAt
        });
    }

    /**
     * Maps an Axios response into a collection of VehicleInventoryItem domain entities.
     * @param {import('axios').AxiosResponse} response - HTTP response.
     * @returns {VehicleInventoryItem[]} Array of domain entities.
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data) return [];
        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['vehicle-inventory-items'] || [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

    /**
     * Maps a VehicleInventoryItem entity to a plain resource payload for creation.
     * @param {VehicleInventoryItem} entity - Domain entity to persist.
     * @returns {Object} Plain DTO resource.
     */
    static toResourceFromEntity(entity) {
        return {
            sectionId: Number(entity.sectionId),
            vehicleCategoryId: entity.vehicleCategoryId,
            vehicleId: Number(entity.vehicleId),
            vehicleName: entity.vehicleName,
            quantity: Number(entity.quantity),
            registeredAt: entity.registeredAt
        };
    }
}