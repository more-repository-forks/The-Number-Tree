function illionFormat(decimal, short, precision = 2) {
    let suffix = "";
    let divnum = 1;
    decimal = new Decimal(decimal);
    if (options.extendplaces && precision == 2) precision = 3;
    if (decimal.gte(1e90)) {
        divnum = 1e90;
        suffix = "novemtrigintillion";
        if (short) suffix = "nt";
    } else if (decimal.gte(1e87)) {
        divnum = 1e87;
        suffix = "octotrigintillion";
        if (short) suffix = "ot";
    } else if (decimal.gte(1e84)) {
        divnum = 1e84;
        suffix = "septtrigintillion";
        if (short) suffix = "St";
    } else if (decimal.gte(1e81)) {
        divnum = 1e81;
        suffix = "setrigintillion";
        if (short) suffix = "st";
    } else if (decimal.gte(1e78)) {
        divnum = 1e78;
        suffix = "quintrigintillion";
        if (short) suffix = "Qt";
    } else if (decimal.gte(1e75)) {
        divnum = 1e75;
        suffix = "quattortrigintillion";
        if (short) suffix = "qt";
    } else if (decimal.gte(1e72)) {
        divnum = 1e72;
        suffix = "tritrigintillion";
        if (short) suffix = "tt";
    } else if (decimal.gte(1e69)) {
        divnum = 1e69;
        suffix = "duotrigintillion";
        if (short) suffix = "dt";
    } else if (decimal.gte(1e66)) {
        divnum = 1e66;
        suffix = "untrigintillion";
        if (short) suffix = "ut";
    } else if (decimal.gte(1e63)) {
        divnum = 1e63;
        suffix = "trigintillion";
        if (short) suffix = "!t";
    } else if (decimal.gte(1e60)) {
        divnum = 1e60;
        suffix = "novemdecillion";
        if (short) suffix = "nd";
    } else if (decimal.gte(1e57)) {
        divnum = 1e57;
        suffix = "octodecillion";
        if (short) suffix = "od";
    } else if (decimal.gte(1e54)) {
        divnum = 1e54;
        suffix = "septdecillion";
        if (short) suffix = "Sd";
    } else if (decimal.gte(1e51)) {
        divnum = 1e51;
        suffix = "sedecillion";
        if (short) suffix = "sd";
    } else if (decimal.gte(1e48)) {
        divnum = 1e48;
        suffix = "quindecillion";
        if (short) suffix = "Qd";
    } else if (decimal.gte(1e45)) {
        divnum = 1e45;
        suffix = "quattordecillion";
        if (short) suffix = "qd";
    } else if (decimal.gte(1e42)) {
        divnum = 1e42;
        suffix = "tredecillion";
        if (short) suffix = "td";
    } else if (decimal.gte(1e39)) {
        divnum = 1e39;
        suffix = "duodecillion";
        if (short) suffix = "dd";
    } else if (decimal.gte(1e36)) {
        divnum = 1e36;
        suffix = "undecillion";
        if (short) suffix = "ud";
    } else if (decimal.gte(1e33)) {
        divnum = 1e33;
        suffix = "decillion";
        if (short) suffix = "!d";
    } else if (decimal.gte(1e30)) {
        divnum = 1e30;
        suffix = "nonillion";
        if (short) suffix = "n";
    } else if (decimal.gte(1e27)) {
        divnum = 1e27;
        suffix = "octillion";
        if (short) suffix = "o";
    } else if (decimal.gte(1e24)) {
        divnum = 1e24;
        suffix = "septillion";
        if (short) suffix = "S";
    } else if (decimal.gte(1e21)) {
        divnum = 1e21;
        suffix = "sexillion";
        if (short) suffix = "s";
    } else if (decimal.gte(1e18)) {
        divnum = 1e18;
        suffix = "quintillion";
        if (short) suffix = "Q";
    } else if (decimal.gte(1e15)) {
        divnum = 1e15;
        suffix = "quadrillion";
        if (short) suffix = "q";
    } else if (decimal.gte(1e12)) {
        divnum = 1e12;
        suffix = "trillion";
        if (short) suffix = "t";
    } else if (decimal.gte(1e9)) {
        divnum = 1e9;
        suffix = "billion";
        if (short) suffix = "b";
    } else if (decimal.gte(1e6)) {
        divnum = 1e6;
        suffix = "million";
        if (short) suffix = "m";
    } else if (decimal.gte(1e3)) {
        divnum = 1e3;
        suffix = "thousand";
        if (short) suffix = "k";
    } else return format(decimal);
    if (short) return decimal.div(divnum).toStringWithDecimalPlaces(precision) + suffix;
    return decimal.div(divnum).toStringWithDecimalPlaces(precision) + " " + suffix;
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
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4);
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
        var slog = decimal.slog();
        if (slog.gte(1e6)) return "F" + format(slog.floor());
        return decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0);
    };
    if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false);
    if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0);
    if (decimal.gte(1e9)) return exponentialFormat(decimal, precision);
    if (decimal.gte(1e3)) return commaFormat(decimal, 0);
    if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision);
    if (decimal.eq(0)) return (0).toFixed(precision);
    decimal = invertOOM(decimal);
    let val = "";
    if (decimal.lt("1e1000")) {
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

// Will also display very small numbers
function formatSmall(x, precision = 2) {
    return format(x, precision, true);
};

function invertOOM(x) {
    let e = x.log10().ceil();
    let m = x.div(Decimal.pow(10, e));
    return new Decimal(10).pow(e.neg()).times(m);
};
