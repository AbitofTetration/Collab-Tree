var layers = {}

function layerShown(layer){
    return layers[layer].layerShown();
}

var LAYERS = Object.keys(layers);

var hotkeys = {};

function updateHotkeys()
{
    hotkeys = {};
    for (layer in layers){
        hk = layers[layer].hotkeys
        if (hk){
            for (id in hk){
				hotkeys[hk[id].key] = hk[id]
				hotkeys[hk[id].key].layer = layer
            }
        }
    }
}

var ROW_LAYERS = {}
var TREE_LAYERS = {}

function updateLayers(){
    LAYERS = Object.keys(layers);
    ROW_LAYERS = {}
    TREE_LAYERS = {}
    for (layer in layers){
        layers[layer].layer = layer
        if (layers[layer].upgrades){
            for (thing in layers[layer].upgrades){
                if (!isNaN(thing)){
                    layers[layer].upgrades[thing].id = thing
                    layers[layer].upgrades[thing].layer = layer
                    if (layers[layer].upgrades[thing].unl === undefined)
                        layers[layer].upgrades[thing].unl = true
                }
            }
        }
        if (layers[layer].milestones){
            for (thing in layers[layer].milestones){
                if (!isNaN(thing)){
                    layers[layer].milestones[thing].id = thing
                    layers[layer].milestones[thing].layer = layer
                    if (layers[layer].milestones[thing].unl === undefined)
                        layers[layer].milestones[thing].unl = true
                }
            }
        }
        if (layers[layer].challs){
            for (thing in layers[layer].challs){
                if (!isNaN(thing)){
                    layers[layer].challs[thing].id = thing
                    layers[layer].challs[thing].layer = layer
                    if (layers[layer].challs[thing].unl === undefined)
                        layers[layer].challs[thing].unl = true
                }
            }
        }
        if (layers[layer].buyables){
            layers[layer].buyables.layer = layer
            for (thing in layers[layer].buyables){
                if (!isNaN(thing)){
                    layers[layer].buyables[thing].id = thing
                    layers[layer].buyables[thing].layer = layer
                    if (layers[layer].buyables[thing].unl === undefined)
                        layers[layer].buyables[thing].unl = true
                }
            }  
        }

        if(!layers[layer].componentStyles) layers[layer].componentStyles = {}
        if(layers[layer].symbol === undefined) layers[layer].symbol = layer.charAt(0).toUpperCase() + layer.slice(1)

        row = layers[layer].row
        if(!ROW_LAYERS[row]) ROW_LAYERS[row] = {}
        if(!TREE_LAYERS[row]) TREE_LAYERS[row] = []
        ROW_LAYERS[row][layer]=layer;
        let position = (layers[layer].position !== undefined ? layers[layer].position : layer)
        TREE_LAYERS[row].push({layer: layer, position: position})

        
    }
    for (row in TREE_LAYERS) {
        TREE_LAYERS[row].sort((a, b) => (a.position > b.position) ? 1 : -1)
    }

    updateHotkeys()
}

function addLayer(layerName, layerData){ // Call this to add layers from a different file!
    layers[layerName] = layerData
    updateLayers()
}

// If data is a function, return the result of calling it. Otherwise, return the data.
function readData(data, args=null){
	if (!!(data && data.constructor && data.call && data.apply))
		return data(args);
	else
		return data;
}

function someLayerUnlocked(row){
    for (layer in ROW_LAYERS[row])
        if (player[layer].unl)
            return true
    return false
}

// This isn't worth making a .ts file over
const UP = 1
const DOWN = 2
const LEFT = 3
const RIGHT = 4