let modInfo = {
	name: 'The Number Tree',
	id: 'Yrahcaz7-ModTree-TheNumberTree',
	author: 'Yrahcaz7',
	pointsName: 'arabic numerals',
	initialStartPoints: new Decimal(0),
	offlineLimit: 1, // In hours
	allowSmall: true,
};

let VERSION = {
	num: '2.0',
	name: 'Intelligence',
};

let winText = '<h3>You won the game!</h3><br>However, it isn\'t the end yet...<br>Wait for more updates for further content.';

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Determines if it should show points/sec
function canGenPoints() {
	return true;
};

// Calculate points/sec!
function getPointGen() {
	if (player.points.lt(0)) player.points = new Decimal(0);
	let gain = new Decimal(1);
	if (hasUpgrade('rn', 11)) gain = gain.mul(upgradeEffect('rn', 11));
	if (hasUpgrade('rn', 13) && player.points.lt(getUpgradeCap('rn', 13))) gain = gain.mul(upgradeEffect('rn', 13));
	if (hasUpgrade('rn', 14) && player.points.lt(getUpgradeCap('rn', 14))) gain = gain.mul(upgradeEffect('rn', 14));
	if (hasUpgrade('rn', 15)) gain = gain.mul(upgradeEffect('rn', 15));
	if (hasUpgrade('rn', 25)) gain = gain.mul(upgradeEffect('rn', 25));
	if (hasUpgrade('rn', 35)) gain = gain.mul(upgradeEffect('rn', 35));
	if (player.d.unlocked) gain = gain.mul(tmp.d.effect.div(100).add(1));
	if (player.i.unlocked) gain = gain.mul(tmp.i.effect);
	return gain;
};

function addedPlayerData() { return {
	nerdMode: false,
}};

// Display extra things at the top of the page
var displayThings = [
];

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte('ee16');
};

// Style for the background, can be a function
var backgroundStyle = {
};

function maxTickLength() {
	return 0.1; // In seconds
};

function fixOldSave(oldVersion) {
};
