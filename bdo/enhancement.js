// target upgrade attempt: [base success chance, chance increase per FS, max FS]
var upgradeDataWeapon = {
    "1": [1.000, 0.0000, 0],
    "2": [1.000, 0.0000, 0],
    "3": [1.000, 0.0000, 0],
    "4": [1.000, 0.0000, 0],
    "5": [1.000, 0.0000, 0],
    "6": [1.000, 0.0000, 0],
    "7": [1.000, 0.0000, 0],
    "8": [0.200, 0.0250, 13],
    "9": [0.175, 0.0200, 14],
    "10": [0.150, 0.0150, 15],
    "11": [0.125, 0.0125, 16],
    "12": [0.100, 0.0075, 18],
    "13": [0.075, 0.0063, 20],
    "14": [0.050, 0.0050, 25],
    "15": [0.025, 0.0050, 25],
    "16": [0.150, 0.0150, 25],
    "17": [0.075, 0.0075, 35],
    "18": [0.050, 0.0050, 44],
    "19": [0.020, 0.0026, 90],
    "20": [0.015, 0.0015, 124]
}

var upgradeDataArmor = {
    "1": [1.000, 0.0000, 0],
    "2": [1.000, 0.0000, 0],
    "3": [1.000, 0.0000, 0],
    "4": [1.000, 0.0000, 0],
    "5": [1.000, 0.0000, 0],
    "6": [0.200, 0.0250, 13],
    "7": [0.175, 0.0200, 14],
    "8": [0.1625, 0.0175, 14],
    "9": [0.150, 0.0150, 15],
    "10": [0.125, 0.0125, 16],
    "11": [0.1125, 0.01, 17],
    "12": [0.100, 0.0075, 18],
    "13": [0.075, 0.0063, 20],
    "14": [0.050, 0.0050, 25],
    "15": [0.025, 0.0050, 25],
    "16": [0.150, 0.0150, 25],
    "17": [0.075, 0.0075, 35],
    "18": [0.050, 0.0050, 44],
    "19": [0.020, 0.0026, 90],
    "20": [0.015, 0.0015, 124]
}

var upgradeData = upgradeDataWeapon;
var useDurable = true;

// main function
function run() {

    // extract data
    var currentUpgrades = get("currentUpgrades");
    var numCurrentUpgrades = parseInt(currentUpgrades.options[currentUpgrades.selectedIndex].value);

    var numFailstacks = parseInt(get("failstacks").value);
    var blackstoneCost = parseInt(get("blackstoneCost").value);
    var blackstoneCostFailstack = parseInt(get("blackstoneCostFailstack").value);
    var repairCost = parseInt(get("repairCost").value);
    var repairCostFailstack = parseInt(get("repairCostFailstack").value);
    
    var row = upgradeData[numCurrentUpgrades + 1];
    var baseProb = row[0];
    var increasePerFailstack = row[1];
    var maxFailstacks = row[2];
    
    // calculate optimal number of failstacks to build before attempting enhancement
    var targetFailstacks = numFailstacks;
    var bestCost = Number.MAX_SAFE_INTEGER;
    var bestTargetFailstacks, bestNumExpectedAttempts;
    while (targetFailstacks <= maxFailstacks) {
        var numExpectedAttempts = getExpectedNumAttempts(numCurrentUpgrades + 1, targetFailstacks);
        
        var totalBlackstoneCost = numExpectedAttempts * blackstoneCost;
        var totalRepairCost = (numExpectedAttempts - 1) * 5 / 10 * repairCost;
    	var failstackCost = getFailstackCost(numFailstacks, targetFailstacks, blackstoneCostFailstack, repairCostFailstack);
        
        var totalCost = totalBlackstoneCost + totalRepairCost + failstackCost;
        if (totalCost < bestCost) {
        	bestCost = totalCost;
            bestTargetFailstacks = targetFailstacks;
            bestNumExpectedAttempts = numExpectedAttempts;
        }
        
        targetFailstacks++;
    }
    
    // include success probability of first enhancement attempt
    var successProb = baseProb + (bestTargetFailstacks * increasePerFailstack);

    // display results
    get("expectedCost").innerHTML = commaSeparate(bestCost);
    get("targetFailstacks").innerHTML = bestTargetFailstacks;
    get("expectedAttempts").innerHTML = bestNumExpectedAttempts;
    get("expectedDurabilityLoss").innerHTML = (bestNumExpectedAttempts - 1) * 5;
    get("successProb").innerHTML = toPercent(successProb) + "%";
}

