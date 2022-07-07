addLayer('N', {
    name: 'notes',
    symbol: 'N',
    row: 'side',
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    color: '#cccccc',
    resource: 'notes',
    type: 'none',
    layerShown() {
        return true;
    },
    tabFormat: [
        ['display-text',
            function() { return 'You have <h2 class="layer-N">' + formatWhole(player.N.points) + '</h2> notes' },
        ],
        'blank',
        ['display-text',
            function() {
                text = '<h3>Note #1:</h3><br><br>'
                    + 'N ----- 0 ----- 0<br>'
                    + 'I ----- 1 ----- 1<br>'
                    + 'V ----- 5 ----- 5<br>'
                    + 'X ----- 10 ----- 10<br>'
                    + 'L ----- 50 ----- 50<br>'
                    + 'C ----- 100 ----- 100<br>'
                    + 'D ----- 500 ----- 500<br>'
                    + '&#8576 (U+2180) ----- 1,000 ----- 1k<br>'
                    + '&#8577 (U+2181) ----- 5,000 ----- 5k<br>'
                    + '&#8578 (U+2182) ----- 10,000 ----- 10k<br>'
                    + '&#8583 (U+2187) ----- 50,000 ----- 50k<br>'
                    + '&#8584 (U+2188) ----- 100,000 ----- 100k<br>'
                return text;
            },
        ],
        'blank',
    ],
});

