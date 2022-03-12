function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let timeWood = 0

addLayer("b", {
    name: "basic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['c'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        wood: 0,
        woodBest: 0,
        woodTotal: 0,
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "basic skill", // Name of prestige currency
    baseResource: "experience", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('b', 13)) mult = mult.times(1.5)
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
        let randomTile = getRandomInt(0, 8) * 100 + getRandomInt(0, 8)
        let speedWood = 500
        if (hasUpgrade('b', 11)) speedWood = speedWood * 0.8
        if (timeWood < Math.ceil(speedWood)) timeWood = timeWood + 1
        else if(getGridData('b', randomTile) == 1) setGridData('b', randomTile, 101), timeWood = 0
        else if (getGridData('b', randomTile) == 2) setGridData('b', randomTile, 1101), timeWood = 0
        else if (getGridData('b', randomTile) > 1100 && getGridData('b', randomTile) < 1199) setGridData('b', randomTile, getGridData('b', randomTile) + 1), timeWood = 0
        else if (getGridData('b', randomTile) > 100 && getGridData('b', randomTile) < 199) setGridData('b', randomTile, getGridData('b', randomTile) + 1), timeWood = 0
        else timeWood = 0
        if (player.b.wood > player.b.woodBest) player.b.woodBest = player.b.wood
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
        ["display-text",
            function() { return 'You have ' + format(player.b.woodBest) + ' best wood' },
            {}],
        ["display-text",
            function() { return 'You have ' + format(player.b.woodTotal) + ' total wood' },
            {}],
        "blank",
        "upgrades",
        "grid",
    ],
    upgrades: {
        11: {
            fullDisplay(){
                return '<h3>Finders Keepers</h3><br>Decrease time taken for finding wood by 20%<br><br>Cost: 1.01 wood'
            },
            canAfford(){
                if (player.b.wood >= 1.01) return true
                else return false
            },
            pay(){player.b.wood = player.b.wood - 1.01},
        },
        12: {
            title: "Experienced",
            description: "gain more experience based on the amount of your basic skill",
            cost: new Decimal(15),
            effect(){return player['b'].points.add(1).pow(0.25)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            fullDisplay(){
                return '<h3>Skilled</h3><br>You gain 50% more basic skill from experience<br><br>Cost: 4.50 wood'
            },
            canAfford(){
                if (player.b.wood >= 4.5) return true
                else return false
            },
            pay(){player.b.wood = player.b.wood - 4.5},
        },
        14: {
            title: "Bark Study",
            description: "gain more experience based on your best wood",
            cost: new Decimal(30),
            effect(){return (player.b.woodBest + 1) ** 0.4},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            fullDisplay(){
                return '<h3>Wooden Box</h3><br>You have a 15% chance to get double wood when collecting wood<br><br>Cost: 10.25 wood'
            },
            canAfford(){
                if (player.b.wood >= 10.25) return true
                else return false
            },
            pay(){player.b.wood = player.b.wood - 10.25},
        },
    },
    grid: {
        rows: 7,
        cols: 7,
        getStartData(id) {
            if (id == 101) return 0;
            else if (id == 102 || id == 201) return 2;
            else if (id == 505) return 101;
            else return 1;
        },
        getUnlocked(id) {return true},
        getCanClick(data, id) {
            if (data == 0 || data == 2 || data > 1100 && data < 1200) return true;
            else return false;
        },
        onClick(data, id) {
            let woodMult = 1;
            if (player.c.points > 0 && player.c.woodPlank > 0) woodMult = player.c.woodPlank * (tmp.c.effect ** 0.1 - 1);
            if (woodMult > 100) woodMult = 100;
            //transition to immovable tile
            if (getGridData('b', id - 2) == 0 || getGridData('b', id - 2) == 2) setGridData('b', id - 2, 1);
            if (getGridData('b', id + 2) == 0 || getGridData('b', id + 2) == 2) setGridData('b', id + 2, 1);
            if (getGridData('b', id - 99) == 0 || getGridData('b', id - 99) == 2) setGridData('b', id - 99, 1);
            if (getGridData('b', id + 99) == 0 || getGridData('b', id + 99) == 2) setGridData('b', id + 99, 1);
            if (getGridData('b', id - 101) == 0 || getGridData('b', id - 101) == 2) setGridData('b', id - 101, 1);
            if (getGridData('b', id + 101) == 0 || getGridData('b', id + 101) == 2) setGridData('b', id + 101, 1);
            if (getGridData('b', id - 200) == 0 || getGridData('b', id - 200) == 2) setGridData('b', id - 200, 1);
            if (getGridData('b', id + 200) == 0 || getGridData('b', id + 200) == 2) setGridData('b', id + 200, 1);
            //transition to uncollectable wood
            if (getGridData('b', id - 2) > 1100 && getGridData('b', id - 2) < 1200) setGridData('b', id - 2, getGridData('b', id - 2) - 1000);
            if (getGridData('b', id + 2) > 1100 && getGridData('b', id + 2) < 1200) setGridData('b', id + 2, getGridData('b', id + 2) - 1000);
            if (getGridData('b', id - 99) > 1100 && getGridData('b', id - 99) < 1200) setGridData('b', id - 99, getGridData('b', id - 99) - 1000);
            if (getGridData('b', id + 99) > 1100 && getGridData('b', id + 99) < 1200) setGridData('b', id + 99, getGridData('b', id + 99) - 1000);
            if (getGridData('b', id - 101) > 1100 && getGridData('b', id - 101) < 1200) setGridData('b', id - 101, getGridData('b', id - 101) - 1000);
            if (getGridData('b', id + 101) > 1100 && getGridData('b', id + 101) < 1200) setGridData('b', id + 101, getGridData('b', id + 101) - 1000);
            if (getGridData('b', id - 200) > 1100 && getGridData('b', id - 200) < 1200) setGridData('b', id - 200, getGridData('b', id - 200) - 1000);
            if (getGridData('b', id + 200) > 1100 && getGridData('b', id + 200) < 1200) setGridData('b', id + 200, getGridData('b', id + 200) - 1000);
            //transition to moveable tile
            if (getGridData('b', id - 1) == 0 || getGridData('b', id - 1) == 1) setGridData('b', id - 1, 2);
            if (getGridData('b', id + 1) == 0 || getGridData('b', id + 1) == 1) setGridData('b', id + 1, 2);
            if (getGridData('b', id - 100) == 0 || getGridData('b', id - 100) == 1) setGridData('b', id - 100, 2);
            if (getGridData('b', id + 100) == 0 || getGridData('b', id + 100) == 1) setGridData('b', id + 100, 2);
            //transition to collectable wood
            if (getGridData('b', id - 1) > 100 && getGridData('b', id - 1) < 200) setGridData('b', id - 1, 1000 + getGridData('b', id - 1));
            if (getGridData('b', id + 1) > 100 && getGridData('b', id + 1) < 200) setGridData('b', id + 1, 1000 + getGridData('b', id + 1));
            if (getGridData('b', id - 100) > 100 && getGridData('b', id - 100) < 200) setGridData('b', id - 100, 1000 + getGridData('b', id - 100));
            if (getGridData('b', id + 100) > 100 && getGridData('b', id + 100) < 200) setGridData('b', id + 100, 1000 + getGridData('b', id + 100));
            //other
            if (data > 1100 && data < 1200) player.b.wood = player.b.wood + ((data - 1100) * tmp.b.effect), player.b.woodTotal = player.b.woodTotal + (((data - 1100) * tmp.b.effect) * woodMult);
            if (data > 1100 && data < 1200 && hasUpgrade('b', 15) && getRandomInt(0, 100) < 15) player.b.wood = player.b.wood + ((data - 1100) * tmp.b.effect), player.b.woodTotal = player.b.woodTotal + (((data - 1100) * tmp.b.effect) * woodMult);
            setGridData('b', id, 0);
        },
        getDisplay(data, id) {
            let DebugMode_LayerB = false;
            if (DebugMode_LayerB == true) return data;
            else {
                if (data == 0) return "you are here";
                if (data == 1 || data == 2) return "empty tile";
                if (data > 100 && data < 200) return "contains:\n" + (data - 100) + " wood";
                if (data > 1100 && data < 1200) return "contains:\n" + (data - 1100) + " wood";
            }
        },
    },
});

