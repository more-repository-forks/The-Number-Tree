addLayer('c', {
    name: 'Colors',
    symbol: '<span class="rainbowline-backround noborder">',
    noedge: true,
    position: 0,
    startData() { return {
        unlocked: true,
        colors: 1,
        timeRed: 0,
        earnRed: new Decimal(4),
        timeOrange: 0,
        earnOrange: new Decimal(0),
        timeYellow: 0,
        earnYellow: new Decimal(0),
        timeGreenyellow: 0,
        earnGreenyellow: new Decimal(0),
    }},
    color: 'white',
    tooltip() {
        return formatWhole(player.c.colors) + ' colors';
    },
    row: 0,
    layerShown() {
        return true;
    },
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset('c', keep);
        },
    update(diff) {
        // update unlocks
        if (getBuyableAmount('c', 41).gt(0)) player.c.colors = 4;
        else if (getBuyableAmount('c', 31).gt(0)) player.c.colors = 3;
        else if (getBuyableAmount('c', 21).gt(0)) player.c.colors = 2;
        else player.c.colors = 1;
        // calculate
        earnings = getBuyableAmount('c', 11).add(1).mul(4);
        if (getBuyableAmount('c', 11).gte(9)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 11).gte(24)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 11).gte(49)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 11).gte(99)) earnings = earnings.mul(25);
        player.c.earnRed = earnings;
        earnings = getBuyableAmount('c', 21).mul(412.5);
        if (getBuyableAmount('c', 21).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 21).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 21).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 21).gte(100)) earnings = earnings.mul(25);
        player.c.earnOrange = earnings;
        earnings = getBuyableAmount('c', 31).mul(17500);
        if (getBuyableAmount('c', 31).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 31).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 31).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 31).gte(100)) earnings = earnings.mul(25);
        player.c.earnYellow = earnings;
        earnings = getBuyableAmount('c', 41).mul(1250000);
        if (getBuyableAmount('c', 41).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 41).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 41).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 41).gte(100)) earnings = earnings.mul(25);
        player.c.earnGreenyellow = earnings;
        // earn
        if (player.c.timeRed > 1) {
            player.points = player.points.add(player.c.earnRed);
            player.c.timeRed = 0;
        };
        if (player.c.timeOrange > 1) {
            player.points = player.points.add(player.c.earnOrange);
            player.c.timeOrange = 0;
        };
        if (player.c.timeYellow > 1) {
            player.points = player.points.add(player.c.earnYellow);
            player.c.timeYellow = 0;
        };
        if (player.c.timeGreenyellow > 1) {
            player.points = player.points.add(player.c.earnGreenyellow);
            player.c.timeGreenyellow = 0;
        };
        player.c.timeRed += diff / 3;
        if (getBuyableAmount('c', 21).gt(0)) player.c.timeOrange += diff / 6;
        else player.c.timeOrange = 0;
        if (getBuyableAmount('c', 31).gt(0)) player.c.timeYellow += diff / 12;
        else player.c.timeYellow = 0;
        if (getBuyableAmount('c', 41).gt(0)) player.c.timeGreenyellow += diff / 24;
        else player.c.timeGreenyellow = 0;
    },
    tabFormat: [
        ['display-text',
            function() {
                text = '<h3 class="rainbowline-text">you have ' + formatWhole(player.c.colors) + ' colors unlocked';
                return text;
            }],
        'blank',
        ['row', [
            ['bar', 'redProg'],
            'blank',
            ['bar', 'redBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'redBuy'],
                ['blank', '2px'],
                ['buyables', '1'],
            ]],
        ]],
        'blank',
        ['row', [
            ['bar', 'orangeProg'],
            'blank',
            ['bar', 'orangeBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'orangeBuy'],
                ['blank', '2px'],
                ['buyables', '2'],
            ]],
        ]],
        'blank',
        ['row', [
            ['bar', 'yellowProg'],
            'blank',
            ['bar', 'yellowBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'yellowBuy'],
                ['blank', '2px'],
                ['buyables', '3'],
            ]],
        ]],
        'blank',
        ['row', [
            ['bar', 'greenyellowProg'],
            'blank',
            ['bar', 'greenyellowBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'greenyellowBuy'],
                ['blank', '2px'],
                ['buyables', '4'],
            ]],
        ]],
    ],
    bars: {
        redBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeRed;
            },
            display() {
                return 'earnings per cycle: ' + illionFormat(player.c.earnRed) + ' coins';
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
        },
        redBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[11].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
        },
        redProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 11).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 11).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 11).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 11).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 11).add(1).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 11).add(1));
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
            style: {'border-radius':'50%'},
        },
        orangeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeOrange;
            },
            display() {
                if (getBuyableAmount('c', 21).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnOrange) + ' coins';
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
        },
        orangeBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[21].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
        },
        orangeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 21).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 21).lte(25)) goal = 25;
                else if (getBuyableAmount('c', 21).lte(50)) goal = 50;
                else if (getBuyableAmount('c', 21).lte(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 21).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 21));
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
            style: {'border-radius':'50%'},
        },
        yellowBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeYellow;
            },
            display() {
                if (getBuyableAmount('c', 31).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnYellow) + ' coins';
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 21).gt(0)) return true;
            },
        },
        yellowBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[31].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 21).gt(0)) return true;
            },
        },
        yellowProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 31).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 31).lte(25)) goal = 25;
                else if (getBuyableAmount('c', 31).lte(50)) goal = 50;
                else if (getBuyableAmount('c', 31).lte(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 31).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 31));
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (getBuyableAmount('c', 21).gt(0)) return true;
            },
        },
        greenyellowBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeGreenyellow;
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnGreenyellow) + ' coins';
            },
            fillStyle: {'background-color':'#88ff00'},
            borderStyle: {'border-color':'#88ff00'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        greenyellowBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[41].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#88ff00'},
            borderStyle: {'border-color':'#88ff00'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        greenyellowProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 41).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 41).lte(25)) goal = 25;
                else if (getBuyableAmount('c', 41).lte(50)) goal = 50;
                else if (getBuyableAmount('c', 41).lte(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 41).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 41));
            },
            fillStyle: {'background-color':'#88ff00'},
            borderStyle: {'border-color':'#88ff00'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
    },
    buyables: {
        11: {
            cost() {
                return new Decimal(1).add(getBuyableAmount('c', 11).add(1).mul(0.8)).add(new Decimal(1.2).pow(getBuyableAmount('c', 11).add(1)));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1));
            },
            display() {
                return '<h3 style="color:red">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        21: {
            cost() {
                return new Decimal(1).add(getBuyableAmount('c', 21).add(32).mul(0.8)).add(new Decimal(1.2).pow(getBuyableAmount('c', 21).add(32)));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 21, getBuyableAmount('c', 21).add(1));
            },
            display() {
                if (getBuyableAmount('c', 21).eq(0)) return '<h3 style="color:#ff8800">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#ff8800">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        31: {
            cost() {
                return new Decimal(1).add(getBuyableAmount('c', 31).add(64).mul(0.8)).add(new Decimal(1.2).pow(getBuyableAmount('c', 31).add(64)));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 31, getBuyableAmount('c', 31).add(1));
            },
            display() {
                if (getBuyableAmount('c', 31).eq(0)) return '<h3 style="color:yellow">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:yellow">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (getBuyableAmount('c', 21).gt(0)) return true;
            },
        },
        41: {
            cost() {
                return new Decimal(1).add(getBuyableAmount('c', 41).add(96).mul(0.8)).add(new Decimal(1.2).pow(getBuyableAmount('c', 41).add(96)));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 41, getBuyableAmount('c', 41).add(1));
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return '<h3 style="color:#88ff00">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#88ff00">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
    },
});

addLayer('p', {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "slategray",
    resource: "prestige points",
    row: 2,
    baseResource: "colors",
    baseAmount() {
        return new Decimal(player.c.colors);
    },
    requires: new Decimal(6),
    type: "normal",
    exponent: 1,
    gainMult() {
        return new Decimal(1);
    },
    gainExp() {
        return new Decimal(1);
    },
    layerShown() {
        return true;
    },
    marked: true,
})
