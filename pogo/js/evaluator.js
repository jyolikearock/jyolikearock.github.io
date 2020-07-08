function evaluateMaxCP(pokemon) {
    console.log("evaluating CP for pokemon: " + JSON.stringify(pokemon));
    return evaluateCP(pokemon, 40, 15, 15, 15);
}

function evaluateCP(pokemon, level, atkIv, defIv, hpIv) {
    let cpm = cpmMap[level];
    let atk = (pokemon.atk + atkIv) * cpm;
    let def = (pokemon.def + defIv) * cpm;
    let hp = (pokemon.hp + hpIv) * cpm;

    let cp = Math.floor(atk * Math.sqrt(def) * Math.sqrt(hp) / 10)
    return cp;
}

function evaluateStats(pokemon, level, atkIv, defIv, hpIv) {
    if (level < 1) {
        level = 1;
    }
    if (level > 40) {
        level = 40;
    }
    let cpm = cpmMap[level];

    let atk = cpm * (pokemon.atk + atkIv);
    let def = cpm * (pokemon.def + defIv);
    let hp = cpm * (pokemon.hp + hpIv);

    pokemon._atk = Math.floor(atk);
    pokemon._def = Math.floor(def);
    pokemon._hp = Math.floor(hp);

    pokemon._bulk = Math.floor(Math.sqrt(def * hp));
    pokemon._total = Math.floor(Math.pow(atk * def * hp, 1.0/3.0));
    pokemon._cp = Math.floor(atk * Math.sqrt(def) * Math.sqrt(hp) / 10);
}

function evaluateStatsWithCpCap(pokemon, cpCap, atkIv, defIv, hpIv) {
    let level = evaluateLevel(pokemon, cpCap, atkIv, defIv, hpIv);
    evaluateStats(pokemon, level, atkIv, defIv, hpIv);
}

function evaluateLevel(pokemon, capCP, atkIv, defIv, hpIv) {
    let maxCP = evaluateCP(pokemon, 40, atkIv, defIv, hpIv);
    let targetCpm = cpmMap[40] * Math.sqrt(capCP / maxCP);
    let level = 1;
    for (let i = 40; i >= 1; i = i - 0.5) {
        if (targetCpm >= cpmMap[i]) {
            level = i;
            break;
        }
    }

    pokemon._level = level;
    return level;
}

// CP multiplier: level >> multiplier
var cpmMap = {
    1: 0.094,
    1.5: 0.1351374318,
    2: 0.16639787,
    2.5: 0.192650919,
    3: 0.21573247,
    3.5: 0.2365726613,
    4: 0.25572005,
    4.5: 0.2735303812,
    5: 0.29024988,
    5.5: 0.3060573775,
    6: 0.3210876,
    6.5: 0.3354450362,
    7: 0.34921268,
    7.5: 0.3624577511,
    8: 0.3752356,
    8.5: 0.387592416,
    9: 0.39956728,
    9.5: 0.4111935514,
    10: 0.4225,
    10.5: 0.4329264091,
    11: 0.44310755,
    11.5: 0.4530599591,
    12: 0.4627984,
    12.5: 0.472336093,
    13: 0.48168495,
    13.5: 0.4908558003,
    14: 0.49985844,
    14.5: 0.508701765,
    15: 0.51739395,
    15.5: 0.5259425113,
    16: 0.5343543,
    16.5: 0.5426357375,
    17: 0.5507927,
    17.5: 0.5588305862,
    18: 0.5667545,
    18.5: 0.5745691333,
    19: 0.5822789,
    19.5: 0.5898879072,
    20: 0.5974,
    20.5: 0.6048236651,
    21: 0.6121573,
    21.5: 0.6194041216,
    22: 0.6265671,
    22.5: 0.6336491432,
    23: 0.64065295,
    23.5: 0.6475809666,
    24: 0.65443563,
    24.5: 0.6612192524,
    25: 0.667934,
    25.5: 0.6745818959,
    26: 0.6811649,
    26.5: 0.6876849038,
    27: 0.69414365,
    27.5: 0.70054287,
    28: 0.7068842,
    28.5: 0.7131691091,
    29: 0.7193991,
    29.5: 0.7255756136,
    30: 0.7317,
    30.5: 0.7347410093,
    31: 0.7377695,
    31.5: 0.7407855938,
    32: 0.74378943,
    32.5: 0.7467812109,
    33: 0.74976104,
    33.5: 0.7527290867,
    34: 0.7556855,
    34.5: 0.7586303683,
    35: 0.76156384,
    35.5: 0.7644860647,
    36: 0.76739717,
    36.5: 0.7702972656,
    37: 0.7731865,
    37.5: 0.7760649616,
    38: 0.77893275,
    38.5: 0.7817900548,
    39: 0.784637,
    39.5: 0.7874736075,
    40: 0.7903,
    41:	0.79530001
}