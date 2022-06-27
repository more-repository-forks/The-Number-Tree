addLayer("rn", {
    name: "roman numerals",
    symbol: "RN",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#884400",
    resource: "roman numerals",
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1);
    },
    gainExp() {
        return new Decimal(1);
    },
    layerShown() {
        return true;
    },
    tabFormat: [
        ["display-text",
            function() { return 'You have <h2 class="layer-rn">' + numeralFormat(player.rn.points) + '</h2> roman numerals' },
        ],
        "blank",
        "prestige-button",
        "blank",
    ],
});
