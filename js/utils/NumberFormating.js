function illionFormat(decimal, short, precision = 2) {
    let suffix = "";
    let divnum = new Decimal(1);
    decimal = new Decimal(decimal);
    if (options.extendplaces && precision == 2) precision = 3;
    if (decimal.gte(1e303)) { // add prefix if 100th illion or higher
        if (decimal.gte(1e303)) { // 90th
            divnum = divnum.mul(1e303);
            if (!short) suffix += "cen";
            else suffix += "c";
        };
    };
    if (decimal.gte(1e33)) { // add prefix if 10th illion or higher
        let exponent = decimal.layeradd10(-1).floor();
        // add first part
        if (exponent % 30 < 3) { // 9th
            divnum = divnum.mul(1e27);
            if (!short) suffix += "novem";
            else suffix += "n";
        } else if (exponent.sub(27) % 30 < 3) { // 8th
            divnum = divnum.mul(1e24);
            if (!short) suffix += "octo";
            else suffix += "o";
        } else if (exponent.sub(24) % 30 < 3) { // 7th
            divnum = divnum.mul(1e21);
            if (!short) suffix += "septen";
            else suffix += "S";
        } else if (exponent.sub(21) % 30 < 3) { // 6th
            divnum = divnum.mul(1e18);
            if (!short) suffix += "sex";
            else suffix += "s";
        } else if (exponent.sub(18) % 30 < 3) { // 5th
            divnum = divnum.mul(1e15);
            if (!short) suffix += "quin";
            else suffix += "Q";
        } else if (exponent.sub(15) % 30 < 3) { // 4th
            divnum = divnum.mul(1e12);
            if (!short) suffix += "quattuor";
            else suffix += "q";
        } else if (exponent.sub(12) % 30 < 3) { // 3rd
            divnum = divnum.mul(1e9);
            if (!short) suffix += "tre";
            else suffix += "t";
        } else if (exponent.sub(9) % 30 < 3) { // 2nd
            divnum = divnum.mul(1e6);
            if (!short) suffix += "duo";
            else suffix += "b";
        } else if (exponent.sub(6) % 30 < 3) { // 1st
            divnum = divnum.mul(1e3);
            if (!short) suffix += "un";
            else suffix += "m";
        } else { // none
            if (short) suffix += "~";
        };
        // add second part
        decimal = decimal.layeradd10(1);
        if (exponent % 300 > 33) {
            if (decimal.gte(1e273)) { // 90th
                divnum = divnum.mul(1e273);
                if (!short) suffix += "nona";
                else suffix += "n";
            } else if (decimal.gte(1e243)) { // 80th
                divnum = divnum.mul(1e243);
                if (!short) suffix += "octo";
                else suffix += "o";
            } else if (decimal.gte(1e213)) { // 70th
                divnum = divnum.mul(1e213);
                if (!short) suffix += "septua";
                else suffix += "S";
            } else if (decimal.gte(1e183)) { // 60th
                divnum = divnum.mul(1e183);
                if (!short) suffix += "sexa";
                else suffix += "s";
            } else if (decimal.gte(1e153)) { // 50th
                divnum = divnum.mul(1e153);
                if (!short) suffix += "quinqua";
                else suffix += "Q";
            } else if (decimal.gte(1e123)) { // 40th
                divnum = divnum.mul(1e123);
                if (!short) suffix += "quadra";
                else suffix += "q";
            } else if (decimal.gte(1e93)) { // 30th
                divnum = divnum.mul(1e93);
                if (!short) suffix += "tri";
                else suffix += "t";
            } else if (decimal.gte(1e63)) { // 20th
                divnum = divnum.mul(1e63);
                if (!short) suffix += "vi";
                else suffix += "v";
            } else { // 10th
                divnum = divnum.mul(1e33);
                if (!short) suffix += "dec";
                else suffix += "d";
            };
            if (decimal.gte(1e63)) { // add prefix part 2 ending
                if (!short) suffix += "gint";
            };
        } else if (short) suffix += "~";
    } else { // add prefix if 9th illion or lower
        if (decimal.gte(1e30)) { // 9th
            divnum = divnum.mul(1e30);
            if (!short) suffix += "non";
            else suffix += "n";
        } else if (decimal.gte(1e27)) { // 8th
            divnum = divnum.mul(1e27);
            if (!short) suffix += "oct";
            else suffix += "o";
        } else if (decimal.gte(1e24)) { // 7th
            divnum = divnum.mul(1e24);
            if (!short) suffix += "sept";
            else suffix += "S";
        } else if (decimal.gte(1e21)) { // 6th
            divnum = divnum.mul(1e21);
            if (!short) suffix += "sext";
            else suffix += "s";
        } else if (decimal.gte(1e18)) { // 5th
            divnum = divnum.mul(1e18);
            if (!short) suffix += "quint";
            else suffix += "Q";
        } else if (decimal.gte(1e15)) { // 4th
            divnum = divnum.mul(1e15);
            if (!short) suffix += "quadr";
            else suffix += "q";
        } else if (decimal.gte(1e12)) { // 3rd
            divnum = divnum.mul(1e12);
            if (!short) suffix += "tr";
            else suffix += "t";
        } else if (decimal.gte(1e9)) { // 2nd
            divnum = divnum.mul(1e9);
            if (!short) suffix += "b";
            else suffix += "b";
        } else if (decimal.gte(1e6)) { // 1st
            divnum = divnum.mul(1e6);
            if (!short) suffix += "m";
            else suffix += "m";
        } else if (decimal.gte(1e3)) { // 0th
            divnum = divnum.mul(1e3);
            if (!short) suffix += "thousand";
            else suffix += "k";
        } else return format(decimal); // none
    };
    // add suffix
    if (decimal.gte(1e6)) {
        if (!short) {
            if (decimal.gte(1e303) && decimal.lt(1e333)) suffix += "t";
            suffix += "illion";
        };
    };
    // return formatted decimal
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
