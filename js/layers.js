addLayer('c', {
    name: 'Colors',
    symbol: 'C',
    position: 0,
    startData() { return {
        unlocked: true,
        colors: 0,
    }},
    color: '#ffffff',
    tooltip() {
        return formatWhole(player.c.colors) + ' colors';
    },
    row: 0,
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset('c', keep);
        },
    tabFormat: [
        ["display-text",
            function() {
                text = 'you have ' + formatWhole(player.c.colors) + ' colors unlocked';
                return text;
            }],
        "blank",
        "buyables",
    ],
    buyables: {
        11: {
            cost() {
                return new Decimal(1.5).pow(getBuyableAmount('c', 11));
            },
            title() {
                return 'Red';
            },
            canAfford() { return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit) },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1));
            },
            display() {
                return 'Level: ' + formatWhole(getBuyableAmount('c', 11)) + '<br><br>Cost: ' + format(this.cost());
            },
        },
    },
});
