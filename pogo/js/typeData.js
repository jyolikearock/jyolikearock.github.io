var types = [
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water"
];

/*
schema:

{
    "Type": {
        "defending": {
            "eff": [
                "Type1",
                "Type2"
            ]
        },
        "attacking": {
            "eff": [
                "Type1",
                "Type2"
            ]
        }
    }
}
*/

var typeChartByEffectiveness =
{
    "Bug": {
        "attacking": {
            "1.6": [
                "Grass",
                "Psychic",
                "Dark"
            ],
            "0.625": [
                "Fighting",
                "Flying",
                "Poison",
                "Ghost",
                "Steel",
                "Fire",
                "Fairy"
            ]
        },
        "defending": {
            "1.6": [
                "Flying",
                "Rock",
                "Fire"
            ],
            "0.625": [
                "Fighting",
                "Ground",
                "Grass"
            ]
        }
    },
    "Dark": {
        "attacking": {
            "1.6": [
                "Ghost",
                "Psychic"
            ],
            "0.625": [
                "Fighting",
                "Dark",
                "Fairy"
            ]
        },
        "defending": {
            "1.6": [
                "Fighting",
                "Bug",
                "Fairy"
            ],
            "0.625": [
                "Ghost",
                "Dark"
            ],
            "0.390625": [
                "Psychic"
            ]
        }
    },
    "Dragon": {
        "attacking": {
            "1.6": [
                "Dragon"
            ],
            "0.625": [
                "Steel",
                "Fairy"
            ],
            "0.390625": [
                "Fairy"
            ]
        },
        "defending": {
            "1.6": [
                "Ice",
                "Dragon",
                "Fairy"
            ],
            "0.625": [
                "Fire",
                "Water",
                "Grass",
                "Electric"
            ]
        }
    },
    "Electric": {
        "attacking": {
            "1.6": [
                "Flying",
                "Water"
            ],
            "0.625": [
                "Grass",
                "Electric",
                "Dragon"
            ],
            "0.390625": [
                "Ground"
            ]
        },
        "defending": {
            "1.6": [
                "Ground"
            ],
            "0.625": [
                "Flying",
                "Steel",
                "Electric"
            ]
        }
    },
    "Fairy": {
        "attacking": {
            "1.6": [
                "Fighting",
                "Dragon",
                "Dark"
            ],
            "0.625": [
                "Poison",
                "Steel",
                "Fire"
            ]
        },
        "defending": {
            "1.6": [
                "Poison",
                "Steel"
            ],
            "0.625": [
                "Fighting",
                "Bug",
                "Dark"
            ],
            "0.390625": [
                "Dragon"
            ]
        }
    },
    "Fighting": {
        "attacking": {
            "1.6": [
                "Normal",
                "Rock",
                "Steel",
                "Ice",
                "Dark"
            ],
            "0.625": [
                "Flying",
                "Poison",
                "Psychic",
                "Bug",
                "Fairy"
            ],
            "0.390625": [
                "Ghost"
            ]
        },
        "defending": {
            "1.6": [
                "Flying",
                "Psychic",
                "Fairy"
            ],
            "0.625": [
                "Rock",
                "Bug",
                "Dark"
            ]
        }
    },
    "Fire": {
        "attacking": {
            "1.6": [
                "Bug",
                "Steel",
                "Grass",
                "Ice"
            ],
            "0.625": [
                "Rock",
                "Fire",
                "Water",
                "Dragon"
            ]
        },
        "defending": {
            "1.6": [
                "Ground",
                "Rock",
                "Water"
            ],
            "0.625": [
                "Bug",
                "Steel",
                "Fire",
                "Grass",
                "Ice"
            ]
        }
    },
    "Flying": {
        "attacking": {
            "1.6": [
                "Fighting",
                "Bug",
                "Grass"
            ],
            "0.625": [
                "Rock",
                "Steel",
                "Electric"
            ]
        },
        "defending": {
            "1.6": [
                "Rock",
                "Electric",
                "Ice"
            ],
            "0.625": [
                "Fighting",
                "Bug",
                "Grass"
            ],
            "0.390625": [
                "Ground"
            ]
        }
    },
    "Ghost": {
        "attacking": {
            "1.6": [
                "Ghost",
                "Psychic"
            ],
            "0.625": [
                "Dark"
            ],
            "0.390625": [
                "Normal"
            ]
        },
        "defending": {
            "1.6": [
                "Ghost",
                "Dark"
            ],
            "0.625": [
                "Poison",
                "Bug"
            ],
            "0.390625": [
                "Fighting",
                "Normal"
            ]
        }
    },
    "Grass": {
        "attacking": {
            "1.6": [
                "Ground",
                "Rock",
                "Water"
            ],
            "0.625": [
                "Flying",
                "Poison",
                "Bug",
                "Steel",
                "Fire",
                "Grass",
                "Dragon"
            ]
        },
        "defending": {
            "1.6": [
                "Flying",
                "Poison",
                "Bug",
                "Fire",
                "Ice"
            ],
            "0.625": [
                "Ground",
                "Water",
                "Grass",
                "Electric"
            ]
        }
    },
    "Ground": {
        "attacking": {
            "1.6": [
                "Poison",
                "Rock",
                "Steel",
                "Fire",
                "Electric"
            ],
            "0.625": [
                "Bug",
                "Grass"
            ],
            "0.390625": [
                "Flying"
            ]
        },
        "defending": {
            "1.6": [
                "Water",
                "Grass",
                "Ice"
            ],
            "0.625": [
                "Poison",
                "Rock"
            ],
            "0.390625": [
                "Electric"
            ]
        }
    },
    "Ice": {
        "attacking": {
            "1.6": [
                "Flying",
                "Ground",
                "Grass",
                "Dragon"
            ],
            "0.625": [
                "Steel",
                "Fire",
                "Water",
                "Ice"
            ]
        },
        "defending": {
            "1.6": [
                "Fighting",
                "Rock",
                "Steel",
                "Fire"
            ],
            "0.625": [
                "Ice"
            ]
        }
    },
    "Normal": {
        "attacking": {
            "0.625": [
                "Rock",
                "Steel"
            ],
            "0.390625": [
                "Ghost"
            ]
        },
        "defending": {
            "1.6": [
                "Fighting"
            ],
            "0.390625": [
                "Ghost"
            ]
        }
    },
    "Poison": {
        "attacking": {
            "1.6": [
                "Grass",
                "Fairy"
            ],
            "0.625": [
                "Poison",
                "Ground",
                "Rock",
                "Ghost"
            ],
            "0.390625": [
                "Steel"
            ]
        },
        "defending": {
            "1.6": [
                "Ground",
                "Psychic"
            ],
            "0.625": [
                "Fighting",
                "Poison",
                "Grass",
                "Fairy"
            ]
        }
    },
    "Psychic": {
        "attacking": {
            "1.6": [
                "Fighting",
                "Poison"
            ],
            "0.625": [
                "Steel",
                "Psychic"
            ],
            "0.390625": [
                "Dark"
            ]
        },
        "defending": {
            "1.6": [
                "Bug",
                "Ghost",
                "Dark"
            ],
            "0.625": [
                "Fighting",
                "Psychic"
            ]
        }
    },
    "Rock": {
        "attacking": {
            "1.6": [
                "Flying",
                "Bug",
                "Fire",
                "Ice"
            ],
            "0.625": [
                "Fighting",
                "Ground",
                "Steel"
            ]
        },
        "defending": {
            "1.6": [
                "Fighting",
                "Ground",
                "Steel",
                "Water",
                "Grass"
            ],
            "0.625": [
                "Normal",
                "Flying",
                "Poison",
                "Fire"
            ]
        }
    },
    "Steel": {
        "attacking": {
            "1.6": [
                "Rock",
                "Ice",
                "Fairy"
            ],
            "0.625": [
                "Steel",
                "Fire",
                "Water",
                "Electric"
            ]
        },
        "defending": {
            "1.6": [
                "Fighting",
                "Ground",
                "Fire"
            ],
            "0.625": [
                "Normal",
                "Flying",
                "Rock",
                "Bug",
                "Steel",
                "Grass",
                "Psychic",
                "Ice",
                "Dragon",
                "Fairy"
            ],
            "0.390625": [
                "Poison"
            ]
        }
    },
    "Water": {
        "attacking": {
            "1.6": [
                "Ground",
                "Rock",
                "Fire"
            ],
            "0.625": [
                "Water",
                "Grass",
                "Dragon"
            ]
        },
        "defending": {
            "1.6": [
                "Grass",
                "Electric"
            ],
            "0.625": [
                "Steel",
                "Fire",
                "Water",
                "Ice"
            ]
        }
    }
};

