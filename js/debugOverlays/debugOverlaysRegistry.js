class DebugOverlaysRegistry extends Registry {
    /**
     * Gets the debug overlay data associated with the given name.
     * @param {string} name The name of the debug overlay to get.
     * @returns {DebugOverlaysData} Returns the debug overlay data associated with the given name.
     */
    getDebugOverlayData(name) {
        return this.get(name);
    }
}