const blocks = new blockRegistry();
blocks.register('bedrock', new BlockData('bedrock_512'));
blocks.register('level0_wallpaper', new BlockData('level_0_wallpaper_512'));
blocks.register('level1_stone', new BlockData('stone'));
/* Register any blocks you have created here. */

const debugOverlays = new DebugOverlaysRegistry();
debugOverlays.register('arrow_down', new DebugOverlaysData('arrow-down'));
debugOverlays.register('arrow_up', new DebugOverlaysData('arrow-up'));
debugOverlays.register('arrow_left', new DebugOverlaysData('arrow-left'));
debugOverlays.register('arrow_right', new DebugOverlaysData('arrow-right'));
debugOverlays.register('border', new DebugOverlaysData('Border-label'));
debugOverlays.register('wall', new DebugOverlaysData('Wall-label'));
/* You shouldn't register anymore as these aren't fully implemented yet. */

const algorithms = new AlgorithmRegistry();
algorithms.register('point_distribution_maze', new AlgorithmData( 'Point Distribution Maze', new PointDistributedMaze() ));
/* Register any algorithms you have created here. */
/* Remember, don't forget to import them in the index.html on the bottom
of the body. I placed comments to show where you should import them. */


/* DO NOT EDIT ANY CODE BELOW!!! Unless you know what you are doing. */
const algorithmSel = document.getElementById("algorithm-select");
const widthInput = document.querySelector("input[name=width]");
const heightInput = document.querySelector("input[name=height]");
let general = document.getElementById("GENERAL");
let pathBuilder = document.getElementById("PATH_BUILDER");

// This code will generate the algorithm select dropdown menu with the algorithms registered in the AlgorithmRegistry.
algorithms.forEach(function (name, algorithm) {
    let option = document.createElement("option");
    option.setAttribute("value", name);
    option.innerHTML = algorithm.name;
    algorithmSel.appendChild(option);
});

// This function returns the selected algorithm from the dropdown menu.
function getSelectedAlgorithm() {
    return algorithms.get(algorithmSel.value);
}

function overlayImageDebug(elmnt, overlaySrc) {
    for (let i = 0; i < overlaySrc.length; i++) {
        const debugType = document.querySelectorAll(`[src="${debugOverlays.getDebugOverlayData(overlaySrc[i]).getSrc()}"]`);
        if (elmnt.checked) {
            debugType.forEach((value, i) => {
                const parent = value.parentElement;
                const debugData = JSON.parse(parent.getAttribute("data-debug"));
                if (debugData !== null) {
                    let color = debugData.debug.color || "white";
                    value.style.background = color;
                    value.style.opacity = "0.7";
                }
                value.style.display = "block";
            });
        } else {
            debugType.forEach((value, i) => {
                const parent = value.parentElement;
                parent.style.background = "";
                value.style.display = "none";
            });
        }
    }
}

function generateDebugDetails(element, data) {
    let typeP = document.getElementById("TYPE");
    let subtypeP = document.getElementById("SUBTYPE");
    let rowP = document.getElementById("ROW");
    let colP = document.getElementById("COLUMN");

    let origin = document.getElementById("ORIGIN");
    let direction = document.getElementById("DIRECTION");
    let iteration = document.getElementById("ITERATION");
    if (data == 0) {
        data = {
            type: "empty",
            debug: {
                type: "empty",
                placement: {
                    x: element.getAttribute("row"),
                    y: element.getAttribute("col")
                }
            }
        }
        pathBuilder.style.display = "none";
    }
    general.style.display = "block";
    typeP.innerHTML = "Type: " + data.type;
    subtypeP.innerHTML = "Subtype: " + data.debug.type;
    rowP.innerHTML = "X: " + element.getAttribute("row");
    colP.innerHTML = "Y: " + element.getAttribute("col");

    if (data.debug.type == "path_builder") {
        let pathData = data.debug;
        pathBuilder.style.display = "block";
        origin.innerHTML = `Origin [X,Y]: [${pathData.origin.x},${pathData.origin.y}]`;
        direction.innerHTML = "Direction: " + pathData.direction;
        iteration.innerHTML = "Iteration: " + pathData.iteration;
    } else {
        pathBuilder.style.display = "none";
    }
}

function attachDebugEvents() {
    const mapBlocks = document.querySelectorAll(".map-block");
    mapBlocks.forEach((element) => {
        element.addEventListener("click", function () {
            const debugData = JSON.parse(this.getAttribute("data-debug"));
            generateDebugDetails(element, debugData);
        });
    });
}

function clearMap() {
    const visual = new VisualizeMap(getSelectedAlgorithm());
    const debugCheckboxes = document.querySelectorAll(".debugger");
    visual.clear();
    debugCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    general.style.display = "none";
    pathBuilder.style.display = "none";
}

/**
 * Generates the map based on the selected algorithm and dimensions.
 */
function generateMap() {
    getSelectedAlgorithm().func.setSize(widthInput.value, heightInput.value);
    getSelectedAlgorithm().func.generate();
    var visual = new VisualizeMap(getSelectedAlgorithm());
    clearMap();
    visual.generate();
    attachDebugEvents();
}

window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        generateMap();
    } else if (e.key == "Escape") {
        clearMap();
    }
});