// File: src/showroom/infrastructure/showroom-section.assembler.js
import { ShowroomSection } from "../domain/model/showroom-section.entity.js";

/**
 * @summary Assembler for transforming ShowroomSection API resources to domain entities.
 * @author John Doe
 */
export class ShowroomSectionAssembler {
    /**
     * Converts a raw resource object into a ShowroomSection entity.
     * @param {Object} resource - Raw section object from API.
     * @returns {ShowroomSection} Domain entity instance.
     */
    static toEntityFromResource(resource) {
        return new ShowroomSection({
            id: resource.id,
            name: resource.name,
            vehicleCategory: resource.vehicleCategory || resource.vehicleCategoryId || 'vehicle',
            maxCapacity: resource.maxCapacity
        });
    }

    /**
     * Converts an Axios response into an array of ShowroomSection entities.
     * @param {import('axios').AxiosResponse} response - HTTP response from API.
     * @returns {ShowroomSection[]} List of ShowroomSection entities.
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data) return [];
        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['showroom-sections'] || [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}