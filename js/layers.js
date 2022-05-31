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
        timeSlime: 0,
        earnSlime: new Decimal(0),
        timeLime: 0,
        earnLime: new Decimal(0),
        timeTeal: 0,
        earnTeal: new Decimal(0),
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
        if (getBuyableAmount('c', 61).gt(0)) player.c.colors = 6;
        else if (getBuyableAmount('c', 51).gt(0)) player.c.colors = 5;
        else if (getBuyableAmount('c', 41).gt(0)) player.c.colors = 4;
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
        player.c.earnSlime = earnings;
        earnings = getBuyableAmount('c', 51).mul(500000000);
        if (getBuyableAmount('c', 51).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 51).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 51).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 51).gte(100)) earnings = earnings.mul(25);
        player.c.earnLime = earnings;
        earnings = getBuyableAmount('c', 61).mul(75e9);
        if (getBuyableAmount('c', 61).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 61).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 61).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 61).gte(100)) earnings = earnings.mul(25);
        player.c.earnTeal = earnings;
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
        if (player.c.timeSlime > 1) {
            player.points = player.points.add(player.c.earnSlime);
            player.c.timeSlime = 0;
        };
        if (player.c.timeLime > 1) {
            player.points = player.points.add(player.c.earnLime);
            player.c.timeLime = 0;
        };
        if (player.c.timeTeal > 1) {
            player.points = player.points.add(player.c.earnTeal);
            player.c.timeTeal = 0;
        };
        player.c.timeRed += diff / 3;
        if (getBuyableAmount('c', 21).gt(0)) player.c.timeOrange += diff / 6;
        else player.c.timeOrange = 0;
        if (getBuyableAmount('c', 31).gt(0)) player.c.timeYellow += diff / 12;
        else player.c.timeYellow = 0;
        if (getBuyableAmount('c', 41).gt(0)) player.c.timeSlime += diff / 24;
        else player.c.timeSlime = 0;
        if (getBuyableAmount('c', 51).gt(0)) player.c.timeLime += diff / 48;
        else player.c.timeLime = 0;
        if (getBuyableAmount('c', 61).gt(0)) player.c.timeTeal += diff / 72;
        else player.c.timeTeal = 0;
    },
    tabFormat: [
        ['display-text',
            function() {
                return 'You have <h2 class="rainbowline-text">' + formatWhole(player.c.colors) + '</h2> colors unlocked';
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
            ['bar', 'slimeProg'],
            'blank',
            ['bar', 'slimeBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'slimeBuy'],
                ['blank', '2px'],
                ['buyables', '4'],
            ]],
        ]],
        'blank',
        ['row', [
            ['bar', 'limeProg'],
            'blank',
            ['bar', 'limeBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'limeBuy'],
                ['blank', '2px'],
                ['buyables', '5'],
            ]],
        ]],
        'blank',
        ['row', [
            ['bar', 'tealProg'],
            'blank',
            ['bar', 'tealBar'],
            ['blank', ['6.5px', '1px']],
            ['column', [
                ['bar', 'tealBuy'],
                ['blank', '2px'],
                ['buyables', '6'],
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
            style: {'color':'white'},
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
            style: {'color':'white'},
        },
        redProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 11).lt(9)) goal = 10;
                else if (getBuyableAmount('c', 11).lt(24)) goal = 25;
                else if (getBuyableAmount('c', 11).lt(49)) goal = 50;
                else if (getBuyableAmount('c', 11).lt(99)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 11).add(1).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 11).add(1));
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
            style: {'color':'white','border-radius':'50%'},
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
            style: {'color':'white'},
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
            style: {'color':'white'},
        },
        orangeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 21).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 21).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 21).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 21).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 21).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 21));
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
            style: {'color':'white','border-radius':'50%'},
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
                else if (getBuyableAmount('c', 31).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 31).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 31).lt(100)) goal = 100;
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
        slimeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeSlime;
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnSlime) + ' coins';
            },
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        slimeBuy: {
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
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        slimeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 41).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 41).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 41).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 41).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 41).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 41));
            },
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white','border-radius':'50%'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        limeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeLime;
            },
            display() {
                if (getBuyableAmount('c', 51).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnLime) + ' coins';
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 41).gt(0)) return true;
            },
        },
        limeBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[51].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 41).gt(0)) return true;
            },
        },
        limeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 51).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 51).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 51).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 51).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 51).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 51));
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (getBuyableAmount('c', 41).gt(0)) return true;
            },
        },
        tealBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeTeal;
            },
            display() {
                if (getBuyableAmount('c', 61).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnTeal) + ' coins';
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 51).gt(0)) return true;
            },
        },
        tealBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[61].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (getBuyableAmount('c', 51).gt(0)) return true;
            },
        },
        tealProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 61).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 61).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 61).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 61).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 61).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 61));
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (getBuyableAmount('c', 51).gt(0)) return true;
            },
        },
    },
    buyables: {
        11: {
            cost() {
                x = getBuyableAmount('c', 11).add(1);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                return '<h3 style="color:red">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        21: {
            cost() {
                x = getBuyableAmount('c', 21).add(32);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', 21).eq(0)) return '<h3 style="color:#ff8800">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#ff8800">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        31: {
            cost() {
                x = getBuyableAmount('c', 31).add(64);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
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
                x = getBuyableAmount('c', 41).add(96);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return '<h3 style="color:#88cc00">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#88cc00">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (getBuyableAmount('c', 31).gt(0)) return true;
            },
        },
        51: {
            cost() {
                x = getBuyableAmount('c', 51).add(128);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', this.id).eq(0)) return '<h3 style="color:lime">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:lime">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (getBuyableAmount('c', 41).gt(0)) return true;
            },
        },
        61: {
            cost() {
                x = getBuyableAmount('c', this.id).add(160);
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x));
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', this.id).eq(0)) return '<h3 style="color:#00ff88">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#00ff88">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (getBuyableAmount('c', 51).gt(0)) return true;
            },
        },
    },
});

addLayer('r', {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: 'slategray',
    resource: 'multiplier',
    row: 2,
    baseResource: 'colors',
    baseAmount() {
        return new Decimal(player.c.colors);
    },
    requires: new Decimal(5),
    type: 'custom',
    getResetGain(x = 0) {
        earnings = [0, 0, 0, 0, 0, 2, 5, 36];
        return new Decimal(earnings[player.c.colors + x]);
    },
    getNextAt() {
        if (!tmp.r.canReset) return tmp.r.requires;
        return player.c.colors + 1;
    },
    canReset() {
        return player.c.colors >= 5;
    },
    prestigeNotify() {
        return tmp.r.canReset && (new Decimal(tmp.r.resetGain).gte(player.r.points.div(10)));
    },
    prestigeButtonText() {
        text = '';
        if (player.r.points.lt(1e3)) text += 'Reset for ';
        return text+'+<b>'+illionFormat(tmp.r.resetGain,false,0)+'</b> multiplier<br><br>You will gain '+illionFormat(this.getResetGain(1)-this.getResetGain(),true,0)+' more at '+illionFormat(tmp.r.nextAt,true,0)+' colors';
    },
    layerShown() {
        return true;
    },
    marked: true,
})
