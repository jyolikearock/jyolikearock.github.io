var mageBonus = 1280;
var apprenticeBonus = 166;
var thiefBonus = 0.11;
var shadowBonus = 0.12;

var spellDamageCoef = 10.46;

function optimizeMundosStone() {
    var mundosForm = document.forms["mundosform"];
    var bestStone = "";

    var magicka = parseInt(mundosForm.elements["magicka"].value);
    var spellDamage = parseInt(mundosForm.elements["spelldamage"].value);
    var critChance = parseInt(mundosForm.elements["critchance"].value) / 100.0;
    var critDamage = parseInt(mundosForm.elements["critdamage"].value) / 100.0;

    var deltaMage = mageBonus * (1 + critDamage * critChance);
    var deltaApprentice = spellDamageCoef * apprenticeBonus * (1 + critDamage * critChance);
    var deltaThief = (magicka + spellDamageCoef * spellDamage) * (critDamage * thiefBonus);
    var deltaShadow = (magicka + spellDamageCoef * spellDamage) * (shadowBonus * critChance);

    if (deltaMage > deltaApprentice
            && deltaMage > deltaThief
            && deltaMage > deltaShadow)
        bestStone = "Mage";
    else if (deltaApprentice > deltaThief
            && deltaApprentice > deltaShadow)
        bestStone = "Apprentice";
    else if (deltaThief > deltaShadow)
        bestStone = "Thief";
    else
        bestStone = "Shadow";

    var spanObj = document.getElementById('beststone');
    spanObj.innerHTML = bestStone;
    showResult();
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
    var divObj = document.getElementById('themath');
    divObj.style.display='block';
}

function hideMath() {
    var divObj = document.getElementById('themath');
    divObj.style.display='none';
}