var typeChartByDefender =
{
    "Bug": {
        "Grass": 1.6,
        "Psychic": 1.6,
        "Dark": 1.6,
        "Fighting": 0.625,
        "Flying": 0.625,
        "Poison": 0.625,
        "Ghost": 0.625,
        "Steel": 0.625,
        "Fire": 0.625,
        "Fairy": 0.625
    },
    "Dark": {
        "Ghost": 1.6,
        "Psychic": 1.6,
        "Fighting": 0.625,
        "Dark": 0.625,
        "Fairy": 0.625
    },
    "Dragon": {
        "Dragon": 1.6,
        "Steel": 0.625,
        "Fairy": 0.390625
    },
    "Electric": {
        "Flying": 1.6,
        "Water": 1.6,
        "Grass": 0.625,
        "Electric": 0.625,
        "Dragon": 0.625,
        "Ground": 0.390625
    },
    "Fairy": {
        "Fighting": 1.6,
        "Dragon": 1.6,
        "Dark": 1.6,
        "Poison": 0.625,
        "Steel": 0.625,
        "Fire": 0.625
    },
    "Fighting": {
        "Normal": 1.6,
        "Rock": 1.6,
        "Steel": 1.6,
        "Ice": 1.6,
        "Dark": 1.6,
        "Flying": 0.625,
        "Poison": 0.625,
        "Psychic": 0.625,
        "Bug": 0.625,
        "Fairy": 0.625,
        "Ghost": 0.390625
    },
    "Fire": {
        "Bug": 1.6,
        "Steel": 1.6,
        "Grass": 1.6,
        "Ice": 1.6,
        "Rock": 0.625,
        "Fire": 0.625,
        "Water": 0.625,
        "Dragon": 0.625
    },
    "Flying": {
        "Fighting": 1.6,
        "Bug": 1.6,
        "Grass": 1.6,
        "Rock": 0.625,
        "Steel": 0.625,
        "Electric": 0.625
    },
    "Ghost": {
        "Ghost": 1.6,
        "Psychic": 1.6,
        "Dark": 0.625,
        "Normal": 0.390625
    },
    "Grass": {
        "Ground": 1.6,
        "Rock": 1.6,
        "Water": 1.6,
        "Flying": 0.625,
        "Poison": 0.625,
        "Bug": 0.625,
        "Steel": 0.625,
        "Fire": 0.625,
        "Grass": 0.625,
        "Dragon": 0.625
    },
    "Ground": {
        "Poison": 1.6,
        "Rock": 1.6,
        "Steel": 1.6,
        "Fire": 1.6,
        "Electric": 1.6,
        "Bug": 0.625,
        "Grass": 0.625,
        "Flying": 0.390625
    },
    "Ice": {
        "Flying": 1.6,
        "Ground": 1.6,
        "Grass": 1.6,
        "Dragon": 1.6,
        "Steel": 0.625,
        "Fire": 0.625,
        "Water": 0.625,
        "Ice": 0.625
    },
    "Normal": {
        "Rock": 0.625,
        "Steel": 0.625,
        "Ghost": 0.390625
    },
    "Poison": {
        "Grass": 1.6,
        "Fairy": 1.6,
        "Poison": 0.625,
        "Ground": 0.625,
        "Rock": 0.625,
        "Ghost": 0.625,
        "Steel": 0.390625
    },
    "Psychic": {
        "Fighting": 1.6,
        "Poison": 1.6,
        "Steel": 0.625,
        "Psychic": 0.625,
        "Dark": 0.390625
    },
    "Rock": {
        "Flying": 1.6,
        "Bug": 1.6,
        "Fire": 1.6,
        "Ice": 1.6,
        "Fighting": 0.625,
        "Ground": 0.625,
        "Steel": 0.625
    },
    "Steel": {
        "Rock": 1.6,
        "Ice": 1.6,
        "Fairy": 1.6,
        "Steel": 0.625,
        "Fire": 0.625,
        "Water": 0.625,
        "Electric": 0.625
    },
    "Water": {
        "Ground": 1.6,
        "Rock": 1.6,
        "Fire": 1.6,
        "Water": 0.625,
        "Grass": 0.625,
        "Dragon": 0.625
    }
};

