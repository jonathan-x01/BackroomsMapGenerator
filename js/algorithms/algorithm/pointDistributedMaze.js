class PointDistributedMaze extends Algorithm {
    constructor() {
        super(30, 30);
    }

    /**
     * Generates a wall path from a ditributed point in the map array.
     * @param {any} x The row of distributed point to start from.
     * @param {any} y The column of distributed point to start from.
     */
    pathBuilder(x, y) {
        // For debugging purposes
        let red = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);

        // Assigns the x to x index as well with the y.
        let xIndex = x, yIndex = y;
        let iteration = 0;
        // This will loops forever unless a break keyword is used.
        while (true) {
            let outputWall = null;
            let outputDebug = undefined;
            // The total amount of points to get the randomization process from for the path building direction.
            const totalPoints = 100;
            // The distribution of points for the direction of the path. Any remainding points is used to end the path.
            const up = 30, right = 10, down = 30, left = 10;
            // Get a random number between 0 and the total points.
            let random = Math.floor(Math.random() * totalPoints)

            // The path builder conditions used to generate a path.
            // Is the random number less then up. aka check to see if the up is in the selection
            if (random <= up) {
                // Sets the x index upwards.
                xIndex -= 1;
                outputWall = "up";
                outputDebug = "arrow_up";
                if (this.checkIfOutOfBounds(xIndex, yIndex)) break;
                if (this.isSinglePathBlockedByWall(x + 1, y)) break;
                if (this.isSinglePathBlockedByWall(x + 1, y + 1)) break;
                if (this.isSinglePathBlockedByWall(x + 1, y - 1)) break;
                // Check to see if the right path is selected.
            } else if (random <= up + right) {
                // Sets the y index to go right.
                yIndex += 1;
                outputWall = "right";
                outputDebug = "arrow_right";
                if (this.checkIfOutOfBounds(xIndex, yIndex)) break;
                if (this.isSinglePathBlockedByWall(x, y + 1)) break;
                if (this.isSinglePathBlockedByWall(x + 1, y + 1)) break;
                if (this.isSinglePathBlockedByWall(x - 1, y + 1)) break;
                // Check to see if the down path is selected.
            } else if (random <= up + right + down) {
                // Sets the x index to go downwards.
                xIndex += 1;
                outputWall = "down";
                outputDebug = "arrow_down";
                if (this.checkIfOutOfBounds(xIndex, yIndex)) break;
                if (this.isSinglePathBlockedByWall(x - 1, y)) break;
                if (this.isSinglePathBlockedByWall(x - 1, y + 1)) break;
                if (this.isSinglePathBlockedByWall(x - 1, y - 1)) break;
                // Check to see if the left path is selected
            } else if (random <= up + right + down + left) {
                // Sets the y index to go left.
                yIndex -= 1;
                outputWall = "left";
                outputDebug = "arrow_left";
                if (this.checkIfOutOfBounds(xIndex, yIndex)) break;
                if (this.isSinglePathBlockedByWall(x - 1, y + 1)) break;
                if (this.isSinglePathBlockedByWall(x + 1, y - 1)) break;
                if (this.isSinglePathBlockedByWall(x, y - 1)) break;
                // Check to see if the end path is selected. This is for any points not within range.
            } else {
                // Breaks the loop, stopping the path builder.
                break;
            }
            iteration += 1;
            // Sets the map's x and y to wall.
            //this.map[xIndex][yIndex] = outputWall + rgb + "[" + iteration + "][" + x + "][" + y + "]";
            this.map[xIndex][yIndex] = {
                type: 'wall',
                texture: 'level0_wallpaper',
                debug: {
                    type: 'path_builder',
                    texture: outputDebug,
                    color: `rgb(${red}, ${blue}, ${green})`,
                    direction: outputWall,
                    iteration: iteration,
                    placement: {
                        x: xIndex,
                        y: yIndex
                    },
                    origin: {
                        x: x,
                        y: y
                    }
                }
            }
        }
    }

    generate() {
        this.clearMap();
        // How often the wall will spawn in a space. The higher the number, the rarer the chance of a wall placing.
        let wallChance = 2;
        // Loops through xs.
        for (let x = 0; x < this.map.length; x++) {
            // Gets a random number between 0 and the designated wall chance.
            let randomWallFirst = Math.floor(Math.random() * wallChance);
            // Loops through ys.
            for (let y = 0; y < this.map[x].length; y++) {
                // Gets another random value between 0 and the designated wall chance.
                let randomWallSecond = Math.floor(Math.random() * wallChance);
                // Checks to see if both random values matches.
                if (randomWallFirst == randomWallSecond) {
                    /*console.log(this.isSinglePathBlockedByWall(x - 1, y));
                    console.log(this.isSinglePathBlockedByWall(x, y - 1));
                    console.log(this.isSinglePathBlockedByWall(x - 1, y - 1));
                    console.log(this.isSinglePathBlockedByWall(x - 1, y + 1));
                    console.log("============================");*/
                    if (
                        !(this.isSinglePathBlockedByWall(x - 1, y) ||
                            this.isSinglePathBlockedByWall(x, y - 1) ||
                            this.isSinglePathBlockedByWall(x - 1, y - 1) ||
                            this.isSinglePathBlockedByWall(x - 1, y + 1))
                    ) {
                        // Places a wall.
                        this.map[x][y] = {
                            type: 'wall',
                            texture: 'level0_wallpaper',
                            debug: {
                                texture: 'wall',
                                type: 'point_distribute',
                                placement: {
                                    x: x,
                                    y: y
                                }
                            }
                        }
                        //this.map[a][b] = wall + pointDist;
                        // Creates a wall path.
                        this.pathBuilder(x, y)
                    }
                }
            }
        }
        this.addOuterWall();
        if (isScreenWidthReady()) {
            hideControlBar();
        }
        return this.map;
    }
}