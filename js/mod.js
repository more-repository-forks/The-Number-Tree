let modInfo = {
	name: 'Color Factory',
	id: 'Yrahcaz7-ModTree-ColorFactory',
	author: 'Yrahcaz7',
	pointsName: 'points',
	modFiles: ['layers.js', 'tree.js'],
	initialStartPoints: new Decimal(0),
	offlineLimit: 1, // In hours
};

let VERSION = {
	num: '1.0',
	name: 'Red',
};

let winText = '<h3>You won the game!</h3><br>However, it isn\'t the end yet...<br>Wait for more updates for further content.';

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
function removeachievement(value) {
	for (var i = 0; i < player.A.achievements.length; i++) {
		if (player.A.achievements[i] == value) {
			player.A.achievements.splice(i, 1);
			return true;
		};
	};
	return false;
};

// Determines if it should show points/sec
function canGenPoints(){
	return true;
};

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(1);
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
