let modInfo = {
	name: 'Color Factory',
	id: 'Yrahcaz7-ModTree-ColorFactory',
	author: 'Yrahcaz7',
	pointsName: 'coins',
	modFiles: ['layers', 'tree', 'game', 'utils', 'components'],
	techFiles: ['temp', 'displays', 'systemComponents', 'canvas', 'particleSystem'],
	utilFiles: ['easyAccess', 'NumberFormating', 'options', 'save', 'themes'],
	initialStartPoints: new Decimal(0),
	offlineLimit: 1, // In hours
	allowSmall: true,
};

let VERSION = {
	num: '3.0',
	name: 'The Reset',
};

let winText = '<h3>You won the game!</h3><br>However, it isn\'t the end yet...<br>Wait for more updates for further content.';

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Determines if it should show points/sec
function canGenPoints(){
	return false;
};

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(0);
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
	return 1; // In seconds
};

function fixOldSave(oldVersion) {
};
