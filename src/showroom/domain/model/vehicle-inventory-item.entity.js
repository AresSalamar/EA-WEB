// File: src/showroom/domain/model/vehicle-inventory-item.entity.js
/**
 * @summary Domain entity representing a vehicle inventory item assigned to a showroom section.
 * @author John Doe
 */
export class VehicleInventoryItem {
    /**
     * @param {Object} params - Vehicle inventory item attributes.
     * @param {number|string|null} [params.id=null] - Unique inventory item identifier.
     * @param {number|string} [params.sectionId=''] - Associated showroom section identifier.
     * @param {string} [params.vehicleCategoryId=''] - Vehicle category identifier from DummyJSON.
     * @param {number|string} [params.vehicleId=''] - Vehicle identifier from DummyJSON.
     * @param {string} [params.vehicleName=''] - Vehicle title/name from DummyJSON.
     * @param {number} [params.quantity=0] - Quantity of vehicles in this lot.
     * @param {string} [params.registeredAt=''] - ISO timestamp when the item was registered.
     */
    constructor({
                    id = null,
                    sectionId = '',
                    vehicleCategoryId = '',
                    vehicleId = '',
                    vehicleName = '',
                    quantity = 0,
                    registeredAt = ''
                }) {
        this.id = id;
        this.sectionId = Number(sectionId);
        this.vehicleCategoryId = vehicleCategoryId;
        this.vehicleId = Number(vehicleId);
        this.vehicleName = vehicleName;
        this.quantity = Number(quantity);
        this.registeredAt = registeredAt;
    }
}