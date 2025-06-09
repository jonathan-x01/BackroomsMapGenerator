class VisualizeMap {
    /**
     * Constructor for VisualizeMap class.
     * @param {any} map The map array to visualize.
     */
    constructor(algorithm) {
        this.algorithm = algorithm.func;

        this.map = this.algorithm.getMap();
        this.mapHeight = this.algorithm.getMapHeight();
        this.mapWidth = this.algorithm.getMapWidth();

        this.mapContainer = document.getElementsByClassName("map")[0];

        this.currrentBlock = null;
    }

    #setupContainer() {
        this.mapContainer.style.gridTemplateColumns = "repeat(" + this.mapWidth + ", 40px)";
        this.mapContainer.style.gridTemplateRows = "repeat(" + this.mapHeight + ", 40px)";
    }

    #createTexture(parent, className, src) {
        let mapTexture = document.createElement("img");
        mapTexture.classList.add(className);
        mapTexture.src = src;
        parent.appendChild(mapTexture);
        return mapTexture;
    }

    #createBlock(x, y) {
        if (this.currrentBlock !== null) {
            let debug = this.currrentBlock.debug;
            let mapBlock = document.createElement("div");
            mapBlock.classList.add("map-block");
            mapBlock.classList.add("texture-containment-overlay");
            mapBlock.setAttribute("row",x);
            mapBlock.setAttribute("col", y);
            mapBlock.setAttribute("data-debug", JSON.stringify(this.currrentBlock));

            if (this.currrentBlock === 0) {
                mapBlock.classList.add("map-block-empty");
            } else {
                this.#createTexture(mapBlock, "block-texture", blocks.getBlockData(this.currrentBlock.texture).getSrc());
                if (debug !== undefined) {
                    let debugTexture = this.currrentBlock.debug.texture;
                    if (debugTexture !== undefined) {
                        let debugOverlay = this.#createTexture(mapBlock, "block-debug-overlay", debugOverlays.getDebugOverlayData(debugTexture).getSrc());
                        debugOverlay.style.display = "none";
                        debugOverlay.classList.add("block-texture");
                    }
                }
            }
            this.mapContainer.appendChild(mapBlock);
        }
    }

    clear() {
        this.mapContainer.innerHTML = "";
    }

    loopThroughMap(callback) {
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                callback(this.map[x][y], x, y);
            }
        }
    }

    /**
     * Generates the HTML representation of the map.
     */
    generate() {
        this.#setupContainer();
        this.loopThroughMap((block, x, y) => {
            this.currrentBlock = block;
            this.#createBlock(x, y);
        });
    }
}