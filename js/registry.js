class Registry {
    constructor() {
        this._registry = [];
    }

    /**
     * The data to register.
     * @param {string} identifier The identifier for the data to register. Must be all lowercase and spaces replaced with '_'.
     * @param {object} data The data to assign with the identifier.
     */
    register(identifier, data) {
        if (this._registry[identifier]) {
            throw new Error(`Name "${identifier}" is already registered.`);
        }
        this._registry[identifier] = data;
    }

    /**
     * Get the data from the registry
     * @param {string} identifier The identifier to check for in the registry.
     * @returns Returns the data that is registered with the identifier.
     */
    get(identifier) {
        if (!this._registry[identifier]) {
            throw new Error(`Name "${identifier}" is not registered.`);
        }
        return this._registry[identifier];
    }

    /**
     * Loops through the registry and calls the callback function with each identifier and data.
     * @param {object} callback The callback function to call for each identifier and data in the registry.
     */
    forEach(callback) {
        for (const identifier in this._registry) {
            if (this._registry.hasOwnProperty(identifier)) {
                callback(identifier, this._registry[identifier]);
            }
        }
    }
}