addLayer('rn', {
    name: 'roman numerals',
    symbol: 'RN',
    row: 0,
    position: 0,
    tooltip() {
        return numeralFormat(player.rn.points) + ' roman numerals';
    },
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        calc: true,
        upCalc: false,
    }},
    color: '#884400',
    resource: 'roman numerals',
    baseResource: 'arabic numerals',
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(5),
    type: 'normal',
    exponent: 0.5,
    gainMult() {
        let gain = new Decimal(1);
        if (hasUpgrade('rn', 12)) gain = gain.mul(upgradeEffect('rn', 12));
        if (hasUpgrade('rn', 22)) gain = gain.mul(upgradeEffect('rn', 22));
        if (hasUpgrade('rn', 32)) gain = gain.mul(upgradeEffect('rn', 32));
        return gain;
    },
    gainExp() {
        return new Decimal(1);
    },
    prestigeButtonText() {
        let resetGain = new Decimal(tmp.rn.resetGain), text = '';
        if (player.rn.points.lt(1e3)) text = 'Reset for ';
        text += '+<b>' + numeralFormat(resetGain) + '</b> roman numerals';
        if (resetGain.lt(100)&&player.rn.points.lt(1e3)) text += '<br><br>Next at ' + format(tmp.rn.nextAt) + ' arabic numerals';
        return text;
    },
    hotkeys: [{
        key: 'r', // Use uppercase if it's combined with shift, or 'ctrl+x' for holding down ctrl.
        description: 'R: reset your arabic numerals for roman numerals',
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
        ['display-text',
            function() {
                return 'You have ' + format(player.points) + ' arabic numerals<br><br>'
                    + 'Your best roman numerals is ' + numeralFormat(player.rn.best) + '<br>'
                    + 'You have made a total of ' + numeralFormat(player.rn.total) + ' roman numerals'
            },
        ],
        'upgrades',
        'clickables',
        'blank',
    ],
    upgrades: {
        11: {
            fullDisplay() {
                let text = `<h3>Countings</h3><br>
                    multiply arabic numeral generation based on the amount of roman numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.rn.points.add(1).pow(0.25);
            },
            cost: new Decimal(4),
        },
        12: {
            fullDisplay() {
                let text = `<h3>Practice...</h3><br>
                    multiply roman numeral gain based on the amount of total roman numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.rn.total.add(1).pow(0.2);
            },
            cost: new Decimal(10),
        },
        13: {
            fullDisplay() {
                let text = `<h3>Again</h3><br>
                    multiply arabic numeral gain by ` + format(this.effect()) + ` when you have less than ` + format(this.cap()) + ` arabic numerals.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return 10;
            },
            cap() {
                if (hasUpgrade('rn', 23)) return new Decimal(10).mul(upgradeEffect('rn', 23));
                return 10;
            },
            cost: new Decimal(30),
        },
        14: {
            fullDisplay() {
                let text = `<h3>Faster</h3><br>
                    multiply arabic numeral generation by ` + format(this.effect()) + ` when you have less than ` + format(this.cap()) + ` arabic numerals.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                if (hasUpgrade('rn', 24)) return new Decimal(2).mul(upgradeEffect('rn', 24));
                return 2;
            },
            cap() {
                cap = new Decimal(50);
                if (hasUpgrade('rn', 24)) cap = cap.mul(upgradeEffect('rn', 24));
                if (hasUpgrade('rn', 34)) cap = cap.mul(upgradeEffect('rn', 34));
                return cap;
            },
            cost: new Decimal(100),
        },
        15: {
            fullDisplay() {
                let text = `<h3>Repetitive</h3><br>
                    multiply arabic numeral gain based on the amount of arabic numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.points.add(1).pow(0.1);
            },
            cost: new Decimal(350),
        },
        21: {
            fullDisplay() {
                let text = `<h3>Calculator</h3><br>
                    shows the arabic numeral equivalent to all roman numerals alongside the normal values.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                return text;
            },
            cost: new Decimal(600),
            unlocked() {
                return player.rn.upgrades.length >= 5;
            },
        },
        22: {
            fullDisplay() {
                let text = `<h3>Makes Perfect</h3><br>
                    multiply roman numeral gain based on your best roman numerals.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.rn.best.mul(1000).add(1).pow(0.15);
            },
            cost: new Decimal(1000),
            unlocked() {
                return player.rn.upgrades.length >= 5;
            },
        },
        23: {
            fullDisplay() {
                let text = `<h3>Again, Again</h3><br>
                    multiply the cap of <b>Again</b> by ` + format(this.effect()) + `.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                if (hasUpgrade('rn', 33)) return new Decimal(10).mul(upgradeEffect('rn', 33));
                return 10;
            },
            cost: new Decimal(10000),
            unlocked() {
                return player.rn.upgrades.length >= 5;
            },
        },
        24: {
            fullDisplay() {
                let text = `<h3>Faster, Faster</h3><br>
                    multiply the effect and cap of <b>Faster</b> by ` + format(this.effect()) + `.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return 5;
            },
            cost: new Decimal(30000),
            unlocked() {
                return player.rn.upgrades.length >= 5;
            },
        },
        25: {
            fullDisplay() {
                let text = `<h3>Patterns</h3><br>
                    multiply arabic numeral gain based on the amount of arabic numerals you have.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.points.div(50).add(1).pow(0.5);
            },
            cost: new Decimal(100000),
            unlocked() {
                return player.rn.upgrades.length >= 5;
            },
        },
        31: {
            fullDisplay() {
                let text = `<h3>Priorities</h3><br>
                    you can change the priority of calculator values.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                return text;
            },
            cost: new Decimal(250000),
            unlocked() {
                return player.rn.upgrades.length >= 10;
            },
        },
        32: {
            fullDisplay() {
                let text = `<h3>Studying</h3><br>
                    multiply roman numeral gain based on your best roman numerals.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.rn.best.mul(20000).add(1).pow(0.075);
            },
            cost: new Decimal(500000),
            unlocked() {
                return player.rn.upgrades.length >= 10;
            },
        },
        33: {
            fullDisplay() {
                let text = `<h3>Cycle</h3><br>
                    multiply the effect of <b>Again, Again</b> by ` + format(this.effect()) + `.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return 100;
            },
            cost: new Decimal(2000000),
            unlocked() {
                return player.rn.upgrades.length >= 10;
            },
        },
        34: {
            fullDisplay() {
                let text = `<h3>Fastest</h3><br>
                    multiply the cap of <b>Faster</b> by ` + format(this.effect()) + `.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return 200;
            },
            cost: new Decimal(10000000),
            unlocked() {
                return player.rn.upgrades.length >= 10;
            },
        },
        35: {
            fullDisplay() {
                let text = `<h3>Correlation</h3><br>
                    multiply arabic numeral gain based on your best roman numerals.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                if (player.nerdMode) text += '';
                return text;
            },
            effect() {
                return player.rn.best.div(100).add(1).pow(0.2);
            },
            cost: new Decimal(25000000),
            unlocked() {
                return player.rn.upgrades.length >= 10;
            },
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
        12: {
            display() {
                if (!player.rn.calc) return '<h3>turn on calculator to access';
                if (player.rn.upCalc) return '<h3>currently prioritizing arabic numerals';
                return '<h3>currently prioritizing roman numerals';
            },
            canClick() {
                if (player.rn.calc) return true;
            },
            onClick() {
                player.rn.upCalc = !player.rn.upCalc;
            },
            unlocked() {
                return hasUpgrade('rn', 31);
            },
        },
    },
});

addLayer('d', {
    name: 'digits',
    symbol: 'D',
    row: 0,
    position: 1,
    tooltip() {
        return formatWhole(player.d.points) + ' digits';
    },
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        number: new Decimal(0),
        meta: '',
        limited: false,
    }},
    color: '#444444',
    resource: 'digits',
    baseResource: 'arabic numerals',
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(1e10),
    type: 'static',
    exponent: 1,
    gainMult() {
        let gain = new Decimal(1);
        return gain;
    },
    gainExp() {
        return new Decimal(1);
    },
    prestigeButtonText() {
        let resetGain = new Decimal(tmp.d.resetGain), text = '';
        if (player.d.points.lt(1e3)) text = 'Reset for ';
        text += '+<b>' + formatWhole(resetGain) + '</b> digits';
        if (resetGain.lt(100)&&player.d.points.lt(1e3)) text += '<br><br>Next at ' + format(tmp.d.nextAt) + ' arabic numerals';
        return text;
    },
    hotkeys: [{
        key: 'd', // Use uppercase if it's combined with shift, or 'ctrl+x' for holding down ctrl.
        description: 'D: reset your arabic numerals for digits',
        onPress() { if (player.d.unlocked) doReset('d') },
    }],
    effect() {
        return player.d.points.mul(0.1).add(1).mul(player.d.number.add(1).pow(0.2));
    },
    layerShown() {
        return true;
    },
    tabFormat: [
        ['display-text',
            function() { return 'You have <h2 class="layer-d">' + formatWhole(player.d.points) + '</h2> digits, and your number is <h2 class="layer-d">' + formatWhole(player.d.number) + '</h2>, which multiplies arabic numeral generation by <h2 class="layer-d">' + format(tmp.d.effect) + '</h2>x'},
        ],
        'blank',
        'prestige-button',
        ['display-text',
            function() {
                let text = '';
                if (player.d.limited) text = ' (maxed)';
                return 'You have ' + format(player.points) + ' arabic numerals<br><br>'
                    + 'Your best digits is ' + formatWhole(player.d.best) + '<br>'
                    + 'You have made a total of ' + formatWhole(player.d.total) + ' digits<br><br>'
                    + 'Your number is ' + formatWhole(player.d.number) + text;
            },
        ],
        'grid',
        'blank',
        'clickables',
        'blank',
    ],
    update(diff) {
        let limit = new Decimal(2).pow(player.d.points).round().sub(1);
        if (player.d.number.gte(limit)) {
            player.d.number = limit;
            player.d.limited = true;
        } else {
            player.d.limited = false;
        };
        player.d.meta = (player.d.number.toNumber()).toString(2);
        let meta = player.d.meta;
        if ((tmp.d.grid.cols - meta.length) == 0) return;
        for (let i = 0; i < (tmp.d.grid.cols - meta.length); i++) {
            player.d.meta = '0' + player.d.meta;
        };
    },
    grid: {
        rows: 1,
        cols() {
            return player.d.points.toNumber();
        },
        maxCols: 99,
        getStartData(id) {
            return 0;
        },
        getUnlocked(id) { // Default
            return true;
        },
        getCanClick(data, id) {
            return false;
        },
        getDisplay(data, id) {
            cols = this.cols();
            id = id - 101;
            data = player.d.meta.charAt(id);
            return '<h2>' + data;
        },
        getStyle(data, id) {
            return {'height':'50px','width':'50px','border-radius':'50%'};
        },
    },
    clickables: {
        11: {
            display() {
                return '<h3>Make number 1 larger';
            },
            canClick() {
                return true;
            },
            onClick() {
                player.d.number = player.d.number.add(1);
            },
        },
    },
});
