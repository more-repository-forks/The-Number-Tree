addLayer("rn", {
    name: "roman numerals",
    symbol: "RN",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#884400",
    resource: "roman numerals",
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(5),
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let gain = new Decimal(1);
        if (hasUpgrade('rn', 12)) gain = gain.mul(upgradeEffect('rn', 12));
        return gain;
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
        "resource-display",
        "blank",
        "upgrades",
        "blank",
    ],
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Counting</h3><br>
                    multiply point generation based on the amount of roman numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            effect() {
                return player.rn.points.add(1).pow(0.25);
            },
            cost: new Decimal(4),
        },
        12: {
            fullDisplay() {
                return `<h3>Practice</h3><br>
                    multiply roman numeral gain based on the amount of total roman numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            effect() {
                return player.rn.total.add(1).pow(0.2);
            },
            cost: new Decimal(10),
        },
        13: {
            fullDisplay() {
                return `<h3>Again</h3><br>
                    multiply points gain by 10 when you have less than 10 points.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            effect() {
                return 10;
            },
            cost: new Decimal(30),
        },
        14: {
            fullDisplay() {
                return `<h3>Again, Again</h3><br>
                    multiply points gain by 2 when you have less than 50 points.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            effect() {
                return 2;
            },
            cost: new Decimal(100),
        },
    },
});
