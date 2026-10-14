// File: src/showroom/infrastructure/showroom-api.js
import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const sectionsEndpointPath = import.meta.env.VITE_SHOWROOM_SECTIONS_ENDPOINT_PATH || '/showroom-sections';
const inventoryItemsEndpointPath = import.meta.env.VITE_VEHICLE_INVENTORY_ITEMS_ENDPOINT_PATH || '/vehicle-inventory-items';

/**
 * @summary API gateway for the Showroom bounded context interacting with the local Fake API.
 * @author John Doe
 */
export class ShowroomApi extends BaseApi {
    #sectionsEndpoint;
    #inventoryItemsEndpoint;

    /**
     * Initializes endpoints for showroom-sections and vehicle-inventory-items.
     */
    constructor() {
        super();
        this.#sectionsEndpoint = new BaseEndpoint(this, sectionsEndpointPath);
        this.#inventoryItemsEndpoint = new BaseEndpoint(this, inventoryItemsEndpointPath);
    }

    /**
     * Retrieves all showroom sections.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getSections() {
        return this.#sectionsEndpoint.getAll();
    }

    /**
     * Retrieves all vehicle inventory items.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getInventoryItems() {
        return this.#inventoryItemsEndpoint.getAll();
    }

    /**
     * Creates a new vehicle inventory item in the Fake API.
     * @param {Object} resource - Inventory item resource payload.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    createInventoryItem(resource) {
        return this.#inventoryItemsEndpoint.create(resource);
    }
}