let modInfo = {
	name: "Adventure Crafter",
	id: "mymod",
	author: "Yrahcaz7",
	pointsName: "experience",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Beta Test",
}

let changelog = `<h1>Changelog:</h1><br>
	<br><h3>v0.1 - Beta Test</h3><br>
		- Added crafters.<br>
		- Added crafting wood planks.<br>
	<br><h3>v0.1 - Beta Test</h3><br>
		- Added basic skills.<br>
		- Added the basic area.<br>
		- Added wood spawns.<br>
		- Added five upgrades.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('b', 12)) gain = gain.times(upgradeEffect('b', 12))
	if (hasUpgrade('b', 14)) gain = gain.times(upgradeEffect('b', 14))
	if (player['c'].points > 0) gain = gain.times(tmp.c.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

function maxTickLength() {
	return(1)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}