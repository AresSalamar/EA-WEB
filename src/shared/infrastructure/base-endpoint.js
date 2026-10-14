// File: src/shared/infrastructure/base-endpoint.js
/**
 * @summary Reusable endpoint client with CRUD operations.
 * @author John Doe
 */
export class BaseEndpoint {
    /**
     * @param {import('./base-api.js').BaseApi} baseApi - BaseApi instance.
     * @param {string} endpointPath - Relative endpoint path.
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    /**
     * Retrieves all resources from the endpoint.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getAll() {
        return this.http.get(this.endpointPath);
    }

    /**
     * Retrieves a single resource by its identifier.
     * @param {number|string} id - Resource identifier.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getById(id) {
        return this.http.get(`${this.endpointPath}/${id}`);
    }

    /**
     * Creates a new resource via POST.
     * @param {Object} resource - Payload to persist.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    create(resource) {
        return this.http.post(this.endpointPath, resource);
    }

    /**
     * Updates an existing resource by its identifier via PUT.
     * @param {number|string} id - Resource identifier.
     * @param {Object} resource - Updated payload.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    update(id, resource) {
        return this.http.put(`${this.endpointPath}/${id}`, resource);
    }

    /**
     * Deletes a resource by its identifier.
     * @param {number|string} id - Resource identifier.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    delete(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }
}