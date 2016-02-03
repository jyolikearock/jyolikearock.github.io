var mageBonus = 1452;
var apprenticeBonus = 167;
var thiefBonus = 0.11;
var shadowBonus = 0.12;

var m, mb, sd, sdb, cc, cd, d;
var bd;
var b1, b2, b3, b4;
var bd1, bd2, bd3, bd4;
var d1, d2, d3, d4;

function optimizeMundosStone() {
    var mundosForm = document.forms["mundosform"];
    var bestStone = "";

    m = parseInt(mundosForm.elements["magicka"].value) || 0;
    mb = parseInt(mundosForm.elements["magickabuff"].value) / 100 || 0;
    sd = parseInt(mundosForm.elements["spelldamage"].value) || 0;
    sdb = parseInt(mundosForm.elements["spelldamagebuff"].value) / 100 || 0;
    cc = parseInt(mundosForm.elements["critchance"].value) / 100 || 0;
    cd = parseInt(mundosForm.elements["critdamage"].value) / 100 || 0;
    d = parseInt(mundosForm.elements["divines"].value) / 100 || 0;
    
    bd = calculateDamage(m, sd, cc, cd);
    
    b1 = roundTo2(mageBonus * (1 + d) * (1 + mb));
    b2 = roundTo2(apprenticeBonus * (1 + d) * (1 + sdb));
    b3 = roundTo2(thiefBonus * (1 + d));
    b4 = roundTo2(shadowBonus * (1 + d));
    
    bd1 = calculateDamage(m + b1, sd, cc, cd);
    bd2 = calculateDamage(m, sd + b2, cc, cd);
    bd3 = calculateDamage(m, sd, cc + b3, cd);
    bd4 = calculateDamage(m, sd, cc, cd + b4);
    
    d1 = roundTo2(bd1 - bd);
    d2 = roundTo2(bd2 - bd);
    d3 = roundTo2(bd3 - bd);
    d4 = roundTo2(bd4 - bd);

    if (d1 > d2 && d1 > d3 && d1 > d4)
        bestStone = "Mage";
    else if (d2 > d3 && d2 > d4)
        bestStone = "Apprentice";
    else if (d3 > d4)
        bestStone = "Thief";
    else
        bestStone = "Shadow";

    var spanObj = document.getElementById('beststone');
    spanObj.innerHTML = bestStone;
    showResult();
}

function calculateDamage(m, sd, cc, cd) {
	return roundTo2((m + 10.46 * sd) * (1 + cd * cc));
}

function showResult() {
    var divObj = document.getElementById('result');
    divObj.style.display='block';
}

function hideResult() {
    var divObj = document.getElementById('result');
    divObj.style.display='none';
}

function showMath() {
	populateMath();
    var divObj = document.getElementById('math');
    divObj.style.display='block';
}

function populateMath() {
	var spanObj = document.getElementById('mathcontents');
    spanObj.innerHTML =
"Base damage formula: (<b>M</b>agicka + 10.46 * <b>S</b>pell<b>D</b>amage) " +
"<br/>Modified with crit: (M + 10.46 * SD) * (1 + <b>C</b>rit<b>D</b>amage * <b>C</b>rit<b>C</b>hance)" +
"<br/><br/>Your base damage: (" + m + " + 10.46 * " + sd + ") * (1 + " + cd + " * " + cc + ") = <b>" + bd+"</b>" +
"</br>" +
"</br>Mundos Stone Bonus: Buff * (1 + <b>D</b>ivines) * (1 + <b>P</b>ercent<b>I</b>ncrease)" +
"</br>" +
"</br><b>The Mage</b>" +
"</br>At VR16, The Mage provides <b>1280 Magicka</b>" +
"</br>For you: 1280 * (1 + " + d + ") * (1 + " + mb + ") = <b>" + b1 + "</b>" +
"</br>New damage: (" + m + " + " + b1 + " + 10.46 * " + sd + ") * (1 + " + cd + " * " + cc + ") = <b>" + bd1 + "</b>" +
"</br>Damage difference: " + bd1 + " - " + bd + " = <b>" + d1 + "</b>" +
"</br>" +
"</br><b>The Apprentice</b>" +
"</br>At VR16, The Apprentice provides <b>166 Spell Damage</b>" +
"</br>For you: 166 * (1 + " + d + ") * (1 + " + sdb + ") = <b>" + b2 + "</b>" +
"</br>New damage: (" + m + " + 10.46 * (" + sd + " + " + b2 + ")) * (1 + " + cd + " * " + cc + ") = <b>" + bd2 + "</b>" +
"</br>Damage difference: " + bd2 + " - " + bd + " = <b>" + d2 + "</b>" +
"</br>" +
"</br><b>The Thief</b>" +
"</br>At VR16, The Thief provides <b>11% Crit Chance</b>" +
"</br>For you: 11 * (1 + " + d + ") = <b>" + roundTo2(b3 * 100) + "%</b>" +
"</br>New damage: (" + m + " + 10.46 * " + sd + ") * (1 + " + cd + " * (" + cc + " + " + b3 + ")) = <b>" + bd3 + "</b>" +
"</br>Damage difference: " + bd3 + " - " + bd + " = <b>" + d3 + "</b>" +
"</br>" +
"</br><b>The Shadow</b>" +
"</br>At VR16, The Shadow provides <b>12% Crit Damage</b>" +
"</br>For you: 12 * (1 + " + d + ") = <b>" + roundTo2(b4 * 100) + "%</b>" +
"</br>New damage: (" + m + " + 10.46 * " + sd + ") * (1 + (" + cd + " + " + b4 + ") * " + cc + ") = <b>" + bd4 + "</b>" +
"</br>Damage difference: " + bd4 + " - " + bd + " = <b>" + d4 + "</b>";
    
}

function hideMath() {
    var divObj = document.getElementById('math');
    divObj.style.display='none';
}

function roundTo2(num) {
	return Math.floor(num * 100)/100;
}