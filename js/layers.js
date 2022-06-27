addLayer("rn", {
    name: "roman numerals",
    symbol: "RN",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
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
});