function getFailstackCost(currentFailstacks, targetFailstacks, blackstoneCost, repairCostFailstack) {
	var durabilityLossPerFailstack = 5;
    if (useDurable) {
    	durabilityLossPerFailstack = 4;
    }
    
    var diff = targetFailstacks - currentFailstacks;
    var totalBlackstoneCost = diff * blackstoneCost;
    var totalRepairCost = diff * durabilityLossPerFailstack / 10 * repairCostFailstack;
    return totalBlackstoneCost + totalRepairCost;
}

function getExpectedNumAttempts(numTargetUpgrades, numFailstacks) {
    var probs = getSuccessProbs(numTargetUpgrades, numFailstacks);

    var weightedSum = 0;
    for (var i = 0; i < probs.length; i++) {
        weightedSum += probs[i] * (i + 1);
    }

    return Math.ceil(weightedSum);
}

function getSuccessProbs(numTargetUpgrades, numFailstacks) {
    var NUM_ITERATIONS = 200;

    var probs = [];
    var cumProbs = [];

    // get relevant row from data table
    var row = upgradeData[numTargetUpgrades];
    var baseSuccessProb = row[0];
    var increasePerFailstack = row[1];
    var maxFailstacks = row[2];

    // populate independent probabilities of success per attempt
    for (var i = 0; i < NUM_ITERATIONS; i++) {
        probs[i] = baseSuccessProb + Math.min(i + numFailstacks, maxFailstacks) * increasePerFailstack;
    }

    // calculate cumulative probability of succeeding on a given attempt
    for (var i = 0; i < NUM_ITERATIONS; i++) {
        if (i == 0) {
            cumProbs[i] = probs[i];
            continue;
        }

        if (probs[i - 1] == 1) {
            cumProbs[i] = 0;
            continue;
        }

        cumProbs[i] = cumProbs[i - 1] / probs[i - 1] * (1 - probs[i - 1]) * probs[i];
    }

    return cumProbs;
}

// button functions

function useWeaponData() {
	upgradeData = upgradeDataWeapon;
    get("useArmor").classList.remove("pressed-button");
    get("useWeapon").classList.add("pressed-button");
}

function useArmorData() {
	upgradeData = upgradeDataArmor;
    get("useWeapon").classList.remove("pressed-button");
    get("useArmor").classList.add("pressed-button");
}

function durableOn() {
	useDurable = true;
    get("durableOffButton").classList.remove("pressed-button");
    get("durableOnButton").classList.add("pressed-button");
}

function durableOff() {
	useDurable = false;
    get("durableOnButton").classList.remove("pressed-button");
    get("durableOffButton").classList.add("pressed-button");
}

function decCurrentUpgrades() {
	var currentUpgrades = get("currentUpgrades");
    if (currentUpgrades.selectedIndex > 0) {
    	currentUpgrades.selectedIndex--;
    	run();
    }
}

function incCurrentUpgrades() {
	var currentUpgrades = get("currentUpgrades");
    if (currentUpgrades.selectedIndex < 19) {
    	currentUpgrades.selectedIndex++;
    	run();
    }
}

function decFailstacks() {
	var failstacks = get("failstacks");
    var numFailstacks = parseInt(failstacks.value);
   	failstacks.value = Math.max(0, numFailstacks - 1);
    run();
}

function incFailstacks() {
	var failstacks = get("failstacks");
    var numFailstacks = parseInt(failstacks.value);
    var numCurrentUpgrades = parseInt(get("currentUpgrades").value);
    var maxFailstacks = upgradeData[numCurrentUpgrades + 1][2];
   	failstacks.value = Math.min(maxFailstacks, numFailstacks + 1);
    run();
}

function zeroFailstacks() {
	get("failstacks").value = 0;
    run();
}

function maxFailstacks() {
    var numCurrentUpgrades = parseInt(get("currentUpgrades").value);
    var maxFailstacks = upgradeData[numCurrentUpgrades + 1][2];
   	get("failstacks").value = maxFailstacks;
    run();
}

// misc utility methods

function get(elementId) {
    return document.getElementById(elementId);
}

function commaSeparate(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toPercent(x) {
	return parseFloat(Math.round(x * 10000) / 100).toFixed(2);
}
