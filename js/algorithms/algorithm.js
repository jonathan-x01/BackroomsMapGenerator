class Algorithm {
    constructor(width, height) {
        this.setSize(width, height);
    }

    /**
     * Sets the size of the map array.
     * @param {any} width The width to set the map.
     * @param {any} height The height to set the map.
     */
    setSize(width, height) {
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.map = Array.from({ length: this.height }, () => Array(this.width).fill(0));
    }

    /**
     * Gets the map array.
     * @returns {Array} The map array.
     */
    getMap() {
        return this.map;
    }

    /**
     * Gets the width of the map
     * @returns {number} The width of the map.
     */
    getMapWidth() {
        return this.width;
    }

    /**
     * Gets the height of the map.
     * @returns {number} The height of the map.
     */
    getMapHeight() {
        return this.height;
    }

    /**
     * Clears the map array by resetting it to the original size.
     */
    clearMap() {
        this.setSize(this.width, this.height);
    }

    /**
     * Generates the map array based on the algorithm.
     * This must be implemented in the derived class for it to function.
     */
    generate() {
        throw new Error('Method "generate" must be implemented in the derived class.');
    }

    /**
     * Checks to see if the provided row and column is blocked by a wall.
     * @param {any} x The row of the map array.
     * @param {any} y The column of the map array.
     * @returns Returns true if the row and column is blocked by a wall, otherwise false.
     */
    isSinglePathBlockedByWall(x, y) {
        if (!this.checkIfOutOfBounds(x, y)) {
            if (this.map[x][y].type == "wall") {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks to see if the provided row and column is out of bounds of the map array.
     * @param {any} x The row to test
     * @param {any} y The column to test.
     * @returns Returns true if the row or column is out of bounds, otherwise false.
     */
    checkIfOutOfBounds(x, y) {
        if (x < 0 || x >= this.map.length) {
            return true;
        } else if (y < 0 || this.map[x] === undefined) {
            return true;
        } else if (y >= this.map[x].length) {
            return true;
        }
    }

    /**
     * Creates an outer wall around the map array.
     */
    addOuterWall() {
        let wallWithDebug = {
            type: "wall",
            texture: 'bedrock',
            debug: {
                type: "Border Wall",
                texture: 'border'
            }
        };;
        // Adds a northern wall
        for (let i = 0; i < this.map[0].length; i++) {
            this.map[0][i] = wallWithDebug;
        }

        // Adds a western and eastern wall
        for (let i = 1; i < this.map.length - 1; i++) {
            this.map[i][0] = wallWithDebug;
            this.map[i][this.map[i].length - 1] = wallWithDebug;
        }

        // Adds a southern wall
        for (let i = 0; i < this.map[this.map.length - 1].length; i++) {
            this.map[this.map.length - 1][i] = wallWithDebug;
        }
    }
}