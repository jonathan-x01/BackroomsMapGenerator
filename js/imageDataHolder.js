class ImageDataHolder {
    constructor(imgSrc, path) {
        this.data = {
            src: `imgs/${path + imgSrc}.png`,
        };
    }

    /**
     * Gets the source of the image.
     * @returns {string} The source path of the image.
     */
    getSrc() {
        return this.data.src;
    }
}