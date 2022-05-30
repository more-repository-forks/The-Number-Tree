addLayer('c', {
    name: 'Colors',
    symbol: '<div class="rainbow-backround">',
    position: 0,
    startData() { return {
        unlocked: true,
        colors: 1,
        timeRed: 0,
        earnRed: new Decimal(4),
    }},
    color: '#ffffff',
    tooltip() {
        document.body.style.setProperty('--hqProperty1', '0px');
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
        // calculate
        earnings = getBuyableAmount('c', 11).add(1).mul(4);
        if (getBuyableAmount('c', 11).gte(9)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 11).gte(24)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 11).gte(49)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 11).gte(99)) earnings = earnings.mul(25);
        player.c.earnRed = earnings;
        // earn
        if (player.c.timeRed > 1) {
            player.points = player.points.add(player.c.earnRed);
            player.c.timeRed = 0;
        };
        player.c.timeRed += diff / 3;
    },
    tabFormat: [
        ['display-text',
            function() {
                text = '<h3 class="rainbow-text">you have ' + formatWhole(player.c.colors) + ' colors unlocked';
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
                return 'earnings per cycle: ' + format(player.c.earnRed) + ' coins';
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
                if (this.progress().gt(1)) return format(100) + '%';
                return format(this.progress().mul(100)) + '%';
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
                return '<h3 style="color:red">Cost: ' + format(this.cost()) + ' coins';
            },
            style: {'background-color':'#cccccc','border-radius':'0%','height':'25px','width':'180px'},
        },
    },
});
