addLayer("p", {
    name: "plains", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
    resource: "basic skill", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
        {key: "p", description: "P: Reset for basic skill", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {return new Decimal(1 + player['p'].points / 100)},
    effectDescription() {return "which multiplies your basic resouce gain by " + format(tmp.p.effect)},
    layerShown(){return true},
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() { return 'You have ' + format(player.points) + ' experience' },
            {}],
        "blank",
        "grid"
    ],
    grid: {
        rows: 6, // If these are dynamic make sure to have a max value as well!
        cols: 6,
        getStartData(id) {
            if (id == 101) return "you are here"
            if (id == 201 || id == 102) return "goable"
            else return "empty tile"
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            if (data == "you are here" || data == "goable") return true
            else return false
        },
        onClick(data, id) {
            if (getGridData('p', id - 2) == "you are here" || getGridData('p', id - 2) == "goable") setGridData('p', id - 2, "empty tile")
            if (getGridData('p', id + 2) == "you are here" || getGridData('p', id + 2) == "goable") setGridData('p', id + 2, "empty tile")
            if (getGridData('p', id - 99) == "you are here" || getGridData('p', id - 99) == "goable") setGridData('p', id - 99, "empty tile")
            if (getGridData('p', id + 99) == "you are here" || getGridData('p', id + 99) == "goable") setGridData('p', id + 99, "empty tile")
            if (getGridData('p', id - 101) == "you are here" || getGridData('p', id - 101) == "goable") setGridData('p', id - 101, "empty tile")
            if (getGridData('p', id + 101) == "you are here" || getGridData('p', id + 101) == "goable") setGridData('p', id + 101, "empty tile")
            if (getGridData('p', id - 200) == "you are here" || getGridData('p', id - 200) == "goable") setGridData('p', id - 200, "empty tile")
            if (getGridData('p', id + 200) == "you are here" || getGridData('p', id + 200) == "goable") setGridData('p', id + 200, "empty tile")
            setGridData('p', id - 1, "goable")
            setGridData('p', id + 1, "goable")
            setGridData('p', id - 100, "goable")
            setGridData('p', id + 100, "goable")
            setGridData('p', id, "you are here")
        },
        getDisplay(data, id) {
            if (data == "goable") return "empty tile"
            return data
        },
    },
});
