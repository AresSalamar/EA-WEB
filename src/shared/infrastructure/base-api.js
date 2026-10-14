// File: src/shared/infrastructure/base-api.js
import axios from "axios";

/**
 * @summary Shared infrastructure base class configuring the HTTP client for json-server.
 * @author John Doe
 */
export class BaseApi {
    #http;

    /**
     * Initializes the Axios instance using VITE_LEARNING_PLATFORM_API_URL.
     */
    constructor() {
        const rawUrl = import.meta.env.VITE_LEARNING_PLATFORM_API_URL || 'http://localhost:3000';
        const baseURL = rawUrl.replace(/\/api\/v1\/?$/, '');

        this.#http = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Returns the configured Axios HTTP instance.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }
}