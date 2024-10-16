const romanNumerals = [
	["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
	["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
	["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "C&#8576;"],
	["&#8576;"],
];

function romanNumeralFormat(num) {
	// override
	if (hasUpgrade("rn", 21) && player.rn.calc && hasUpgrade("rn", 41) && player.rn.overCalc) return formatWhole(new Decimal(num));
	// setup
	let result = "", resultE = "";
	let places = 0;
	let decimal = new Decimal(num);
	let layer = new Decimal(decimal.layer);
	// calculation
	if (decimal.mag === 0) {
		if (hasUpgrade("rn", 21) && player.rn.calc) {
			if (hasUpgrade("rn", 31) && player.rn.upCalc) return "0 (N)";
			return "N (0)";
		};
		return "N";
	};
	if (decimal.gte("e1000")) {
		decimal = decimal.layeradd10(0 - (decimal.layer - 1));
		if (decimal.gte("e1000")) {
			layer = layer.add(1);
			decimal = decimal.layeradd10(-1);
		};
	};
	if (decimal.gte(1e3)) {
		places = decimal.log10().trunc();
		places = places.div(3).trunc().mul(3);
		decimal = decimal.div(new Decimal(10).pow(places)).trunc();
		let numsArray = [...places.toString()].reverse();
		for (let i = 0; i < numsArray.length; i++) {
			numsArray[i] = +numsArray[i];
			if (numsArray[i] === 0) continue;
			resultE = romanNumerals[i][numsArray[i] - 1] + resultE;
		};
	};
	let numsArray = [...decimal.mag.toString()].reverse();
	for (let i = 0; i < numsArray.length; i++) {
		numsArray[i] = +numsArray[i];
		if (numsArray[i] === 0) continue;
		result = romanNumerals[i][numsArray[i] - 1] + result;
	};
	// return formatted decimal
	if (layer.eq(2)) result = "e" + result;
	else if (layer.eq(3)) result = "ee" + result;
	else if (layer.gte(4)) result = "eee" + result;
	if (new Decimal(num).gte("eeee1000")) {
		let numsArray = [...layer.toString()].reverse(), resultF = "";
		for (let i = 0; i < numsArray.length; i++) {
			numsArray[i] = +numsArray[i];
			if (numsArray[i] === 0) continue;
			resultF = romanNumerals[i][numsArray[i] - 1] + resultF;
		};
		result = "eee" + resultE + "F" + resultF;
	} else if (resultE) result += "e" + resultE;
	if (hasUpgrade("rn", 21) && player.rn.calc) {
		if (hasUpgrade("rn", 31) && player.rn.upCalc) return formatWhole(new Decimal(num)) + " (" + result + ")";
		return result + " (" + formatWhole(new Decimal(num)) + ")";
	};
	return result;
};

const greekNumerals = [
	["αʹ", "βʹ", "γʹ", "δʹ", "εʹ", "ϛʹ", "ζʹ", "ηʹ", "θʹ"],
	["ιʹ", "κʹ", "λʹ", "μʹ", "νʹ", "ξʹ", "οʹ", "πʹ", "ϙʹ"],
	["ρʹ", "σʹ", "τʹ", "υʹ", "φʹ", "χʹ", "ψʹ", "ωʹ", "ϡʹ"],
	["͵α", "͵β", "͵γ", "͵δ", "͵ε", "͵ϛ", "͵ζ", "͵η", "͵θ"],
	["M"],
];

function greekNumeralFormat(num) {
	// setup
	let result = "", resultE = "";
	let places = 0;
	let decimal = new Decimal(num);
	let layer = new Decimal(decimal.layer);
	// calculation
	if (decimal.mag === 0) {
		if (player.gn.calc && hasUpgrade('gn', 15)) return "𐆊 (0)";
		return "𐆊";
	};
	if (decimal.gte("e10000")) {
		decimal = decimal.layeradd10(0 - (decimal.layer - 1));
		if (decimal.gte("e10000")) {
			layer = layer.add(1);
			decimal = decimal.layeradd10(-1);
		};
	};
	if (decimal.gte(1e4)) {
		places = decimal.mul(2).log10().trunc();
		places = places.div(4).trunc().mul(4);
		decimal = decimal.div(new Decimal(10).pow(places)).trunc();
		let numsArray = [...places.toString()].reverse();
		for (let i = 0; i < numsArray.length; i++) {
			numsArray[i] = +numsArray[i];
			if (numsArray[i] === 0) continue;
			resultE = greekNumerals[i][numsArray[i] - 1] + resultE;
		};
	};
	let numsArray = [...decimal.mag.toString()].reverse();
	for (let i = 0; i < numsArray.length; i++) {
		numsArray[i] = +numsArray[i];
		if (numsArray[i] === 0) continue;
		result = greekNumerals[i][numsArray[i] - 1] + result;
	};
	// return formatted decimal
	if (layer == 2) result = "e" + result;
	else if (layer == 3) result = "ee" + result;
	else if (layer >= 4) result = "eee" + result;
	if (new Decimal(num).gte("eeee1000")) {
		let numsArray = [...layer.toString()].reverse(), resultF = "";
		for (let i = 0; i < numsArray.length; i++) {
			numsArray[i] = +numsArray[i];
			if (numsArray[i] === 0) continue;
			resultF = greekNumerals[i][numsArray[i] - 1] + resultF;
		};
		result = "eee" + resultE + "F" + resultF;
	} else if (resultE) result += "e" + resultE;
	if (player.gn.calc && player.gn.calcTier.gte(1)) {
		let resultNum = formatWhole(new Decimal(num));
		if (player.gn.calcTier.lt(10)) resultNum = resultNum.replace(/9/g, "?");
		if (player.gn.calcTier.lt(9)) resultNum = resultNum.replace(/8/g, "?");
		if (player.gn.calcTier.lt(8)) resultNum = resultNum.replace(/7/g, "?");
		if (player.gn.calcTier.lt(7)) resultNum = resultNum.replace(/6/g, "?");
		if (player.gn.calcTier.lt(6)) resultNum = resultNum.replace(/5/g, "?");
		if (player.gn.calcTier.lt(5)) resultNum = resultNum.replace(/4/g, "?");
		if (player.gn.calcTier.lt(4)) resultNum = resultNum.replace(/3/g, "?");
		if (player.gn.calcTier.lt(3)) resultNum = resultNum.replace(/2/g, "?");
		if (player.gn.calcTier.lt(2)) resultNum = resultNum.replace(/1/g, "?");
		return result + " (" + resultNum + ")";
	};
	return result;
};

function exponentialFormat(num, precision, mantissa = true) {
	let e = num.log10().floor();
	let m = num.div(Decimal.pow(10, e));
	if (m.toStringWithDecimalPlaces(precision) == 10) {
		m = decimalOne;
		e = e.add(1);
	};
	e = e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0));
	if (mantissa) return m.toStringWithDecimalPlaces(precision) + "e" + e;
	return "e" + e;
};

function commaFormat(num, precision) {
	if (num === null || num === undefined) return "NaN";
	if (num.mag < 0.001) return (0).toFixed(precision);
	let init = num.toStringWithDecimalPlaces(precision);
	let portions = init.split(".");
	portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	if (portions.length == 1) return portions[0];
	return portions[0] + "." + portions[1];
};

function regularFormat(num, precision) {
	if (num === null || num === undefined) return "NaN";
	if (num.mag < 0.0001) return (0).toFixed(precision);
	if (num.mag < 0.1 && precision !== 0) precision = Math.max(precision, 4);
	return num.toStringWithDecimalPlaces(precision);
};

function fixValue(x, y = 0) {
	return x || new Decimal(y);
};

function sumValues(x) {
	x = Object.values(x);
	if (!x[0]) return decimalZero;
	return x.reduce((a, b) => Decimal.add(a, b));
};

function format(decimal, precision = 2, small) {
	small = small || modInfo.allowSmall;
	if (options.extendplaces && precision == 2) precision = 3;
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
		player.hasNaN = true;
		return "NaN";
	};
	if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small);
	if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity";
	if (decimal.gte("eeee1000")) {
		let slog = decimal.slog();
		if (slog.gte(1e6)) return "F" + format(slog.floor());
		return decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0);
	};
	if (decimal.gte("e1000000")) return exponentialFormat(decimal, 0, false);
	if (decimal.gte("e10000")) return exponentialFormat(decimal, 0);
	if (decimal.gte(1e9)) return exponentialFormat(decimal, precision);
	if (decimal.gte(1e3)) return commaFormat(decimal, 0);
	if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision);
	if (decimal.eq(0)) return (0).toFixed(precision);
	decimal = invertOOM(decimal);
	let val = "";
	if (decimal.lt("e1000")) {
		val = exponentialFormat(decimal, precision);
		return val.replace(/([^(?:e|F)]*)$/, '-$1');
	};
	return format(decimal, precision) + "⁻¹";
};

function formatWhole(decimal) {
	decimal = new Decimal(decimal);
	if (decimal.gte(1e9)) return format(decimal, 2);
	if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2);
	return format(decimal, 0);
};

function formatTime(s) {
	if (s < 60) return format(s) + "s";
	if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s";
	if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
	if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
	return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
};

function toPlaces(x, precision, maxAccepted) {
	x = new Decimal(x);
	let result = x.toStringWithDecimalPlaces(precision);
	if (new Decimal(result).gte(maxAccepted)) result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision);
	return result;
};

function invertOOM(x) {
	let e = x.log10().ceil();
	let m = x.div(Decimal.pow(10, e));
	return new Decimal(10).pow(e.neg()).times(m);
};