addLayer('rn', {
    name: 'roman numerals',
    symbol: 'RN',
    row: 0,
    position: 0,
    branches: ['d'],
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
        overCalc: false,
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
    softcap: new Decimal("1e1000"),
    softcapPower() {
        if (hasUpgrade('d', 22)) {
            if (hasUpgrade('d', 33)) {
                if (hasUpgrade('d', 44)) {
                    if (hasUpgrade('d', 55)) {
                        if (hasUpgrade('d', 65)) {
                            if (hasUpgrade('d', 75)) {
                                if (hasUpgrade('d', 85)) return 0.88;
                                return 0.875;
                            };
                            return 0.85;
                        };
                        return 0.825;
                    };
                    return 0.8;
                };
                return 0.75;
            };
            return 0.5;
        };
        return 0.2;
    },
    prestigeButtonText() {
        let resetGain = new Decimal(tmp.rn.resetGain), text = '';
        if (player.rn.points.lt(1e3)) text = 'Reset for ';
        text += '+<b>' + numeralFormat(resetGain) + '</b> roman numerals';
        if (resetGain.lt(100) && player.rn.points.lt(1e3)) text += '<br><br>Next at ' + format(tmp.rn.nextAt) + ' arabic numerals';
        return text;
    },
    resetsNothing() {
        return hasMilestone('d', 5);
    },
    passiveGeneration() {
        if (hasMilestone('d', 6)) return 10;
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
            function() {
                if (player.rn.points.gte('1e1000')) return '<h2 class="layer-rn">' + numeralFormat(player.rn.points) + '</h2> roman numerals';
                return 'You have <h2 class="layer-rn">' + numeralFormat(player.rn.points) + '</h2> roman numerals';
            },
        ],
        'blank',
        'prestige-button',
        ['display-text',
            function() {
                text = 'You have ' + format(player.points) + ' arabic numerals<br>';
                if (tmp.rn.passiveGeneration) text += 'You are gaining ' + numeralFormat(tmp.rn.resetGain.mul(tmp.rn.passiveGeneration)) + ' roman numerals per second<br>';
                text += '<br>Your best roman numerals is ' + numeralFormat(player.rn.best) + '<br>';
                text += 'You have made a total of ' + numeralFormat(player.rn.total) + ' roman numerals';
                return text;
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
                let eff = new Decimal(10);
                if (hasUpgrade('rn', 43)) eff = eff.mul(upgradeEffect('rn', 43));
                return eff;
            },
            cap() {
                cap = new Decimal(10);
                if (hasUpgrade('rn', 23)) cap = cap.mul(upgradeEffect('rn', 23));
                if (hasUpgrade('rn', 42)) cap = cap.mul(upgradeEffect('rn', 42));
                return cap;
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
                let eff = new Decimal(2);
                if (hasUpgrade('rn', 24)) eff = eff.mul(upgradeEffect('rn', 24));
                if (hasUpgrade('rn', 43)) eff = eff.mul(upgradeEffect('rn', 43));
                return eff;
            },
            cap() {
                cap = new Decimal(50);
                if (hasUpgrade('rn', 24)) cap = cap.mul(upgradeEffect('rn', 24));
                if (hasUpgrade('rn', 34)) cap = cap.mul(upgradeEffect('rn', 34));
                if (hasUpgrade('rn', 42)) cap = cap.mul(upgradeEffect('rn', 42));
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
        41: {
            fullDisplay() {
                let text = `<h3>Override</h3><br>
                    you can override non-calculator values with calculator values.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                return text;
            },
            cost: new Decimal(1e50),
            unlocked() {
                return hasMilestone('d', 2);
            },
        },
        42: {
            fullDisplay() {
                let text = `<h3>Uncapped</h3><br>
                    multiply the caps of <b>Again</b> and <b>Faster</b> based on your best roman numerals.<br>
                    Currently: ` + format(this.effect()) + `x<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                return text;
            },
            effect() {
                let eff = player.rn.best.mul(1e25).add(1).pow(0.9);
                if (hasUpgrade('rn', 43)) eff = eff.mul(upgradeEffect('rn', 43));
                return eff;
            },
            cost: new Decimal(1e66),
            unlocked() {
                return hasMilestone('d', 3);
            },
        },
        43: {
            fullDisplay() {
                let text = `<h3>To the Sky</h3><br>
                    multiply the effect of <b>Again</b>, <b>Faster</b>, and <b>Uncapped</b> by ` + format(this.effect()) + `.<br><br>
                    Cost: ` + numeralFormat(this.cost) + ` roman numerals`;
                return text;
            },
            effect() {
                return 200;
            },
            cost: new Decimal(1e80),
            unlocked() {
                return hasMilestone('d', 4);
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
                if (player.rn.overCalc) return '<h3>turn off override to access';
                if (player.rn.upCalc) return '<h3>currently prioritizing arabic numerals';
                return '<h3>currently prioritizing roman numerals';
            },
            canClick() {
                if (player.rn.calc && !player.rn.overCalc) return true;
            },
            onClick() {
                player.rn.upCalc = !player.rn.upCalc;
            },
            unlocked() {
                return hasUpgrade('rn', 31);
            },
        },
        13: {
            display() {
                if (!player.rn.calc) return '<h3>turn on calculator to access';
                if (player.rn.overCalc) return '<h3>override active';
                return '<h3>override inactive';
            },
            canClick() {
                if (player.rn.calc) return true;
            },
            onClick() {
                player.rn.overCalc = !player.rn.overCalc;
            },
            unlocked() {
                return hasUpgrade('rn', 41);
            },
        },
    },
});

addLayer('d', {
    name: 'digits',
    symbol: 'D',
    row: 0,
    position: 1,
    branches: ['i'],
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        max: new Decimal(99),
        number: new Decimal(0),
        clickPower: new Decimal(1),
        meta: '',
        limited: false,
        timer: 0,
        numberUpgradeAuto: false,
        baseUpAuto: false,
        numberButtonAuto: false,
        digitAuto: false,
    }},
    color: '#666666',
    resource: 'digits',
    baseResource: 'arabic numerals',
    baseAmount() {
        return player.points;
    },
    requires: new Decimal(1e10),
    type: 'custom',
    exponent() {
        if (hasUpgrade('d', 11)) {
            if (hasUpgrade('d', 21)) {
                if (hasUpgrade('d', 31)) {
                    if (hasUpgrade('d', 41)) {
                        if (hasUpgrade('d', 51)) {
                            if (hasUpgrade('d', 61)) {
                                if (hasUpgrade('d', 71)) {
                                    if (hasUpgrade('d', 81)) return 1.49;
                                    return 1.5;
                                };
                                return 1.55;
                            };
                            return 1.575;
                        };
                        return 1.6;
                    };
                    return 1.65;
                };
                return 1.7;
            };
            return 1.75;
        };
        return 1.2;
    },
    gainMult() {
        let gain = new Decimal(1);
        if (hasUpgrade('d', 42)) gain = gain.div(upgradeEffect('d', 42));
        if (hasUpgrade('d', 52)) gain = gain.div(upgradeEffect('d', 52));
        if (hasUpgrade('d', 62)) gain = gain.div(upgradeEffect('d', 62));
        if (hasUpgrade('d', 72)) gain = gain.div(upgradeEffect('d', 72));
        if (hasUpgrade('d', 73)) gain = gain.div(upgradeEffect('d', 73));
        if (hasUpgrade('d', 83)) gain = gain.div(upgradeEffect('d', 83));
        if (player.i.unlocked) gain = gain.div(player.i.unitEffect);
        return gain;
    },
    canBuyMax() {
        return hasMilestone('d', 16);
    },
    prestigeButtonText() {
        if (player.d.points.gte(player.d.max)) return '<b>MAXED';
        let text = 'Reset for +<b>' + formatWhole(tmp.d.resetGain) + '</b> ' + tmp.d.resource + '<br><br>';
        if (player.d.points.lt(1000)) {
            if (tmp.d.baseAmount.gte(tmp.d.nextAt) && tmp.d.canBuyMax) text += 'Next:';
            else text += 'Req:';
        };
        text += ' ' + formatWhole(tmp.d.baseAmount) + ' / ';
        if (tmp.d.roundUpCost) text += formatWhole(tmp.d.nextAtDisp);
        else text += format(tmp.d.nextAtDisp);
        text += ' ' + tmp.d.baseResource;
        return text;
    },
    getResetGain() {
        if (player.d.points.gte(player.d.max)) return new Decimal(0);
        if ((!tmp.d.canBuyMax) || tmp.d.baseAmount.lt(tmp.d.requires)) return new Decimal(1);
		let gain = tmp.d.baseAmount.div(tmp.d.requires).div(tmp.d.gainMult).max(1).log(tmp.d.base).mul(tmp.d.gainExp).pow(Decimal.pow(tmp.d.exponent, -1));
		gain = gain.mul(tmp.d.directMult);
        if (player.d.points.add(gain.floor().sub(player.d.points).add(1).max(1)).gt(player.d.max)) return new Decimal(player.d.max).sub(player.d.points);
		return gain.floor().sub(player.d.points).add(1).max(1);
    },
    getNextAt(canMax = false) {
        if (!tmp.d.canBuyMax) canMax = false;
		let amt = player.d.points;
		if (canMax && tmp.d.baseAmount.gte(tmp.d.nextAt)) amt = amt.add(tmp.d.resetGain);
        amt = amt.div(tmp.d.directMult);
        let extraCost = Decimal.pow(tmp.d.base, amt.pow(tmp.d.exponent).div(tmp.d.gainExp)).mul(tmp.d.gainMult);
		let cost = extraCost.mul(tmp.d.requires).max(tmp.d.requires);
		if (tmp.d.roundUpCost) cost = cost.ceil();
		return cost;
    },
    canReset() {
        if (player.d.points.gte(player.d.max)) return false;
        return tmp.d.baseAmount.gte(tmp.d.nextAt);
    },
    prestigeNotify() {
        if (tmp.d.autoPrestige || tmp.d.passiveGeneration) return false;
        return tmp.d.canReset;
    },
    resetsNothing() {
        return hasMilestone('i', 3);
    },
    autoPrestige() {
        return player.d.digitAuto;
    },
    hotkeys: [{
        key: 'd', // Use uppercase if it's combined with shift, or 'ctrl+x' for holding down ctrl.
        description: 'D: reset your arabic numerals for digits',
        onPress() { if (player.d.unlocked) doReset('d') },
    }],
    effect() {
        let logValue = new Decimal(1);
        if (hasMilestone('d', 14)) logValue = new Decimal(0.0001);
        else if (hasMilestone('d', 13)) logValue = new Decimal(0.001);
        else if (hasMilestone('d', 12)) logValue = new Decimal(0.005);
        else if (hasMilestone('d', 11)) logValue = new Decimal(0.02);
        else if (hasMilestone('d', 10)) logValue = new Decimal(0.1);
        else if (hasMilestone('d', 1)) logValue = new Decimal(0.2);
        else if (hasMilestone('d', 0)) logValue = new Decimal(0.5);
        if (getBuyableAmount('d', 02)) logValue = logValue.div(buyableEffect('d', 02));
        let eff = player.d.number.add(1).log(logValue.add(1)).mul(player.d.points);
        if (getBuyableAmount('d', 91)) eff = eff.mul(new Decimal(2).pow(getBuyableAmount('d', 91)));
        if (hasUpgrade('d', 32)) eff = eff.mul(upgradeEffect('d', 32));
        if (hasUpgrade('d', 43)) eff = eff.mul(upgradeEffect('d', 43));
        if (hasUpgrade('d', 54)) eff = eff.mul(upgradeEffect('d', 54));
        if (hasUpgrade('d', 64)) eff = eff.mul(upgradeEffect('d', 64));
        if (hasUpgrade('d', 74)) eff = eff.mul(upgradeEffect('d', 74));
        if (hasUpgrade('d', 84)) eff = eff.mul(upgradeEffect('d', 84));
        return eff;
    },
    layerShown() {
        return true;
    },
    tabFormat: {
        "Number": {
            content: [
                ['display-text',
                    function() {return 'You have <h2 class="layer-d">' + formatWhole(player.d.points) + '</h2> digits, and your number is <h2 class="layer-d">' + formatWhole(player.d.number) + '</h2>, which increases arabic numeral generation by +<h2 class="layer-d">' + format(tmp.d.effect) + '</h2>%'},
                ],
                'blank',
                'prestige-button',
                'resource-display',
                'grid',
                'blank',
                ['row', [['buyables', '1'], 'clickables', ['buyables', '2']]],
                ['blank', '13px'],
                ['row', [['buyables', '5'], ['buyables', '3'], ['buyables', '6']]],
                ['blank', '13px'],
                ['row', [['buyables', '7'], ['buyables', '4'], ['buyables', '8']]],
                ['blank', '5px'],
                ['row', [['buyables', '0']]],
            ],
        },
        "Milestones": {
            content: [
                ['display-text',
                    function() { return 'You have <h2 class="layer-d">' + formatWhole(player.d.points) + '</h2> digits, and your number is <h2 class="layer-d">' + formatWhole(player.d.number) + '</h2>, which increases arabic numeral generation by +<h2 class="layer-d">' + format(tmp.d.effect) + '</h2>%'},
                ],
                'blank',
                'prestige-button',
                'resource-display',
                'milestones',
            ],
        },
        "Base Up": {
            content: [
                ['display-text',
                    function() { return 'You have <h2 class="layer-d">' + formatWhole(player.d.points) + '</h2> digits, and your number is <h2 class="layer-d">' + formatWhole(player.d.number) + '</h2>, which increases arabic numeral generation by +<h2 class="layer-d">' + format(tmp.d.effect) + '</h2>%'},
                ],
                'blank',
                'prestige-button',
                'resource-display',
                'blank',
                ['buyables', '9'],
            ],
            unlocked() {
                return hasMilestone('d', 9);
            },
        },
        "Limit Break": {
            content: [
                ['display-text',
                    function() { return 'You have <h2 class="layer-d">' + formatWhole(player.d.points) + '</h2> digits, and your number is <h2 class="layer-d">' + formatWhole(player.d.number) + '</h2>, which increases arabic numeral generation by +<h2 class="layer-d">' + format(tmp.d.effect) + '</h2>%'},
                ],
                'blank',
                'prestige-button',
                'resource-display',
                'blank',
                ['display-text',
                    function() { return 'Your digit limit is <h2 class="layer-d">' + formatWhole(player.d.max) + '</h2>'},
                ],
                'blank',
                'upgrades',
            ],
            unlocked() {
                return hasMilestone('d', 15);
            },
        },
    },
    update(diff) {
        let cap = new Decimal(99);
        if (hasUpgrade('d', 52)) cap = cap.add(1);
        if (hasUpgrade('d', 11)) cap = cap.mul(2);
        if (hasUpgrade('d', 42)) cap = cap.mul(1.5);
        if (hasUpgrade('d', 62)) cap = cap.mul(1.5);
        if (hasUpgrade('d', 72)) cap = cap.mul(4);
        if (hasMilestone('d', 19)) cap = cap.mul(2);
        if (hasUpgrade('d', 82)) cap = cap.mul(5);
        player.d.max = cap;
        player.d.timer += diff;
        if (player.d.timer >= new Decimal(1).div(buyableEffect('d', 41))) {
            player.d.number = player.d.number.add(buyableEffect('d', 31));
            if (player.d.numberButtonAuto) player.d.number = player.d.number.add(player.d.clickPower).round();
            player.d.timer = 0;
        };
        power = new Decimal(1);
        if (getBuyableAmount('d', 11).gt(0)) power = power.add(buyableEffect('d', 11));
        if (getBuyableAmount('d', 21).gt(0)) power = power.mul(buyableEffect('d', 21));
        player.d.clickPower = power;
        let base = 2;
        if (getBuyableAmount('d', 91).gt(0)) base = buyableEffect('d', 91).toNumber();
        let limit = new Decimal(base).pow(player.d.points).round().sub(1);
        if (player.d.number.gte(limit)) {
            player.d.number = limit;
            player.d.limited = true;
        } else {
            player.d.limited = false;
        };
        if (buyableEffect('d', 91).gte(10)) {
            player.d.meta = 'base 10 achieved';
            return;
        };
        player.d.meta = (player.d.number.toNumber()).toString(base);
        let meta = player.d.meta;
        if ((tmp.d.grid.cols - meta.length) == 0) return;
        for (let i = 0; i < (tmp.d.grid.cols - meta.length); i++) {
            player.d.meta = '0' + player.d.meta;
        };
    },
    automate() {
        if (player.d.numberUpgradeAuto) {
            for (upgrade in tmp.d.buyables) {
                if (upgrade == "layer" || upgrade == "rows" || upgrade == "cols" || (upgrade == "91" && !player.d.baseUpAuto)) continue;
                if (tmp.d.buyables[upgrade].unlocked && tmp.d.buyables[upgrade].canBuy) {
                    player.points = player.points.sub(tmp.d.buyables[upgrade].cost);
                    setBuyableAmount('d', upgrade, getBuyableAmount('d', upgrade).add(1));
                };
            };
        } else if (player.d.baseUpAuto) {
            if (tmp.d.buyables[91].unlocked && tmp.d.buyables[91].canBuy) {
                player.points = player.points.sub(tmp.d.buyables[91].cost);
                setBuyableAmount('d', 91, getBuyableAmount('d', 91).add(1));
            };
        };
    },
    grid: {
        rows: 1,
        cols() {
            if (hasUpgrade('d', 11)) return 2;
            if (buyableEffect('d', 91).gte(10)) return 1;
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
            if (buyableEffect('d', 91).gte(10) && id == 101) return '<h2>Base ' + formatWhole(buyableEffect('d', 91)) + ' achieved';
            if (hasUpgrade('d', 11) && id == 102) return '<h2>Limit broken';
            if (player.d.limited) return '<h2>' + formatWhole(buyableEffect('d', 91).sub(1));
            id = id - 101;
            data = player.d.meta.charAt(id);
            setGridData('d', id + 101, data);
            return '<h2>' + data;
        },
        getStyle(data, id) {
            if (buyableEffect('d', 91).gte(10) && id == 101) return {'height':'30px','width':'170px','border-radius':'0%','color':'red'};
            if (hasUpgrade('d', 11) && id == 102) return {'height':'30px','width':'130px','border-radius':'0%','color':'red'};
            let color = 'black';
            if (data != '0' || player.d.limited) color = 'red';
            if (this.cols() < 25) return {'height':'50px','width':'50px','border-radius':'50%','color':color};
            if (this.cols() < 40) return {'height':'45px','width':'45px','border-radius':'50%','color':color};
            if (this.cols() < 60) return {'height':'40px','width':'40px','border-radius':'50%','color':color};
            if (this.cols() < 80) return {'height':'35px','width':'35px','border-radius':'50%','color':color};
            return {'height':'30px','width':'30px','border-radius':'50%','color':color};
        },
    },
    clickables: {
        11: {
            display() {
                return '<h3>Make number ' + formatWhole(player.d.clickPower) + ' larger';
            },
            canClick() {
                return true;
            },
            onClick() {
                player.d.number = player.d.number.add(player.d.clickPower).round();
            },
        },
    },
    buyables: {
        11: {
            cost() {
                return new Decimal(1e5).pow(getBuyableAmount(this.layer, this.id).div(5).add(1)).mul(1e10);
            },
            effect() {
                let eff = getBuyableAmount(this.layer, this.id);
                if (getBuyableAmount('d', 51).gt(0)) eff = eff.mul(buyableEffect('d', 51));
                return eff;
            },
            display() {
                return `<h3>One Up</h3><br>`
                    + `Increase the effect of the button to the right by 1.<br>`
                    + `Currently: +` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit() {
                lim = new Decimal(250);
                if (getBuyableAmount('d', 71).gt(0)) lim = lim.add(buyableEffect('d', 71));
                return lim;
            },
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        21: {
            cost() {
                let costing = new Decimal(1e10).pow(getBuyableAmount(this.layer, this.id).add(1)).mul(1e5);
                if (getBuyableAmount('d', 81).gt(0)) costing = costing.div(buyableEffect('d', 81));
                if (getBuyableAmount('d', 03).gt(0)) costing = costing.div(buyableEffect('d', 03));
                return costing;
            },
            effect() {
                return new Decimal(3).pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                return `<h3>Triple</h3><br>`
                    + `multiply the effect of the button to the left by 3.<br>`
                    + `Currently: ` + formatWhole(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 1000,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        31: {
            cost() {
                return new Decimal(1e5).pow(getBuyableAmount(this.layer, this.id).add(1)).mul(1e20);
            },
            effect() {
                let eff = getBuyableAmount(this.layer, this.id).mul(1.5).floor();
                if (getBuyableAmount('d', 61).gt(0)) eff = eff.mul(buyableEffect('d', 61));
                return eff;
            },
            display() {
                return `<h3>Lazing</h3><br>`
                    + `gain +1.5 passive number increase, rounded down.<br>`
                    + `Currently: +` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 200,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        41: {
            cost() {
                return new Decimal(1e10).pow(getBuyableAmount(this.layer, this.id).add(1)).mul(1e20);
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).mul(10).div(100).add(1);
            },
            display() {
                return `<h3>Rapid Idle</h3><br>`
                    + `passive number increase is +10% faster.<br>`
                    + `Currently: +` + formatWhole(getBuyableAmount(this.layer, this.id).mul(10)) + `%<br>`
                    + `Increment: ` + formatTime(new Decimal(1).div(buyableEffect(this.layer, this.id))) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 89,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        51: {
            cost() {
                return new Decimal(1e50).pow(getBuyableAmount(this.layer, this.id).div(5).add(1)).mul(1e150);
            },
            effect() {
                let effBase = new Decimal(2);
                if (getBuyableAmount('d', 01).gt(0)) effBase = effBase.mul(buyableEffect('d', 01));
                return effBase.pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                let text = `<h3>Up the Up</h3><br>`
                    + `Multiply the effect of the upgrade directly above by `;
                if (getBuyableAmount('d', 01).gt(0)) text += format(buyableEffect('d', 01).mul(2));
                else text += '2';
                text += `.<br>`
                    + `Currently: ` + formatWhole(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
                return text;
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 500,
            unlocked() {
                return hasMilestone('d', 7);
            },
        },
        61: {
            cost() {
                let costing = new Decimal(1e50).pow(getBuyableAmount(this.layer, this.id).div(5).add(1)).mul(1e150);
                if (getBuyableAmount('d', 81).gt(0)) costing = costing.div(buyableEffect('d', 81));
                if (getBuyableAmount('d', 03).gt(0)) costing = costing.div(buyableEffect('d', 03));
                return costing;
            },
            effect() {
                return new Decimal(5).pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                return `<h3>Worth the Time</h3><br>`
                    + `Multiply the effect of the upgrade to the left by 5.<br>`
                    + `Currently: ` + formatWhole(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            unlocked() {
                return hasMilestone('d', 7);
            },
        },
        71: {
            cost() {
                return new Decimal(1e10).pow(getBuyableAmount(this.layer, this.id).add(1)).mul(1e240);
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).mul(15);
            },
            display() {
                return `<h3>Higher!</h3><br>`
                    + `increase the cap of <b>One Up</b> by 15.<br>`
                    + `Currently: +` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 20,
            unlocked() {
                return hasMilestone('d', 8);
            },
        },
        81: {
            cost() {
                let costing = new Decimal(1e20).pow(getBuyableAmount(this.layer, this.id).add(1)).mul(1e230);
                if (getBuyableAmount('d', 03).gt(0)) costing = costing.div(buyableEffect('d', 03));
                return costing;
            },
            effect() {
                return new Decimal(1e10).pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                return `<h3>Cheap</h3><br>`
                    + `divide the cost of the upgrades above by 1e10.<br>`
                    + `Currently: /` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            unlocked() {
                return hasMilestone('d', 8);
            },
        },
        91: {
            cost() {
                if (getBuyableAmount(this.layer, this.id).eq(0)) return new Decimal(6e29);
                if (getBuyableAmount(this.layer, this.id).eq(1)) return new Decimal(1e47);
                if (getBuyableAmount(this.layer, this.id).eq(2)) return new Decimal(4e59);
                if (getBuyableAmount(this.layer, this.id).eq(3)) return new Decimal(1e69);
                if (getBuyableAmount(this.layer, this.id).eq(4)) return new Decimal(1e77);
                if (getBuyableAmount(this.layer, this.id).eq(5)) return new Decimal(4e83);
                if (getBuyableAmount(this.layer, this.id).eq(6)) return new Decimal(2e89);
                if (getBuyableAmount(this.layer, this.id).eq(7)) return new Decimal(2e94);
                return new Decimal(1e99);
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).add(2);
            },
            display() {
                return `<h3>Base Up</h3><br>`
                    + `upgrade your numbers to the next base, which allows for higher numbers. also multiplies the number effect by 2.<br>`
                    + `Currently: base ` + formatWhole(buyableEffect(this.layer, this.id)) + `<br>`
                    + `and ` + formatWhole(new Decimal(2).pow(getBuyableAmount(this.layer, this.id))) + `x<br><br>`
                    + `Cost: number ` + format(this.cost()) + `<br><br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.d.number.gte(this.cost());
            },
            buy() {
                player.d.number = player.d.number.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'border-radius':'50%'},
            purchaseLimit: 8,
            unlocked() {
                return hasMilestone('d', 9);
            },
        },
        01: {
            cost() {
                let costing = new Decimal(1e250).pow(getBuyableAmount(this.layer, this.id).add(1)).mul('1e750');
                if (hasUpgrade('d', 63)) costing = costing.div(upgradeEffect('d', 63));
                return costing;
            },
            effect() {
                return new Decimal(1.25).pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                return `<h3>Up Even More</h3><br>`
                    + `Multiply the base effect of <b>Up the Up</b> by 1.25.<br>`
                    + `Currently: ` + format(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 25,
            unlocked() {
                return hasMilestone('d', 17);
            },
        },
        02: {
            cost() {
                return new Decimal(1e75).pow(getBuyableAmount(this.layer, this.id).add(1)).mul('1e925');
            },
            effect() {
                return new Decimal(750).pow(getBuyableAmount(this.layer, this.id));
            },
            display() {
                return `<h3>Weaken Chains</h3><br>`
                    + `Divide the logarithm in the number effect formula by 750.<br>`
                    + `Currently: /` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 4,
            unlocked() {
                return hasMilestone('d', 17);
            },
        },
        03: {
            cost() {
                return new Decimal(1e50).pow(getBuyableAmount(this.layer, this.id).add(1)).mul('1e950');
            },
            effect() {
                let eff = new Decimal(1e20).pow(getBuyableAmount(this.layer, this.id));
                if (hasUpgrade('d', 53)) eff = eff.mul(upgradeEffect('d', 53));
                return eff;
            },
            display() {
                return `<h3>Cheapest</h3><br>`
                    + `divide the cost of the upgrades above by 1e20.<br>`
                    + `Currently: /` + formatWhole(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 50,
            unlocked() {
                return hasMilestone('d', 17);
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "30 digits and number 100,000",
            effectDescription: "improves the number effect formula<br>log2 --> log1.5",
            done() {
                return player.d.points.gte(30) && player.d.number.gte(100000);
            },
        },
        1: {
            requirementDescription: "36 digits and number 300,000",
            effectDescription: "improves the number effect formula<br>log1.5 --> log1.2",
            done() {
                return player.d.points.gte(36) && player.d.number.gte(300000);
            },
            unlocked() {
                return hasMilestone('d', 0) || hasMilestone('d', 1);
            },
        },
        2: {
            requirementDescription: "60 digits and number 1,000,000",
            effectDescription: "unlocks a new roman numeral upgrade",
            done() {
                return player.d.points.gte(60) && player.d.number.gte(1000000);
            },
            unlocked() {
                return hasMilestone('d', 1) || hasMilestone('d', 2);
            },
        },
        3: {
            requirementDescription: "80 digits and number 10,000,000",
            effectDescription: "unlocks a second new roman numeral upgrade",
            done() {
                return player.d.points.gte(80) && player.d.number.gte(10000000);
            },
            unlocked() {
                return hasMilestone('d', 2) || hasMilestone('d', 3);
            },
        },
        4: {
            requirementDescription: "99 digits and number 100,000,000",
            effectDescription: "unlocks a third new roman numeral upgrade",
            done() {
                return player.d.points.gte(99) && player.d.number.gte(100000000);
            },
            unlocked() {
                return hasMilestone('d', 3) || hasMilestone('d', 4);
            },
        },
        5: {
            requirementDescription: "number 1e11",
            effectDescription: "roman numerals reset nothing",
            done() {
                return player.d.number.gte(1e11);
            },
            unlocked() {
                return hasMilestone('d', 4) || hasMilestone('d', 5);
            },
        },
        6: {
            requirementDescription: "number 1e15",
            effectDescription: "gain 1,000% of roman numeral gain per second",
            done() {
                return player.d.number.gte(1e15);
            },
            unlocked() {
                return hasMilestone('d', 5) || hasMilestone('d', 6);
            },
        },
        7: {
            requirementDescription: "number 1e16",
            effectDescription: "unlocks two new digit number upgrades",
            done() {
                return player.d.number.gte(1e16);
            },
            unlocked() {
                return hasMilestone('d', 6) || hasMilestone('d', 7);
            },
        },
        8: {
            requirementDescription: "number 1e24",
            effectDescription: "unlocks two new digit number upgrades",
            done() {
                return player.d.number.gte(1e24);
            },
            unlocked() {
                return hasMilestone('d', 7) || hasMilestone('d', 8);
            },
        },
        9: {
            requirementDescription: "360 One Ups",
            effectDescription: "unlock Base Up",
            done() {
                return getBuyableAmount('d', 11).gte(360);
            },
            unlocked() {
                return hasMilestone('d', 8) || hasMilestone('d', 9);
            },
        },
        10: {
            requirementDescription: "number 1e35",
            effectDescription: "improves the number effect formula<br>log1.2 --> log1.1",
            done() {
                return player.d.number.gte(1e35);
            },
            unlocked() {
                return hasMilestone('d', 9) || hasMilestone('d', 10);
            },
        },
        11: {
            requirementDescription: "number 1e36",
            effectDescription: "improves the number effect formula<br>log1.1 --> log1.02",
            done() {
                return player.d.number.gte(1e36);
            },
            unlocked() {
                return hasMilestone('d', 10) || hasMilestone('d', 11);
            },
        },
        12: {
            requirementDescription: "number 1e40",
            effectDescription: "improves the number effect formula<br>log1.02 --> log1.005",
            done() {
                return player.d.number.gte(1e40);
            },
            unlocked() {
                return hasMilestone('d', 11) || hasMilestone('d', 12);
            },
        },
        13: {
            requirementDescription: "number 1e45",
            effectDescription: "improves the number effect formula<br>log1.005 --> log1.001",
            done() {
                return player.d.number.gte(1e45);
            },
            unlocked() {
                return hasMilestone('d', 12) || hasMilestone('d', 13);
            },
        },
        14: {
            requirementDescription: "number 1e66",
            effectDescription: "improves the number effect formula<br>log1.001 --> log1.0001",
            done() {
                return player.d.number.gte(1e66);
            },
            unlocked() {
                return hasMilestone('d', 13) || hasMilestone('d', 14);
            },
        },
        15: {
            requirementDescription: "number 1e99",
            effectDescription: "unlocks Limit Break",
            done() {
                return player.d.number.gte(1e99);
            },
            unlocked() {
                return hasMilestone('d', 14) || hasMilestone('d', 15);
            },
        },
        16: {
            requirementDescription: "number 1e101",
            effectDescription: "you can buy max digits",
            done() {
                return player.d.number.gte(1e101);
            },
            unlocked() {
                return hasMilestone('d', 15) || hasMilestone('d', 16);
            },
        },
        17: {
            requirementDescription: "number 1e111",
            effectDescription: "unlocks three new digit number upgrades",
            done() {
                return player.d.number.gte(1e111);
            },
            unlocked() {
                return hasMilestone('d', 16) || hasMilestone('d', 17);
            },
        },
        18: {
            requirementDescription: "number 1e630",
            effectDescription: "unlock auto press 'make number larger'",
            toggles: [["d", "numberButtonAuto"]],
            done() {
                return player.d.number.gte('1e630');
            },
            unlocked() {
                return hasMilestone('d', 17) || hasMilestone('d', 18);
            },
        },
        19: {
            requirementDescription: "number 1e1750",
            effectDescription: "double the digit limit",
            done() {
                return player.d.number.gte('1e1750');
            },
            unlocked() {
                return hasMilestone('d', 18) || hasMilestone('d', 19);
            },
        },
    },
    upgrades: {
        11: {
            fullDisplay() {
                let text = `<h3>Limit Break</h3><br>
                    double the digit limit, but increase their cost exponent (1.2 --> 1.75)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(99),
            unlocked() {
                return hasMilestone('d', 15);
            },
        },
        21: {
            fullDisplay() {
                let text = `<h3>Digit Bend</h3><br>
                    decrease the digit cost exponent (1.75 --> 1.7)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(109),
            unlocked() {
                return hasUpgrade('d', 11);
            },
        },
        22: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Bend</h3><br>
                    increase roman numeral gain after softcap (^0.2 --> ^0.5)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(126),
            unlocked() {
                return hasUpgrade('d', 11);
            },
        },
        31: {
            fullDisplay() {
                let text = `<h3>Digit Warp</h3><br>
                    decrease the digit cost exponent (1.7 --> 1.65)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(127),
            unlocked() {
                return hasUpgrade('d', 21) && hasUpgrade('d', 22);
            },
        },
        32: {
            fullDisplay() {
                let text = `<h3>Number Warp</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.1);
            },
            cost: new Decimal(148),
            unlocked() {
                return hasUpgrade('d', 21) && hasUpgrade('d', 22);
            },
        },
        33: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Warp</h3><br>
                    increase roman numeral gain after softcap (^0.5 --> ^0.75)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(147),
            unlocked() {
                return hasUpgrade('d', 21) && hasUpgrade('d', 22);
            },
        },
        41: {
            fullDisplay() {
                let text = `<h3>Digit Hole</h3><br>
                    decrease the digit cost exponent (1.65 --> 1.6)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(164),
            unlocked() {
                return hasUpgrade('d', 31) && hasUpgrade('d', 32) && hasUpgrade('d', 33);
            },
        },
        42: {
            fullDisplay() {
                let text = `<h3>Limit Hole</h3><br>
                    multiply the digit limit by 1.5, and divide digit cost requirement by 1e20<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal(1e20);
            },
            cost: new Decimal(197),
            unlocked() {
                return hasUpgrade('d', 31) && hasUpgrade('d', 32) && hasUpgrade('d', 33);
            },
        },
        43: {
            fullDisplay() {
                let text = `<h3>Number Hole</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.025);
            },
            cost: new Decimal(162),
            unlocked() {
                return hasUpgrade('d', 31) && hasUpgrade('d', 32) && hasUpgrade('d', 33);
            },
        },
        44: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Hole</h3><br>
                    increase roman numeral gain after softcap (^0.75 --> ^0.8)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(193),
            unlocked() {
                return hasUpgrade('d', 31) && hasUpgrade('d', 32) && hasUpgrade('d', 33);
            },
        },
        51: {
            fullDisplay() {
                let text = `<h3>Digit Void</h3><br>
                    decrease the digit cost exponent (1.6 --> 1.575)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(199),
            unlocked() {
                return hasUpgrade('d', 41) && hasUpgrade('d', 42) && hasUpgrade('d', 43) && hasUpgrade('d', 44);
            },
        },
        52: {
            fullDisplay() {
                let text = `<h3>Limit Void</h3><br>
                    increase the base digit limit by 1, and divide digit cost requirement by 1e50<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal(1e50);
            },
            cost: new Decimal(217),
            unlocked() {
                return hasUpgrade('d', 41) && hasUpgrade('d', 42) && hasUpgrade('d', 43) && hasUpgrade('d', 44);
            },
        },
        53: {
            fullDisplay() {
                let text = `<h3>Cost Void</h3><br>
                    multiply the effect of <b>Cheapest</b> based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.6);
            },
            cost: new Decimal(228),
            unlocked() {
                return hasUpgrade('d', 41) && hasUpgrade('d', 42) && hasUpgrade('d', 43) && hasUpgrade('d', 44);
            },
        },
        54: {
            fullDisplay() {
                let text = `<h3>Number Void</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.02);
            },
            cost: new Decimal(224),
            unlocked() {
                return hasUpgrade('d', 41) && hasUpgrade('d', 42) && hasUpgrade('d', 43) && hasUpgrade('d', 44);
            },
        },
        55: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Void</h3><br>
                    increase roman numeral gain after softcap (^0.8 --> ^0.825)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(222),
            unlocked() {
                return hasUpgrade('d', 41) && hasUpgrade('d', 42) && hasUpgrade('d', 43) && hasUpgrade('d', 44);
            },
        },
        61: {
            fullDisplay() {
                let text = `<h3>Digit Space</h3><br>
                    decrease the digit cost exponent (1.575 --> 1.55)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(229),
            unlocked() {
                return hasUpgrade('d', 51) && hasUpgrade('d', 52) && hasUpgrade('d', 53) && hasUpgrade('d', 54) && hasUpgrade('d', 55);
            },
        },
        62: {
            fullDisplay() {
                let text = `<h3>Limit Space</h3><br>
                    multiply the digit limit by 1.5, and divide digit cost requirement by 1e75<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal(1e75);
            },
            cost: new Decimal(269),
            unlocked() {
                return hasUpgrade('d', 51) && hasUpgrade('d', 52) && hasUpgrade('d', 53) && hasUpgrade('d', 54) && hasUpgrade('d', 55);
            },
        },
        63: {
            fullDisplay() {
                let text = `<h3>Cost Space</h3><br>
                    divide the cost of <b>Up Even More</b> based on the number you have<br>
                    Effect: /` + format(upgradeEffect(this.layer, this.id)) + `<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(1.1);
            },
            cost: new Decimal(251),
            unlocked() {
                return hasUpgrade('d', 51) && hasUpgrade('d', 52) && hasUpgrade('d', 53) && hasUpgrade('d', 54) && hasUpgrade('d', 55);
            },
        },
        64: {
            fullDisplay() {
                let text = `<h3>Number Space</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.05);
            },
            cost: new Decimal(252),
            unlocked() {
                return hasUpgrade('d', 51) && hasUpgrade('d', 52) && hasUpgrade('d', 53) && hasUpgrade('d', 54) && hasUpgrade('d', 55);
            },
        },
        65: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Space</h3><br>
                    increase roman numeral gain after softcap (^0.825 --> ^0.85)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(277),
            unlocked() {
                return hasUpgrade('d', 51) && hasUpgrade('d', 52) && hasUpgrade('d', 53) && hasUpgrade('d', 54) && hasUpgrade('d', 55);
            },
        },
        71: {
            fullDisplay() {
                let text = `<h3>Digit Star</h3><br>
                    decrease the digit cost exponent (1.55 --> 1.5)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(290),
            unlocked() {
                return hasUpgrade('d', 61) && hasUpgrade('d', 62) && hasUpgrade('d', 63) && hasUpgrade('d', 64) && hasUpgrade('d', 65);
            },
        },
        72: {
            fullDisplay() {
                let text = `<h3>Limit Star</h3><br>
                    multiply the digit limit by 4, and divide digit cost requirement by 1e800<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal('1e800');
            },
            cost: new Decimal(420),
            unlocked() {
                return hasUpgrade('d', 61) && hasUpgrade('d', 62) && hasUpgrade('d', 63) && hasUpgrade('d', 64) && hasUpgrade('d', 65);
            },
        },
        73: {
            fullDisplay() {
                let text = `<h3>Cost Star</h3><br>
                    divide digit cost requirement by 1e700<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal('1e700');
            },
            cost: new Decimal(515),
            unlocked() {
                return hasUpgrade('d', 61) && hasUpgrade('d', 62) && hasUpgrade('d', 63) && hasUpgrade('d', 64) && hasUpgrade('d', 65);
            },
        },
        74: {
            fullDisplay() {
                let text = `<h3>Number Star</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.02);
            },
            cost: new Decimal(352),
            unlocked() {
                return hasUpgrade('d', 61) && hasUpgrade('d', 62) && hasUpgrade('d', 63) && hasUpgrade('d', 64) && hasUpgrade('d', 65);
            },
        },
        75: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Star</h3><br>
                    increase roman numeral gain after softcap (^0.85 --> ^0.875)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(370),
            unlocked() {
                return hasUpgrade('d', 61) && hasUpgrade('d', 62) && hasUpgrade('d', 63) && hasUpgrade('d', 64) && hasUpgrade('d', 65);
            },
        },
        81: {
            fullDisplay() {
                let text = `<h3>Digit Galaxy</h3><br>
                    decrease the digit cost exponent (1.5 --> 1.49)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(5000),
            unlocked() {
                return hasUpgrade('d', 71) && hasUpgrade('d', 72) && hasUpgrade('d', 73) && hasUpgrade('d', 74) && hasUpgrade('d', 75) && getBuyableAmount('i', 32).gte(1);
            },
        },
        82: {
            fullDisplay() {
                let text = `<h3>Limit Galaxy</h3><br>
                    multiply the digit limit by 5<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(3600),
            unlocked() {
                return hasUpgrade('d', 71) && hasUpgrade('d', 72) && hasUpgrade('d', 73) && hasUpgrade('d', 74) && hasUpgrade('d', 75) && getBuyableAmount('i', 32).gte(1);
            },
        },
        83: {
            fullDisplay() {
                let text = `<h3>Cost Galaxy</h3><br>
                    divide digit cost requirement by 1e20,000<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return new Decimal('1e20000');
            },
            cost: new Decimal(5500),
            unlocked() {
                return hasUpgrade('d', 71) && hasUpgrade('d', 72) && hasUpgrade('d', 73) && hasUpgrade('d', 74) && hasUpgrade('d', 75) && getBuyableAmount('i', 32).gte(1);
            },
        },
        84: {
            fullDisplay() {
                let text = `<h3>Number Galaxy</h3><br>
                    multiply the number effect based on the number you have<br>
                    Effect: ` + format(upgradeEffect(this.layer, this.id)) + `x<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            effect() {
                return player.d.number.add(1).pow(0.0025);
            },
            cost: new Decimal(4750),
            unlocked() {
                return hasUpgrade('d', 71) && hasUpgrade('d', 72) && hasUpgrade('d', 73) && hasUpgrade('d', 74) && hasUpgrade('d', 75) && getBuyableAmount('i', 32).gte(1);
            },
        },
        85: {
            fullDisplay() {
                let text = `<h3>Roman Numeral Galaxy</h3><br>
                    increase roman numeral gain after softcap (^0.875 --> ^0.88)<br><br>
                    Cost: ` + formatWhole(this.cost) + ` digits`;
                return text;
            },
            cost: new Decimal(3900),
            unlocked() {
                return hasUpgrade('d', 71) && hasUpgrade('d', 72) && hasUpgrade('d', 73) && hasUpgrade('d', 74) && hasUpgrade('d', 75) && getBuyableAmount('i', 32).gte(1);
            },
        },
    },
});

addLayer('i', {
    name: 'intelligence',
    symbol: 'I',
    row: 1,
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        units: new Decimal(1),
        unitEffect: new Decimal(1),
    }},
    color: '#ccff44',
    resource: 'intelligence',
    baseResource: 'digits',
    baseAmount() {
        return player.d.points;
    },
    requires: new Decimal(600),
    type: 'static',
    exponent: 1,
    gainMult() {
        let gain = new Decimal(1);
        return gain;
    },
    canBuyMax() {
        return false;
    },
    hotkeys: [{
        key: 'i', // Use uppercase if it's combined with shift, or 'ctrl+x' for holding down ctrl.
        description: 'I: reset all previous progress for intelligence',
        onPress() { if (player.d.unlocked) doReset('i') },
    }],
    effect() {
        return new Decimal(10).pow(player.i.points);
    },
    effectDescription() {
        return 'which multiplies arabic numeral generation by <h2 class="layer-i">' + format(tmp.i.effect) + '</h2>x';
    },
    layerShown() {
        return hasMilestone('d', 15) || player.i.unlocked;
    },
    tabFormat: {
        "Milestones": {
            content: [
                'main-display',
                'prestige-button',
                'resource-display',
                'milestones',
            ],
        },
        "Replicator": {
            content: [
                'main-display',
                'prestige-button',
                'resource-display',
                ['display-text',
                    function() {return 'You have <h2 class="layer-i">' + formatWhole(player.i.units) + '</h2> units, which divides the digit cost requirement by <h2 class="layer-i">' + format(player.i.unitEffect) + '</h2>'},
                ],
                'blank',
                ['row', [['buyables', '1'], 'clickables', ['buyables', '2']]],
                ['blank', '13px'],
                ['buyables', '3'],
            ],
            unlocked() {
                return player.i.unlocked;
            },
        },
    },
    update(diff) {
        let power = new Decimal(0.25);
        if (getBuyableAmount('i', 21).gt(0)) power = power.add(buyableEffect('i', 21));
        if (getBuyableAmount('i', 33).gt(0)) power = power.add(buyableEffect('i', 33));
        player.i.unitEffect = player.i.units.add(1).pow(power);
    },
    milestones: {
        0: {
            requirementDescription: "1 intelligence",
            effectDescription: "unlock digit number upgrade autobuyer",
            toggles: [["d", "numberUpgradeAuto"]],
            done() {
                return player.i.points.gte(1);
            },
        },
        1: {
            requirementDescription: "2 intelligence",
            effectDescription: "unlock base up autobuyer",
            toggles: [["d", "baseUpAuto"]],
            done() {
                return player.i.points.gte(2);
            },
        },
        2: {
            requirementDescription: "3 intelligence",
            effectDescription: "unlock digit autobuyer",
            toggles: [["d", "digitAuto"]],
            done() {
                return player.i.points.gte(3);
            },
        },
        3: {
            requirementDescription: "4 intelligence",
            effectDescription: "digits reset nothing",
            done() {
                return player.i.points.gte(4);
            },
        },
    },
    clickables: {
        11: {
            display() {
                if (getBuyableAmount('i', 11).gt(0)) return "<h2>replicate your units " + formatWhole(buyableEffect('i', 11)) + " times";
                return "<h2>replicate your units";
            },
            canClick() {
                if (player.i.unlocked) return true;
                return false;
            },
            onClick() {
                let power = new Decimal(2);
                if (getBuyableAmount('i', 31).gt(0)) power = power.mul(buyableEffect('i', 31));
                for (let num = 0; num < buyableEffect('i', 11).toNumber(); num++) {
                    player.i.units = player.i.units.mul(power);
                };
            },
        },
    },
    buyables: {
        11: {
            cost() {
                return new Decimal('1e1000').pow(getBuyableAmount(this.layer, this.id)).mul('1e2000');
            },
            effect() {
                let eff = new Decimal(2).pow(getBuyableAmount(this.layer, this.id));
                return eff;
            },
            display() {
                return `<h3>Again</h3><br>`
                    + `Multiply the effect of the button to the right by 2.<br>`
                    + `Currently: ` + formatWhole(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 5,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        21: {
            cost() {
                return new Decimal('1e200').pow(getBuyableAmount(this.layer, this.id)).mul('1e2000');
            },
            effect() {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.075);
                return eff;
            },
            display() {
                return `<h3>More Effective</h3><br>`
                    + `Increase the effect scaling of the unit effect by 0.075.<br>`
                    + `Currently: +` + format(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 20,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        31: {
            cost() {
                return new Decimal('1e500').pow(getBuyableAmount(this.layer, this.id)).mul('1e2500');
            },
            effect() {
                let eff = new Decimal(1.1).pow(getBuyableAmount(this.layer, this.id));
                return eff;
            },
            display() {
                return `<h3>Power</h3><br>`
                    + `Multiply replication power by 1.1.<br>`
                    + `Currently: ` + format(buyableEffect(this.layer, this.id)) + `x<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        32: {
            cost() {
                return new Decimal('1e5900');
            },
            effect() {
                let eff = new Decimal(1.1).pow(getBuyableAmount(this.layer, this.id));
                return eff;
            },
            display() {
                return `<h3>Galaxies</h3><br>`
                    + `unlock 5 more Limit Break upgrades.<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            purchaseLimit: 1,
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
        33: {
            cost() {
                return new Decimal('1e250').pow(getBuyableAmount(this.layer, this.id)).mul('1e3000');
            },
            effect() {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25);
                return eff;
            },
            display() {
                return `<h3>Efficiency</h3><br>`
                    + `Increase the effect scaling of the unit effect by 0.25.<br>`
                    + `Currently: +` + format(buyableEffect(this.layer, this.id)) + `<br><br>`
                    + `Cost: ` + format(this.cost()) + ` arabic numerals<br>`
                    + `Amount: ` + formatWhole(getBuyableAmount(this.layer, this.id));
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            style: {'width':'120px','height':'120px'},
            unlocked() {
                return this.canAfford() || getBuyableAmount(this.layer, this.id).gt(0);
            },
        },
    },
});
