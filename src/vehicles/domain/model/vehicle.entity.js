// File: src/vehicles/domain/model/vehicle.entity.js
/**
 * @summary Domain entity representing a vehicle retrieved from the external DummyJSON Vehicles API.
 * @author John Doe
 */
export class Vehicle {
    /**
     * @param {Object} params - Vehicle attributes from DummyJSON.
     * @param {number} [params.id=0] - Unique vehicle identifier (mapped to vehicleId).
     * @param {string} [params.title=''] - Vehicle model title (mapped to vehicleName).
     * @param {string} [params.category=''] - Vehicle category identifier (mapped to vehicleCategoryId).
     * @param {number} [params.price=0] - Vehicle unit price.
     * @param {string} [params.brand=''] - Vehicle brand name.
     * @param {number} [params.stock=0] - Available stock reported by DummyJSON.
     */
    constructor({
                    id = 0,
                    title = '',
                    category = '',
                    price = 0,
                    brand = '',
                    stock = 0
                }) {
        this.id = Number(id);
        this.title = title;
        this.category = category;
        this.price = Number(price);
        this.brand = brand;
        this.stock = Number(stock);
    }
}