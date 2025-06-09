class blockRegistry extends Registry {
    /**
     * Gets the block data associated with the given name.
     * @param {any} name The name of the block get.
     * @returns {BlockData} Returns the block data associated with the given name.
     */
    getBlockData(name) {
        return this.get(name);
    }
}