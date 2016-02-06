var buffs = ['aegis', 'surge', 'entropy', 'light'];
var map = {
	aegis: function(b) {
    	return [b[0] + 0.08, b[1] + 0.02, b[2] + 0.00];
    },
	surge: function(b) {
    	return [b[0] + 0.00, b[1] + 0.22, b[2] + 0.00];
    },
	entropy: function(b) {
    	return [b[0] + 0.02, b[1] + 0.20, b[2] + 0.00];
    },
	light: function(b) {
    	return [b[0] + 0.07, b[1] + 0.00, b[2] + 0.10];
    }
};

var numBuffs;
var m, s, c, d;
var base;
var buffed;
var deltas;

var buffsToTry;
var buffsToUse;
var bonuses;

function optimizeBuffs() {
	numBuffs = 0;
    buffsToTry = [];
    buffsToUse = [];
    
	uncheckAll();
    parseValues();
    base = calculateDamage(m, s, c, d);
    
    var index = 0;
    if (numBuffs == 4)
    	buffsToUse = buffs;
    else if (numBuffs == 1) {
    	for (var i = 0; i < buffs.length; i++) {
        	buffsToTry[index] = [buffs[i]];
            index++;
        }
    } else if (numBuffs == 2) {
    	for (var i = 0; i < buffs.length - 1; i++) {
        	for (var j = i + 1; j < buffs.length; j++) {
            	var pair = [buffs[i], buffs[j]];
                buffsToTry[index] = pair;
                index++;
            }
        }
    } else {
    	for (var i = 0; i < buffs.length - 2; i++) {
        	for (var j = i + 1; j < buffs.length - 1; j++) {
            	for (var k = j + 1; k < buffs.length; k++) {
                    var triplet = [buffs[i], buffs[j], buffs[k]];
                    buffsToTry[index] = triplet;
                	index++;
                }
            }
        }
    }
    tryBuffs();
    selectBuffs();
}

function uncheckAll() {
	for (var i = 0; i < buffs.length; i++) {
    	document.getElementById(buffs[i]).checked = false;
    }
}

function parseValues() {
	var form = document.forms["buffsform"];
	var radios = form.elements["numbuffs"];
    for (var i = 0; i < 4; i++) {
    	if (radios[i].checked) {
        	numBuffs = document.getElementById(radios[i].id + "label").innerHTML;
            break;
        }
    }
    m = form.elements["magicka"].value || 0;
    s = form.elements["spelldamage"].value || 0;
    c = form.elements["critchance"].value / 100 || 0.0;
    d = form.elements["critdamage"].value / 100 || 0.0;
}

function tryBuffs() {
	buffed = [];
    deltas = [];
	var bm, bs, bc;
    var buffedDamage, delta;
    var best = -1;
    var max = 0;
	for (var i = 0; i < buffsToTry.length; i++) {
    	bonuses = [0.0, 0.0, 0.0];
    	var buffsToApply = buffsToTry[i];
        for (var j = 0; j < buffsToApply.length; j++) {
        	var buffName = buffsToApply[j];
            bonuses = map[buffName](bonuses);
        }
        
        bm = m * (1 + bonuses[0]);
        bs = s * (1 + Math.min(bonuses[1], 0.2));
        bc = c + bonuses[2];
        
        buffedDamage = calculateDamage(bm, bs, bc, d);
        delta = buffedDamage - base;
        buffed[i] = buffedDamage;
        deltas[i] = delta;
        
        if (delta > max) {
        	best = i;
            max = delta;
            buffsToUse = buffsToApply;
        }
    }
}

function calculateDamage(m, s, c, d) {
	return Math.floor((m + 10.46 * s) * (1 + c * d));
}

function selectBuffs() {
	if (buffsToUse.length == 0) {
    	if (numBuffs == 1)
        	buffsToUse = ['light'];
    	else if (numBuffs == 2)
        	buffsToUse = ['light', 'entropy'];
    	else if (numBuffs == 3)
        	buffsToUse = ['light', 'entropy', 'aegis'];
    }
	for (var i = 0; i < buffsToUse.length; i++) {
    	document.getElementById(buffsToUse[i]).checked = true;
    }
}