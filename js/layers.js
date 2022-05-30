addLayer('c', {
    name: 'Colors',
    symbol: '<div class="rainbow">',
    position: 0,
    startData() { return {
        unlocked: true,
        colors: 1,
    }},
    color: '#ffffff',
    tooltip() {
        document.body.style.setProperty('--hqProperty1', '0px');
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
            canAfford() { return player.points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(this.purchaseLimit) },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1));
            },
            display() {
                return '<h1 style="color:#ff0000">Red</h1><br><br>Level: ' + formatWhole(getBuyableAmount('c', 11).add(1)) + '<br><br>Cost: ' + format(this.cost()) + ' coins';
            },
            style() {
                return {'background-color':'#cccccc','border-radius':'25%','height':'80px','width':'160px'};
            },
        },
    },
});
