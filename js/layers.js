addLayer('rn', {
    name: 'roman numerals',
    symbol: 'RN',
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        calc: true,
    }},
    color: '#884400',
    resource: 'roman numerals',
    baseResource: 'points',
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(5),
    type: 'normal',
    exponent: 0.5,
    gainMult() {
        let gain = new Decimal(1);
        if (hasUpgrade('rn', 12)) gain = gain.mul(upgradeEffect('rn', 12));
        return gain;
    },
    gainExp() {
        return new Decimal(1);
    },
    prestigeButtonText() {
        let resetGain = new Decimal(tmp.rn.resetGain), text = '';
        if (player.rn.points.lt(1e3)) text = 'Reset for ';
        text += '+<b>' + numeralFormat(resetGain) + '</b> roman numerals';
        if (resetGain.lt(100)&&player.rn.points.lt(1e3)) text += '<br><br>Next at ' + format(tmp.rn.nextAt) + ' points';
        return text;
    },
    hotkeys: [{
        key: 'r', // Use uppercase if it's combined with shift, or 'ctrl+x' for holding down ctrl.
        description: 'R: reset your points for roman numerals',
        onPress() { if (player.rn.unlocked) doReset('rn') },
    }],
    layerShown() {
        return true;
    },
    tabFormat: [
        ['display-text',
            function() { return 'You have <h2 class="layer-rn">' + numeralFormat(player.rn.points) + '</h2> roman numerals' },
        ],
        'blank',
        'prestige-button',
        'resource-display',
        'blank',
        'upgrades',
        'clickables',
        'blank',
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
        15: {
            fullDisplay() {
                return `<h3>Point Scores</h3><br>
                    multiply points gain based on the amount of points you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            effect() {
                return player.points.add(1).pow(0.1);
            },
            cost: new Decimal(350),
        },
        21: {
            fullDisplay() {
                return `<h3>Calculator</h3><br>
                    shows the numeric equivalent to all roman numerals alongside the normal values.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
            },
            cost: new Decimal(1000),
        },
    },
    clickables: {
        11: {
            display() {
                if (player.rn.calc) return '<h3>turn<br>calulator<br>off';
                return '<h3>turn<br>calulator<br>on';
            },
            canClick() {
                return true;
            },
            onClick() {
                player.rn.calc = !player.rn.calc;
            },
            unlocked() {
                return hasUpgrade('rn', 21);
            },
        },
    },
});