addLayer("c", {
    name: "crafting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        woodPlank: 0,
        woodPlankCraftProgress: 0,
    }},
    color: "#946621",
    requires: new Decimal(75), // Can be a function that takes requirement increases into account
    resource: "crafters", // Name of prestige currency
    baseResource: "basic skill", // Name of resource prestige is based on
    baseAmount() {return player['b'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    canBuyMax(){return true},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for crafters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {return new Decimal((player['c'].points + 1) ** 0.45)},
    effectDescription() {return "which multiplies your experience gain by " + format(tmp.c.effect) + "x"},
    layerShown(){return true},
    update() {
        if (player.c.woodPlankCraftProgress < 1 && getClickableState('c', 12) == "ON") player.c.woodPlankCraftProgress = player.c.woodPlankCraftProgress + 0.0002;
        else if (player.c.woodPlankCraftProgress < 1 && getClickableState('c', 11) == "ON") player.c.woodPlankCraftProgress = player.c.woodPlankCraftProgress + 0.002;
        else if (player.c.woodPlankCraftProgress >= 1 && getClickableState('c', 12) == "ON") {
            player.c.woodPlank = player.c.woodPlank + 10;
            setClickableState('c', 12, "OFF");
            player.c.woodPlankCraftProgress = 0;
        }
        else if (player.c.woodPlankCraftProgress >= 1 && getClickableState('c', 11) == "ON") {
            player.c.woodPlank = player.c.woodPlank + 1;
            setClickableState('c', 11, "OFF");
            player.c.woodPlankCraftProgress = 0;
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",
            function() { return 'You have ' + format(player['b'].points) + ' basic skill' },
            {}],
        "blank",
        ["display-text",
            function() { return 'You have ' + formatWhole(player.c.woodPlank) + ' wood planks, which each make the crafter effect apply to wood gain at a reduced rate (' + format(tmp.c.effect ** 0.1) + "x), which totals to: " + format(player.c.woodPlank * (tmp.c.effect ** 0.1 - 1)) + 'x (capped at 100x)'},
            {}],
        "blank",
        "clickables",
        "blank",
        ["bar", "woodPlankCrafter"],
    ],
    clickables: {
        11: {
            title: "Craft 1 Wood Plank",
            display() {return "\ninput: 1 wood\n\noutput: 1 wood plank"},
            canClick() {
                if (player.b.wood >= 1 && getClickableState('c', 11) != "ON" && getClickableState('c', 12) != "ON") return true
                else return false
            },
            onClick() {
                setClickableState('c', 11, "ON")
                player.b.wood = player.b.wood - 1
            },
            unlocked() {
                if (player.c.points > 0) return true
                else return false
            },
        },
        12: {
            title: "Craft 10 Wood Planks",
            display() {return "\ninput: 10 wood\n\noutput: 10 wood planks"},
            canClick() {
                if (player.b.wood >= 10 && getClickableState('c', 11) != "ON" && getClickableState('c', 12) != "ON") return true
                else return false
            },
            onClick() {
                setClickableState('c', 12, "ON")
                player.b.wood = player.b.wood - 10
            },
            unlocked() {
                if (player.c.points > 0) return true
                else return false
            },
        },
    },
    bars: {
        woodPlankCrafter: {
            direction: RIGHT,
            width: 600,
            height: 20,
            progress() { return player.c.woodPlankCraftProgress },
            display() {
                if (getClickableState('c', 12) == "ON") return "time left: " + format(Math.abs(player.c.woodPlankCraftProgress - 1) * 100)
                else if (getClickableState('c', 11) == "ON") return "time left: " + format(Math.abs(player.c.woodPlankCraftProgress - 1) * 10)
                else return "OFF"
            },
            fillStyle() { return {"background-color": "#946621" } },
            borderStyle() { return {"border-color": "#946621"} },
            unlocked() {
                if (player.c.points > 0) return true
                else return false
            },
        },
    },
});
