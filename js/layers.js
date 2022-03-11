function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

addLayer("b", {
    name: "basic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        wood: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "basic skill", // Name of prestige currency
    baseResource: "experience", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for basic skill", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {return new Decimal(1 + player['b'].points / 100)},
    effectDescription() {return "which multiplies your basic resouce gain by " + format(tmp.b.effect)},
    layerShown(){return true},
    update() {
        let randomTile = getRandomInt(0, 7) * 100 + getRandomInt(0, 7)
        if (getRandomInt(0, 100) == 0)
            if(getGridData('b', randomTile) == 1) setGridData('b', getRandomInt(0, 7) * 100 + getRandomInt(0, 7), 1101)
            else
                if (getGridData('b', randomTile) == 2) setGridData('b', getRandomInt(0, 7) * 100 + getRandomInt(0, 7), 101)
                else
                    if (getGridData('b', randomTile) > 1100 && getGridData('b', randomTile) < 1200) setGridData('b', getRandomInt(0, 7) * 100 + getRandomInt(0, 7), getGridData('b', randomTile) + 1)
                    else
                        if (getGridData('b', randomTile) > 100 && getGridData('b', randomTile) < 200) setGridData('b', getRandomInt(0, 7) * 100 + getRandomInt(0, 7), getGridData('b', randomTile) + 1)
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() { return 'You have ' + format(player.points) + ' experience' },
            {}],
            ["display-text",
            function() { return 'You have ' + format(player.b.wood) + ' wood' },
            {}],
        "blank",
        "grid"
    ],
    grid: {
        rows: 6,
        cols: 6,
        getStartData(id) {if (id == 101) return 0; else if (id == 102 || id == 201) return 2; else if (id == 505) return 101; else return 1},
        getUnlocked(id) {return true},
        getCanClick(data, id) {if (data == 0 || data == 2 || data > 1100 || data < 1200) return true; else return false},
        onClick(data, id) {
            //transition to immovable tile
            if (getGridData('b', id - 2) == 0 || getGridData('b', id - 2) == 2) setGridData('b', id - 2, 1)
            if (getGridData('b', id + 2) == 0 || getGridData('b', id + 2) == 2) setGridData('b', id + 2, 1)
            if (getGridData('b', id - 99) == 0 || getGridData('b', id - 99) == 2) setGridData('b', id - 99, 1)
            if (getGridData('b', id + 99) == 0 || getGridData('b', id + 99) == 2) setGridData('b', id + 99, 1)
            if (getGridData('b', id - 101) == 0 || getGridData('b', id - 101) == 2) setGridData('b', id - 101, 1)
            if (getGridData('b', id + 101) == 0 || getGridData('b', id + 101) == 2) setGridData('b', id + 101, 1)
            if (getGridData('b', id - 200) == 0 || getGridData('b', id - 200) == 2) setGridData('b', id - 200, 1)
            if (getGridData('b', id + 200) == 0 || getGridData('b', id + 200) == 2) setGridData('b', id + 200, 1)
            //transition to uncollectable wood
            if (getGridData('b', id - 2) > 1100 && getGridData('b', id - 2) < 1200) setGridData('b', id - 2, getGridData('b', id - 2) - 1000)
            if (getGridData('b', id + 2) > 1100 && getGridData('b', id + 2) < 1200) setGridData('b', id + 2, getGridData('b', id + 2) - 1000)
            if (getGridData('b', id - 99) > 1100 && getGridData('b', id - 99) < 1200) setGridData('b', id - 99, getGridData('b', id - 99) - 1000)
            if (getGridData('b', id + 99) > 1100 && getGridData('b', id + 99) < 1200) setGridData('b', id + 99, getGridData('b', id + 99) - 1000)
            if (getGridData('b', id - 101) > 1100 && getGridData('b', id - 101) < 1200) setGridData('b', id - 101, getGridData('b', id - 101) - 1000)
            if (getGridData('b', id + 101) > 1100 && getGridData('b', id + 101) < 1200) setGridData('b', id + 101, getGridData('b', id + 101) - 1000)
            if (getGridData('b', id - 200) > 1100 && getGridData('b', id - 200) < 1200) setGridData('b', id - 200, getGridData('b', id - 200) - 1000)
            if (getGridData('b', id + 200) > 1100 && getGridData('b', id + 200) < 1200) setGridData('b', id + 200, getGridData('b', id + 200) - 1000)
            //transition to moveable tile
            if (getGridData('b', id - 1) == 0 || getGridData('b', id - 1) == 1) setGridData('b', id - 1, 2)
            if (getGridData('b', id + 1) == 0 || getGridData('b', id + 1) == 1) setGridData('b', id + 1, 2)
            if (getGridData('b', id - 100) == 0 || getGridData('b', id - 100) == 1) setGridData('b', id - 100, 2)
            if (getGridData('b', id + 100) == 0 || getGridData('b', id + 100) == 1) setGridData('b', id + 100, 2)
            //transition to collectable wood
            if (getGridData('b', id - 1) > 100 && getGridData('b', id - 1) < 200) setGridData('b', id - 1, 1000 + getGridData('b', id - 1))
            if (getGridData('b', id + 1) > 100 && getGridData('b', id + 1) < 200) setGridData('b', id + 1, 1000 + getGridData('b', id + 1))
            if (getGridData('b', id - 100) > 100 && getGridData('b', id - 100) < 200) setGridData('b', id - 100, 1000 + getGridData('b', id - 100))
            if (getGridData('b', id + 100) > 100 && getGridData('b', id + 100) < 200) setGridData('b', id + 100, 1000 + getGridData('b', id + 100))
            //other
            if (getGridData('b', id) > 1100 && getGridData('b', id) < 1200) player.b.wood = new Decimal(player.b.wood + ((getGridData('b', id) - 1100) * tmp.b.effect))
            setGridData('b', id, 0)
        },
        getDisplay(data, id) {
            let DebugMode_LayerB = false
            if (DebugMode_LayerB == true) return data
            else
                if (data == 0) return "you are here"
                if (data == 1 || data == 2) return "empty tile"
                if (data > 100 && data < 200) return "contains:\n" + (data - 100) + " wood"
                if (data > 1100 && data < 1200) return "contains:\n" + (data - 1100) + " wood"
        },
    },
});
