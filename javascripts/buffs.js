var buffs = ['aegis', 'surge', 'entropy', 'light'];
var formalNames = {
	aegis: "Bound Aegis",
    surge: "Power Surge",
    entropy: "Structured Entropy",
    light: "Inner Light"
};
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
var baseDamage;
var buffed;
var deltas;

var buffsToTry;
var buffsToUse;
var bonuses;

function optimizeBuffs() {
	numBuffs = 1;
    baseDamage = 0;
    buffsToTry = [];
    buffsToUse = [];
    
	uncheckAll();
    parseValues();
    baseDamage = calculateDamage(m, s, c, d);
    
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
    populateDetails();
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
    m = parseInt(form.elements["magicka"].value) || 0;
    s = parseInt(form.elements["spelldamage"].value) || 0;
    c = parseInt(form.elements["critchance"].value) / 100 || 0.0;
    d = parseInt(form.elements["critdamage"].value) / 100 || 0.0;
}

function calculateDamage(m, s, c, d) {
	return Math.floor((m + 10.46 * s) * (1 + c * d));
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
        delta = buffedDamage - baseDamage;
        buffed[i] = buffedDamage;
        deltas[i] = delta;
        
        if (delta > max) {
        	best = i;
            max = delta;
            buffsToUse = buffsToApply;
        }
    }
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

function populateDetails() {
	var details = "<br><p><b>Base Damage :</b> " + baseDamage + "</p>";
	for (var i = 0; i < buffsToTry.length; i++) {
    	details += "<p><b>";
    	var buffsToApply = buffsToTry[i];
        var delimiter = "";
        for (var j = 0; j < buffsToApply.length; j++) {
        	var buffName = formalNames[buffsToApply[j]];
            details += delimiter + buffName;
            delimiter = ", ";
        }
        details += "</b>";
        details += "<br>Buffed Damage : " + buffed[i];
        details += "<br>Difference : " + deltas[i];
        details += "</p>"
    }
    details += "<input type='button' value='Hide' onclick='hideDetails()'/>";
    document.getElementById('buffsdetails').innerHTML = details;
}

function hideDetailsWrapper() {
	document.getElementById('buffsdetailswrapper').style.display = 'none';
}

function showDetailsWrapper() {
	document.getElementById('buffsdetailswrapper').style.display = 'block';
}

function hideDetails() {
	document.getElementById('buffsdetails').style.display = 'none';
}

function showDetails() {
	document.getElementById('buffsdetails').style.display = 'block';
}