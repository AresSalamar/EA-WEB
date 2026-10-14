// File: src/vehicles/infrastructure/vehicles-api.js
import axios from "axios";

const externalApiUrl = import.meta.env.VITE_EXTERNAL_API_URL || 'https://dummyjson.com';
const defaultVehiclesEndpointPath = import.meta.env.VITE_VEHICLES_ENDPOINT_PATH || '/products/category/vehicle';

/**
 * @summary API client for querying the external DummyJSON Vehicles API.
 * @author John Doe
 */
export class VehiclesApi {
    #http;

    /**
     * Initializes the Axios HTTP client with the DummyJSON base URL from environment variables.
     */
    constructor() {
        this.#http = axios.create({
            baseURL: externalApiUrl
        });
    }

    /**
     * Fetches vehicles from the default endpoint (/products/category/vehicle).
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the DummyJSON response.
     */
    getVehicles() {
        return this.#http.get(defaultVehiclesEndpointPath);
    }

    /**
     * Fetches vehicles from DummyJSON matching a specific category identifier.
     * @param {string} categoryId - Category identifier (e.g., 'vehicle').
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the DummyJSON response.
     */
    getVehiclesByCategory(categoryId) {
        if (!categoryId) {
            return this.getVehicles();
        }
        return this.#http.get(`/products/category/${categoryId}`);
    }
}