var dualTypeChart = {};

for (i = 0; i < types.length; i++) {
    for (j = i+1; j < types.length; j++) {
        let t1 = types[i];
        let t2 = types[j];
        let dEffs = {};
        let newEffs = {
            "defending": dEffs
        }
        let checkedTypes = [];

        let effs1 = typeChartByEffectiveness[t1].defending;
        for (const e1 in effs1) {
            let eTypes = effs1[e1];
            for (const eType of eTypes) {
                let e2 = typeChartByDefender[eType][t2];
                if (!e2) {
                    e2 = 1;
                }

                let newEff = round6(e1 * e2);
                if (newEff === 1) {
                    continue;
                }

                if (!dEffs[newEff]) {
                    dEffs[newEff] = [];
                }
                dEffs[newEff].push(eType);

                checkedTypes.push(eType);
            }
        }

        let effs2 = typeChartByEffectiveness[t2].defending;
        for (const e2 in effs2) {
            let eTypes = effs2[e2];
            for (const eType of eTypes) {
                if (checkedTypes.includes(eType)) {
                    continue;
                }

                let e1 = typeChartByDefender[eType][t1];
                if (!e1) {
                    e1 = 1;
                }
                let newEff = round6(e1 * e2);
                if (newEff === 1) {
                    continue;
                }

                if (!dEffs[newEff]) {
                    dEffs[newEff] = [];
                }
                dEffs[newEff].push(eType);
            }
        }

        dualTypeChart[getKeyForDualType(t1, t2)] = newEffs;
    }
}

function getKeyForDualType(t1, t2) {
    if (t1 < t2) {
        return t1.concat(t2);
    }
    else {
        return t2.concat(t1);
    }
}