// File: src/vehicles/infrastructure/vehicle.assembler.js
import { Vehicle } from "../domain/model/vehicle.entity.js";

/**
 * @summary Assembler for transforming DummyJSON vehicle product resources into Vehicle domain entities.
 * @author John Doe
 */
export class VehicleAssembler {
    /**
     * Maps a raw product resource object from DummyJSON to a Vehicle domain entity.
     * @param {Object} resource - Product object from DummyJSON API.
     * @returns {Vehicle} Vehicle domain entity instance.
     */
    static toEntityFromResource(resource) {
        return new Vehicle({
            id: resource.id,
            title: resource.title,
            category: resource.category,
            price: resource.price || 0,
            brand: resource.brand || '',
            stock: resource.stock || 0
        });
    }

    /**
     * Maps an Axios HTTP response from DummyJSON into an array of Vehicle domain entities.
     * @param {import('axios').AxiosResponse} response - HTTP response containing { products: [...] }.
     * @returns {Vehicle[]} List of Vehicle domain entities.
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data.products)) {
            return [];
        }
        return response.data.products.map(resource => this.toEntityFromResource(resource));
    }
}