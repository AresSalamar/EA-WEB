// File: src/showroom/domain/model/showroom-section.entity.js
/**
 * @summary Domain entity representing a showroom section in Astara Retail Perú.
 * @author John Doe
 */
export class ShowroomSection {
    /**
     * @param {Object} params - Showroom section attributes.
     * @param {number|string|null} [params.id=null] - Unique section identifier.
     * @param {string} [params.name=''] - Name of the showroom section.
     * @param {string} [params.vehicleCategory=''] - Associated vehicle category identifier from DummyJSON.
     * @param {number} [params.maxCapacity=0] - Maximum vehicle capacity for the section.
     */
    constructor({ id = null, name = '', vehicleCategory = '', maxCapacity = 0 }) {
        this.id = id;
        this.name = name;
        this.vehicleCategory = vehicleCategory;
        this.maxCapacity = Number(maxCapacity);
    }
}