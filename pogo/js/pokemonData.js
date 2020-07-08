// regex for CSV to JSON conversion:
// find: ^(.+)\t(.+)\t(.+)\t(.+)\t(.+)\t(.+)\t(.+)\t(.+)$
// replace: {\r\n\t"name": "$1",\r\n\t"id": $2,\r\n\t"type": "$3",\r\n\t"atk": $4,\r\n\t"def": $5,\r\n\t"hp": $6,\r\n\t"fastMoves": "$7",\r\n\t"chargeMoves": "$8"\r\n},

var pokemons =
[
    {
		"name": "Bulbasaur",
		"id": 1,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 118,
		"def": 111,
		"hp": 128,
		"fastMoves": "Vine Whip,Tackle",
		"chargeMoves": "Seed Bomb,Sludge Bomb,Power Whip,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Ivysaur",
		"id": 2,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 151,
		"def": 143,
		"hp": 155,
		"fastMoves": "Vine Whip,Razor Leaf",
		"chargeMoves": "Sludge Bomb,Solar Beam,Power Whip,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Venusaur",
		"id": 3,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 198,
		"def": 189,
		"hp": 190,
		"fastMoves": "Vine Whip,Razor Leaf",
		"chargeMoves": "Petal Blizzard,Sludge Bomb,Solar Beam,Frenzy Plant (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Charmander",
		"id": 4,
		"type": [
			"FIRE"
		],
		"atk": 116,
		"def": 93,
		"hp": 118,
		"fastMoves": "Ember,Scratch",
		"chargeMoves": "Flamethrower,Flame Charge,Flame Burst,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Charmeleon",
		"id": 5,
		"type": [
			"FIRE"
		],
		"atk": 158,
		"def": 126,
		"hp": 151,
		"fastMoves": "Ember,Fire Fang",
		"chargeMoves": "Flamethrower,Flame Burst,Fire Punch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Charizard",
		"id": 6,
		"type": [
			"FIRE",
			"FLYING"
		],
		"atk": 223,
		"def": 173,
		"hp": 186,
		"fastMoves": "Air Slash,Fire Spin",
		"chargeMoves": "Dragon Claw,Fire Blast,Overheat,Blast Burn (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Squirtle",
		"id": 7,
		"type": [
			"WATER"
		],
		"atk": 94,
		"def": 121,
		"hp": 127,
		"fastMoves": "Tackle,Bubble",
		"chargeMoves": "Aqua Jet,Aqua Tail,Water Pulse,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Wartortle",
		"id": 8,
		"type": [
			"WATER"
		],
		"atk": 126,
		"def": 155,
		"hp": 153,
		"fastMoves": "Bite,Water Gun",
		"chargeMoves": "Ice Beam,Aqua Jet,Hydro Pump,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Blastoise",
		"id": 9,
		"type": [
			"WATER"
		],
		"atk": 171,
		"def": 207,
		"hp": 188,
		"fastMoves": "Bite,Water Gun",
		"chargeMoves": "Flash Cannon,Ice Beam,Hydro Pump,Hydro Cannon (Community Day),Skull Bash,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Caterpie",
		"id": 10,
		"type": [
			"BUG"
		],
		"atk": 55,
		"def": 55,
		"hp": 128,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Metapod",
		"id": 11,
		"type": [
			"BUG"
		],
		"atk": 45,
		"def": 80,
		"hp": 137,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Butterfree",
		"id": 12,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 167,
		"def": 137,
		"hp": 155,
		"fastMoves": "Confusion,Struggle Bug",
		"chargeMoves": "Bug Buzz,Signal Beam,Psychic",
		"legendary": false
	},{
		"name": "Weedle",
		"id": 13,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 63,
		"def": 50,
		"hp": 120,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Struggle,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Kakuna",
		"id": 14,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 46,
		"def": 75,
		"hp": 128,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Struggle,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Beedrill",
		"id": 15,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 169,
		"def": 130,
		"hp": 163,
		"fastMoves": "Poison Jab,Infestation",
		"chargeMoves": "Aerial Ace,Sludge Bomb,X-Scissor,Fell Stinger,Drill Run (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Pidgey",
		"id": 16,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 85,
		"def": 73,
		"hp": 120,
		"fastMoves": "Quick Attack,Tackle",
		"chargeMoves": "Aerial Ace,Twister,Air Cutter",
		"legendary": false
	},{
		"name": "Pidgeotto",
		"id": 17,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 117,
		"def": 105,
		"hp": 160,
		"fastMoves": "Wing Attack,Steel Wing",
		"chargeMoves": "Aerial Ace,Twister,Air Cutter",
		"legendary": false
	},{
		"name": "Pidgeot",
		"id": 18,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 166,
		"def": 154,
		"hp": 195,
		"fastMoves": "Steel Wing,Air Slash",
		"chargeMoves": "Aerial Ace,Hurricane,Brave Bird",
		"legendary": false
	},{
		"name": "Rattata",
		"id": 19,
		"type": [
			"NORMAL"
		],
		"atk": 103,
		"def": 70,
		"hp": 102,
		"fastMoves": "Quick Attack,Tackle",
		"chargeMoves": "Dig,Hyper Fang,Body Slam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alolan Rattata",
		"id": 19,
		"type": [
			"DARK",
			"NORMAL"
		],
		"atk": 103,
		"def": 70,
		"hp": 102,
		"fastMoves": "Quick Attack,Tackle",
		"chargeMoves": "Shadow Ball,Hyper Fang,Crunch",
		"legendary": false
	},{
		"name": "Alolan Raticate",
		"id": 20,
		"type": [
			"DARK",
			"NORMAL"
		],
		"atk": 135,
		"def": 154,
		"hp": 181,
		"fastMoves": "Bite,Quick Attack",
		"chargeMoves": "Hyper Beam,Hyper Fang,Crunch",
		"legendary": false
	},{
		"name": "Raticate",
		"id": 20,
		"type": [
			"NORMAL"
		],
		"atk": 161,
		"def": 139,
		"hp": 146,
		"fastMoves": "Bite,Quick Attack",
		"chargeMoves": "Hyper Beam,Dig,Hyper Fang,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Spearow",
		"id": 21,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 112,
		"def": 60,
		"hp": 120,
		"fastMoves": "Peck,Quick Attack",
		"chargeMoves": "Drill Peck,Aerial Ace,Sky Attack",
		"legendary": false
	},{
		"name": "Fearow",
		"id": 22,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 182,
		"def": 133,
		"hp": 163,
		"fastMoves": "Peck,Steel Wing",
		"chargeMoves": "Aerial Ace,Drill Run,Sky Attack",
		"legendary": false
	},{
		"name": "Ekans",
		"id": 23,
		"type": [
			"POISON"
		],
		"atk": 110,
		"def": 97,
		"hp": 111,
		"fastMoves": "Acid,Poison Sting",
		"chargeMoves": "Wrap,Poison Fang,Sludge Bomb",
		"legendary": false
	},{
		"name": "Arbok",
		"id": 24,
		"type": [
			"POISON"
		],
		"atk": 167,
		"def": 153,
		"hp": 155,
		"fastMoves": "Bite,Acid,Dragon Tail",
		"chargeMoves": "Dark Pulse,Sludge Wave,Gunk Shot,Acid Spray",
		"legendary": false
	},{
		"name": "Pikachu",
		"id": 25,
		"type": [
			"ELECTRIC"
		],
		"atk": 112,
		"def": 96,
		"hp": 111,
		"fastMoves": "Thunder Shock,Quick Attack",
		"chargeMoves": "Discharge,Thunderbolt,Wild Charge,Surf (Community Day)",
		"legendary": false
	},{
		"name": "Pikachu Libre",
		"id": 25,
		"type": [
			"ELECTRIC"
		],
		"atk": 112,
		"def": 96,
		"hp": 111,
		"fastMoves": "Thunder Shock,Charm",
		"chargeMoves": "Thunder Punch,Play Rough,Flying Press",
		"legendary": false
	},{
		"name": "Flying Pikachu",
		"id": 25,
		"type": [
			"ELECTRIC"
		],
		"atk": 111,
		"def": 112,
		"hp": 96,
		"fastMoves": "Quick Attack,Thunder Shock",
		"chargeMoves": "Discharge,Wild Charge,Thunderbolt,Fly",
		"legendary": false
	},{
		"name": "Alolan Raichu",
		"id": 26,
		"type": [
			"ELECTRIC"
		],
		"atk": 201,
		"def": 154,
		"hp": 155,
		"fastMoves": "Thunder Shock,Spark,Volt Switch",
		"chargeMoves": "Thunder Punch,Psychic,Wild Charge,Grass Knot",
		"legendary": false
	},{
		"name": "Raichu",
		"id": 26,
		"type": [
			"ELECTRIC",
			"PSYCHIC"
		],
		"atk": 193,
		"def": 151,
		"hp": 155,
		"fastMoves": "Thunder Shock,Spark,Volt Switch,Charm",
		"chargeMoves": "Thunder Punch,Brick Break,Wild Charge,Skull Bash",
		"legendary": false
	},{
		"name": "Alolan Sandshrew",
		"id": 27,
		"type": [
			"GROUND"
		],
		"atk": 125,
		"def": 129,
		"hp": 137,
		"fastMoves": "Metal Claw,Powder Snow",
		"chargeMoves": "Blizzard,Night Slash,Gyro Ball",
		"legendary": false
	},{
		"name": "Sandshrew",
		"id": 27,
		"type": [
			"ICE",
			"STEEL"
		],
		"atk": 126,
		"def": 120,
		"hp": 137,
		"fastMoves": "Mud Shot,Scratch",
		"chargeMoves": "Dig,Rock Slide,Sand Tomb,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alolan Sandslash",
		"id": 28,
		"type": [
			"GROUND"
		],
		"atk": 177,
		"def": 195,
		"hp": 181,
		"fastMoves": "Metal Claw,Powder Snow",
		"chargeMoves": "Ice Punch,Blizzard,Bulldoze,Gyro Ball",
		"legendary": false
	},{
		"name": "Sandslash",
		"id": 28,
		"type": [
			"ICE",
			"STEEL"
		],
		"atk": 182,
		"def": 175,
		"hp": 181,
		"fastMoves": "Mud Shot,Metal Claw",
		"chargeMoves": "Earthquake,Rock Tomb,Bulldoze,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Nidoran Female",
		"id": 29,
		"type": [
			"POISON"
		],
		"atk": 86,
		"def": 89,
		"hp": 146,
		"fastMoves": "Bite,Poison Sting",
		"chargeMoves": "Poison Fang,Sludge Bomb,Body Slam",
		"legendary": false
	},{
		"name": "Nidorina",
		"id": 30,
		"type": [
			"POISON"
		],
		"atk": 117,
		"def": 120,
		"hp": 172,
		"fastMoves": "Bite,Poison Sting",
		"chargeMoves": "Dig,Poison Fang,Sludge Bomb",
		"legendary": false
	},{
		"name": "Nidoqueen",
		"id": 31,
		"type": [
			"POISON",
			"GROUND"
		],
		"atk": 180,
		"def": 173,
		"hp": 207,
		"fastMoves": "Bite,Poison Jab",
		"chargeMoves": "Earthquake,Stone Edge,Sludge Wave,Earth Power",
		"legendary": false
	},{
		"name": "Nidoran Male",
		"id": 32,
		"type": [
			"POISON"
		],
		"atk": 105,
		"def": 76,
		"hp": 130,
		"fastMoves": "Peck,Poison Sting",
		"chargeMoves": "Sludge Bomb,Horn Attack,Body Slam",
		"legendary": false
	},{
		"name": "Nidorino",
		"id": 33,
		"type": [
			"POISON"
		],
		"atk": 137,
		"def": 111,
		"hp": 156,
		"fastMoves": "Poison Jab,Poison Sting",
		"chargeMoves": "Dig,Sludge Bomb,Horn Attack",
		"legendary": false
	},{
		"name": "Nidoking",
		"id": 34,
		"type": [
			"POISON",
			"GROUND"
		],
		"atk": 204,
		"def": 156,
		"hp": 191,
		"fastMoves": "Poison Jab,Iron Tail",
		"chargeMoves": "Megahorn,Earthquake,Sludge Wave,Earth Power",
		"legendary": false
	},{
		"name": "Clefairy",
		"id": 35,
		"type": [
			"FAIRY"
		],
		"atk": 107,
		"def": 108,
		"hp": 172,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Disarming Voice,Moonblast,Body Slam",
		"legendary": false
	},{
		"name": "Clefable",
		"id": 36,
		"type": [
			"FAIRY"
		],
		"atk": 178,
		"def": 162,
		"hp": 216,
		"fastMoves": "Zen Headbutt,Charge Beam,Charm",
		"chargeMoves": "Dazzling Gleam,Moonblast,Psychic,Meteor Mash",
		"legendary": false
	},{
		"name": "Alolan Vulpix",
		"id": 37,
		"type": [
			"ICE"
		],
		"atk": 96,
		"def": 109,
		"hp": 116,
		"fastMoves": "Zen Headbutt,Powder Snow",
		"chargeMoves": "Dark Pulse,Ice Beam,Blizzard",
		"legendary": false
	},{
		"name": "Vulpix",
		"id": 37,
		"type": [
			"FIRE"
		],
		"atk": 96,
		"def": 109,
		"hp": 116,
		"fastMoves": "Ember,Quick Attack",
		"chargeMoves": "Flamethrower,Flame Charge,Body Slam",
		"legendary": false
	},{
		"name": "Alolan Ninetales",
		"id": 38,
		"type": [
			"FIRE"
		],
		"atk": 170,
		"def": 193,
		"hp": 177,
		"fastMoves": "Feint Attack,Powder Snow,Charm",
		"chargeMoves": "Ice Beam,Blizzard,Psyshock,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Ninetales",
		"id": 38,
		"type": [
			"FIRE"
		],
		"atk": 169,
		"def": 190,
		"hp": 177,
		"fastMoves": "Feint Attack,Fire Spin",
		"chargeMoves": "Heat Wave,Psyshock,Solar Beam,Overheat",
		"legendary": false
	},{
		"name": "Jigglypuff",
		"id": 39,
		"type": [
			"NORMAL",
			"FAIRY"
		],
		"atk": 80,
		"def": 41,
		"hp": 251,
		"fastMoves": "Pound,Feint Attack",
		"chargeMoves": "Disarming Voice,Dazzling Gleam,Gyro Ball",
		"legendary": false
	},{
		"name": "Wigglytuff",
		"id": 40,
		"type": [
			"NORMAL",
			"FAIRY"
		],
		"atk": 156,
		"def": 90,
		"hp": 295,
		"fastMoves": "Pound,Feint Attack,Charm",
		"chargeMoves": "Hyper Beam,Ice Beam,Dazzling Gleam,Play Rough",
		"legendary": false
	},{
		"name": "Zubat",
		"id": 41,
		"type": [
			"POISON",
			"FLYING"
		],
		"atk": 83,
		"def": 73,
		"hp": 120,
		"fastMoves": "Bite,Quick Attack",
		"chargeMoves": "Poison Fang,Air Cutter,Swift,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Golbat",
		"id": 42,
		"type": [
			"POISON",
			"FLYING"
		],
		"atk": 161,
		"def": 150,
		"hp": 181,
		"fastMoves": "Bite,Wing Attack",
		"chargeMoves": "Poison Fang,Shadow Ball,Air Cutter,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Oddish",
		"id": 43,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 131,
		"def": 112,
		"hp": 128,
		"fastMoves": "Razor Leaf,Acid",
		"chargeMoves": "Seed Bomb,Moonblast,Sludge Bomb,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Gloom",
		"id": 44,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 153,
		"def": 136,
		"hp": 155,
		"fastMoves": "Razor Leaf,Acid",
		"chargeMoves": "Petal Blizzard,Moonblast,Sludge Bomb,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Vileplume",
		"id": 45,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 202,
		"def": 167,
		"hp": 181,
		"fastMoves": "Razor Leaf,Acid",
		"chargeMoves": "Petal Blizzard,Moonblast,Sludge Bomb,Solar Beam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Paras",
		"id": 46,
		"type": [
			"BUG",
			"GRASS"
		],
		"atk": 121,
		"def": 99,
		"hp": 111,
		"fastMoves": "Bug Bite,Scratch",
		"chargeMoves": "Seed Bomb,Cross Poison,X-Scissor",
		"legendary": false
	},{
		"name": "Parasect",
		"id": 47,
		"type": [
			"BUG",
			"GRASS"
		],
		"atk": 165,
		"def": 146,
		"hp": 155,
		"fastMoves": "Fury Cutter,Struggle Bug",
		"chargeMoves": "Cross Poison,X-Scissor,Solar Beam",
		"legendary": false
	},{
		"name": "Venonat",
		"id": 48,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 100,
		"def": 100,
		"hp": 155,
		"fastMoves": "Bug Bite,Confusion",
		"chargeMoves": "Psybeam,Poison Fang,Signal Beam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Venomoth",
		"id": 49,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 179,
		"def": 143,
		"hp": 172,
		"fastMoves": "Confusion,Infestation",
		"chargeMoves": "Bug Buzz,Poison Fang,Psychic,Silver Wind,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alolan Diglett",
		"id": 50,
		"type": [
			"GROUND",
			"STEEL"
		],
		"atk": 108,
		"def": 81,
		"hp": 67,
		"fastMoves": "Metal Claw,Mud-Slap",
		"chargeMoves": "Dig,Rock Tomb,Mud Bomb",
		"legendary": false
	},{
		"name": "Diglett",
		"id": 50,
		"type": [
			"GROUND"
		],
		"atk": 109,
		"def": 78,
		"hp": 67,
		"fastMoves": "Scratch,Mud-Slap",
		"chargeMoves": "Dig,Rock Tomb,Mud Bomb",
		"legendary": false
	},{
		"name": "Alolan Dugtrio",
		"id": 51,
		"type": [
			"GROUND",
			"STEEL"
		],
		"atk": 201,
		"def": 142,
		"hp": 111,
		"fastMoves": "Metal Claw,Mud-Slap",
		"chargeMoves": "Earthquake,Iron Head,Mud Bomb",
		"legendary": false
	},{
		"name": "Dugtrio",
		"id": 51,
		"type": [
			"GROUND"
		],
		"atk": 167,
		"def": 134,
		"hp": 111,
		"fastMoves": "Sucker Punch,Mud-Slap",
		"chargeMoves": "Earthquake,Stone Edge,Mud Bomb",
		"legendary": false
	},{
		"name": "Alolan Meowth",
		"id": 52,
		"type": [
			"DARK"
		],
		"atk": 99,
		"def": 78,
		"hp": 120,
		"fastMoves": "Bite,Scratch",
		"chargeMoves": "Dark Pulse,Night Slash,Foul Play",
		"legendary": false
	},{
		"name": "Meowth",
		"id": 52,
		"type": [
			"NORMAL"
		],
		"atk": 92,
		"def": 78,
		"hp": 120,
		"fastMoves": "Bite,Scratch",
		"chargeMoves": "Dark Pulse,Night Slash,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Galarian Meowth",
		"id": 52,
		"type": [
			"STEEL"
		],
		"atk": 137,
		"def": 115,
		"hp": 92,
		"fastMoves": "Scratch,Metal Claw",
		"chargeMoves": "Night Slash,Gyro Ball,Dig",
		"legendary": false
	},{
		"name": "Alolan Persian",
		"id": 53,
		"type": [
			"DARK"
		],
		"atk": 158,
		"def": 136,
		"hp": 163,
		"fastMoves": "Scratch,Feint Attack",
		"chargeMoves": "Dark Pulse,Play Rough,Foul Play",
		"legendary": false
	},{
		"name": "Persian",
		"id": 53,
		"type": [
			"NORMAL"
		],
		"atk": 150,
		"def": 136,
		"hp": 163,
		"fastMoves": "Scratch,Feint Attack",
		"chargeMoves": "Power Gem,Play Rough,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Psyduck",
		"id": 54,
		"type": [
			"WATER"
		],
		"atk": 122,
		"def": 95,
		"hp": 137,
		"fastMoves": "Water Gun,Zen Headbutt",
		"chargeMoves": "Cross Chop,Psybeam,Aqua Tail,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Golduck",
		"id": 55,
		"type": [
			"WATER"
		],
		"atk": 191,
		"def": 162,
		"hp": 190,
		"fastMoves": "Water Gun,Confusion",
		"chargeMoves": "Cross Chop,Ice Beam,Bubble Beam,Hydro Pump,Psychic,Frustration (Shadow),Return (Shadow),Synchronoise",
		"legendary": false
	},{
		"name": "Mankey",
		"id": 56,
		"type": [
			"FIGHTING"
		],
		"atk": 148,
		"def": 82,
		"hp": 120,
		"fastMoves": "Karate Chop,Scratch",
		"chargeMoves": "Cross Chop,Low Sweep,Brick Break",
		"legendary": false
	},{
		"name": "Primeape",
		"id": 57,
		"type": [
			"FIGHTING"
		],
		"atk": 207,
		"def": 138,
		"hp": 163,
		"fastMoves": "Low Kick,Counter",
		"chargeMoves": "Night Slash,Low Sweep,Close Combat",
		"legendary": false
	},{
		"name": "Growlithe",
		"id": 58,
		"type": [
			"FIRE"
		],
		"atk": 136,
		"def": 93,
		"hp": 146,
		"fastMoves": "Bite,Ember",
		"chargeMoves": "Flame Wheel,Flamethrower,Body Slam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Arcanine",
		"id": 59,
		"type": [
			"FIRE"
		],
		"atk": 227,
		"def": 166,
		"hp": 207,
		"fastMoves": "Fire Fang,Snarl,Thunder Fang",
		"chargeMoves": "Flamethrower,Fire Blast,Wild Charge,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Poliwag",
		"id": 60,
		"type": [
			"WATER"
		],
		"atk": 101,
		"def": 82,
		"hp": 120,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Bubble Beam,Mud Bomb,Body Slam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Poliwhirl",
		"id": 61,
		"type": [
			"WATER"
		],
		"atk": 130,
		"def": 123,
		"hp": 163,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Bubble Beam,Mud Bomb,Water Pulse,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Poliwrath",
		"id": 62,
		"type": [
			"WATER",
			"FIGHTING"
		],
		"atk": 182,
		"def": 184,
		"hp": 207,
		"fastMoves": "Mud Shot,Bubble,Rock Smash",
		"chargeMoves": "Ice Punch,Hydro Pump,Dynamic Punch,Power-Up Punch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Abra",
		"id": 63,
		"type": [
			"PSYCHIC"
		],
		"atk": 195,
		"def": 82,
		"hp": 93,
		"fastMoves": "Zen Headbutt,Charge Beam",
		"chargeMoves": "Psyshock,Shadow Ball,Signal Beam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Kadabra",
		"id": 64,
		"type": [
			"PSYCHIC"
		],
		"atk": 232,
		"def": 117,
		"hp": 120,
		"fastMoves": "Psycho Cut,Confusion",
		"chargeMoves": "Psybeam,Shadow Ball,Dazzling Gleam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alakazam",
		"id": 65,
		"type": [
			"PSYCHIC"
		],
		"atk": 271,
		"def": 167,
		"hp": 146,
		"fastMoves": "Psycho Cut,Confusion",
		"chargeMoves": "Shadow Ball,Fire Punch,Focus Blast,Future Sight,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Machop",
		"id": 66,
		"type": [
			"FIGHTING"
		],
		"atk": 137,
		"def": 82,
		"hp": 172,
		"fastMoves": "Karate Chop,Rock Smash",
		"chargeMoves": "Cross Chop,Low Sweep,Brick Break",
		"legendary": false
	},{
		"name": "Machoke",
		"id": 67,
		"type": [
			"FIGHTING"
		],
		"atk": 177,
		"def": 125,
		"hp": 190,
		"fastMoves": "Low Kick,Karate Chop",
		"chargeMoves": "Submission,Brick Break,Dynamic Punch",
		"legendary": false
	},{
		"name": "Machamp",
		"id": 68,
		"type": [
			"FIGHTING"
		],
		"atk": 234,
		"def": 159,
		"hp": 207,
		"fastMoves": "Bullet Punch,Counter",
		"chargeMoves": "Cross Chop,Rock Slide,Close Combat,Dynamic Punch,Heavy Slam",
		"legendary": false
	},{
		"name": "Bellsprout",
		"id": 69,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 139,
		"def": 61,
		"hp": 137,
		"fastMoves": "Vine Whip,Acid",
		"chargeMoves": "Wrap,Sludge Bomb,Power Whip,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Weepinbell",
		"id": 70,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 172,
		"def": 92,
		"hp": 163,
		"fastMoves": "Acid,Bullet Seed",
		"chargeMoves": "Seed Bomb,Sludge Bomb,Power Whip,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Victreebel",
		"id": 71,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 207,
		"def": 135,
		"hp": 190,
		"fastMoves": "Razor Leaf,Acid",
		"chargeMoves": "Sludge Bomb,Solar Beam,Leaf Blade,Acid Spray,Leaf Tornado,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Tentacool",
		"id": 72,
		"type": [
			"WATER",
			"POISON"
		],
		"atk": 97,
		"def": 149,
		"hp": 120,
		"fastMoves": "Poison Sting,Bubble",
		"chargeMoves": "Wrap,Bubble Beam,Water Pulse",
		"legendary": false
	},{
		"name": "Tentacruel",
		"id": 73,
		"type": [
			"WATER",
			"POISON"
		],
		"atk": 166,
		"def": 209,
		"hp": 190,
		"fastMoves": "Poison Jab,Acid",
		"chargeMoves": "Blizzard,Sludge Wave,Hydro Pump,Acid Spray",
		"legendary": false
	},{
		"name": "Alolan Geodude",
		"id": 74,
		"type": [
			"ROCK",
			"ELECTRIC"
		],
		"atk": 132,
		"def": 132,
		"hp": 120,
		"fastMoves": "Rock Throw,Volt Switch",
		"chargeMoves": "Rock Tomb,Rock Slide,Thunderbolt",
		"legendary": false
	},{
		"name": "Geodude",
		"id": 74,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 132,
		"def": 132,
		"hp": 120,
		"fastMoves": "Tackle,Rock Throw",
		"chargeMoves": "Dig,Rock Tomb,Rock Slide",
		"legendary": false
	},{
		"name": "Alolan Graveler",
		"id": 75,
		"type": [
			"ROCK",
			"ELECTRIC"
		],
		"atk": 164,
		"def": 164,
		"hp": 146,
		"fastMoves": "Rock Throw,Volt Switch",
		"chargeMoves": "Stone Edge,Thunderbolt,Rock Blast",
		"legendary": false
	},{
		"name": "Graveler",
		"id": 75,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 164,
		"def": 164,
		"hp": 146,
		"fastMoves": "Rock Throw,Mud-Slap",
		"chargeMoves": "Dig,Stone Edge,Rock Blast",
		"legendary": false
	},{
		"name": "Alolan Golem",
		"id": 76,
		"type": [
			"ROCK",
			"ELECTRIC"
		],
		"atk": 211,
		"def": 198,
		"hp": 190,
		"fastMoves": "Rock Throw,Volt Switch",
		"chargeMoves": "Stone Edge,Wild Charge,Rock Blast",
		"legendary": false
	},{
		"name": "Golem",
		"id": 76,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 211,
		"def": 198,
		"hp": 190,
		"fastMoves": "Rock Throw,Mud-Slap",
		"chargeMoves": "Earthquake,Stone Edge,Ancient Power,Rock Blast",
		"legendary": false
	},{
		"name": "Ponyta",
		"id": 77,
		"type": [
			"FIRE"
		],
		"atk": 170,
		"def": 127,
		"hp": 137,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Flame Wheel,Flame Charge,Stomp",
		"legendary": false
	},{
		"name": "Rapidash",
		"id": 78,
		"type": [
			"FIRE"
		],
		"atk": 207,
		"def": 162,
		"hp": 163,
		"fastMoves": "Low Kick,Fire Spin",
		"chargeMoves": "Heat Wave,Drill Run,Fire Blast",
		"legendary": false
	},{
		"name": "Slowpoke",
		"id": 79,
		"type": [
			"WATER",
			"PSYCHIC"
		],
		"atk": 109,
		"def": 98,
		"hp": 207,
		"fastMoves": "Water Gun,Confusion",
		"chargeMoves": "Psyshock,Water Pulse,Psychic",
		"legendary": false
	},{
		"name": "Slowbro",
		"id": 80,
		"type": [
			"WATER",
			"PSYCHIC"
		],
		"atk": 177,
		"def": 180,
		"hp": 216,
		"fastMoves": "Water Gun,Confusion",
		"chargeMoves": "Ice Beam,Water Pulse,Psychic",
		"legendary": false
	},{
		"name": "Magnemite",
		"id": 81,
		"type": [
			"ELECTRIC",
			"STEEL"
		],
		"atk": 165,
		"def": 121,
		"hp": 93,
		"fastMoves": "Thunder Shock,Spark",
		"chargeMoves": "Discharge,Magnet Bomb,Thunderbolt,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Magneton",
		"id": 82,
		"type": [
			"ELECTRIC",
			"STEEL"
		],
		"atk": 223,
		"def": 169,
		"hp": 137,
		"fastMoves": "Thunder Shock,Spark,Charge Beam",
		"chargeMoves": "Discharge,Flash Cannon,Magnet Bomb,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Farfetch'd",
		"id": 83,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 124,
		"def": 115,
		"hp": 141,
		"fastMoves": "Fury Cutter,Air Slash",
		"chargeMoves": "Aerial Ace,Leaf Blade,Air Cutter",
		"legendary": false
	},{
		"name": "Galarian Farfetch'd",
		"id": 83,
		"type": [
			"FIGHTING"
		],
		"atk": 141,
		"def": 174,
		"hp": 114,
		"fastMoves": "Fury Cutter,Rock Smash",
		"chargeMoves": "Brick Break,Brave Bird,Leaf Blade",
		"legendary": false
	},{
		"name": "Doduo",
		"id": 84,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 158,
		"def": 83,
		"hp": 111,
		"fastMoves": "Peck,Quick Attack",
		"chargeMoves": "Drill Peck,Aerial Ace,Brave Bird",
		"legendary": false
	},{
		"name": "Dodrio",
		"id": 85,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 218,
		"def": 140,
		"hp": 155,
		"fastMoves": "Feint Attack,Steel Wing",
		"chargeMoves": "Drill Peck,Aerial Ace,Brave Bird",
		"legendary": false
	},{
		"name": "Seel",
		"id": 86,
		"type": [
			"WATER"
		],
		"atk": 85,
		"def": 121,
		"hp": 163,
		"fastMoves": "Lick,Ice Shard",
		"chargeMoves": "Aqua Tail,Icy Wind,Aurora Beam",
		"legendary": false
	},{
		"name": "Dewgong",
		"id": 87,
		"type": [
			"WATER",
			"ICE"
		],
		"atk": 139,
		"def": 177,
		"hp": 207,
		"fastMoves": "Frost Breath,Iron Tail",
		"chargeMoves": "Blizzard,Water Pulse,Aurora Beam",
		"legendary": false
	},{
		"name": "Alolan Grimer",
		"id": 88,
		"type": [
			"POISON",
			"DARK"
		],
		"atk": 135,
		"def": 90,
		"hp": 190,
		"fastMoves": "Bite,Poison Jab",
		"chargeMoves": "Sludge Bomb,Gunk Shot,Crunch",
		"legendary": false
	},{
		"name": "Grimer",
		"id": 88,
		"type": [
			"POISON"
		],
		"atk": 135,
		"def": 90,
		"hp": 190,
		"fastMoves": "Poison Jab,Mud-Slap",
		"chargeMoves": "Sludge,Sludge Bomb,Mud Bomb,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alolan Muk",
		"id": 89,
		"type": [
			"POISON",
			"DARK"
		],
		"atk": 190,
		"def": 172,
		"hp": 233,
		"fastMoves": "Bite,Poison Jab,Snarl",
		"chargeMoves": "Dark Pulse,Sludge Wave,Gunk Shot,Acid Spray",
		"legendary": false
	},{
		"name": "Muk",
		"id": 89,
		"type": [
			"POISON"
		],
		"atk": 190,
		"def": 172,
		"hp": 233,
		"fastMoves": "Poison Jab,Infestation",
		"chargeMoves": "Dark Pulse,Thunder Punch,Sludge Wave,Gunk Shot,Acid Spray,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Shellder",
		"id": 90,
		"type": [
			"WATER"
		],
		"atk": 116,
		"def": 134,
		"hp": 102,
		"fastMoves": "Ice Shard,Tackle",
		"chargeMoves": "Bubble Beam,Water Pulse,Icy Wind",
		"legendary": false
	},{
		"name": "Cloyster",
		"id": 91,
		"type": [
			"WATER",
			"ICE"
		],
		"atk": 186,
		"def": 256,
		"hp": 137,
		"fastMoves": "Ice Shard,Frost Breath",
		"chargeMoves": "Hydro Pump,Icy Wind,Aurora Beam,Avalanche",
		"legendary": false
	},{
		"name": "Gastly",
		"id": 92,
		"type": [
			"GHOST",
			"POISON"
		],
		"atk": 186,
		"def": 67,
		"hp": 102,
		"fastMoves": "Lick,Astonish",
		"chargeMoves": "Dark Pulse,Sludge Bomb,Night Shade",
		"legendary": false
	},{
		"name": "Haunter",
		"id": 93,
		"type": [
			"GHOST",
			"POISON"
		],
		"atk": 223,
		"def": 107,
		"hp": 128,
		"fastMoves": "Shadow Claw,Astonish",
		"chargeMoves": "Dark Pulse,Shadow Punch,Shadow Ball,Sludge Bomb",
		"legendary": false
	},{
		"name": "Gengar",
		"id": 94,
		"type": [
			"GHOST",
			"POISON"
		],
		"atk": 261,
		"def": 149,
		"hp": 155,
		"fastMoves": "Sucker Punch,Shadow Claw,Hex",
		"chargeMoves": "Shadow Ball,Sludge Bomb,Focus Blast",
		"legendary": false
	},{
		"name": "Onix",
		"id": 95,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 85,
		"def": 232,
		"hp": 111,
		"fastMoves": "Tackle,Rock Throw",
		"chargeMoves": "Stone Edge,Sand Tomb,Heavy Slam",
		"legendary": false
	},{
		"name": "Drowzee",
		"id": 96,
		"type": [
			"PSYCHIC"
		],
		"atk": 89,
		"def": 136,
		"hp": 155,
		"fastMoves": "Pound,Confusion",
		"chargeMoves": "Psybeam,Psyshock,Psychic,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Hypno",
		"id": 97,
		"type": [
			"PSYCHIC"
		],
		"atk": 144,
		"def": 193,
		"hp": 198,
		"fastMoves": "Zen Headbutt,Confusion",
		"chargeMoves": "Ice Punch,Shadow Ball,Thunder Punch,Psychic,Fire Punch,Focus Blast,Future Sight,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Krabby",
		"id": 98,
		"type": [
			"WATER"
		],
		"atk": 181,
		"def": 124,
		"hp": 102,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Vise Grip,Bubble Beam,Water Pulse",
		"legendary": false
	},{
		"name": "Kingler",
		"id": 99,
		"type": [
			"WATER"
		],
		"atk": 240,
		"def": 181,
		"hp": 146,
		"fastMoves": "Metal Claw,Bubble",
		"chargeMoves": "Vise Grip,X-Scissor,Water Pulse,Crabhammer",
		"legendary": false
	},{
		"name": "Voltorb",
		"id": 100,
		"type": [
			"ELECTRIC"
		],
		"atk": 109,
		"def": 111,
		"hp": 120,
		"fastMoves": "Spark,Tackle",
		"chargeMoves": "Discharge,Thunderbolt,Gyro Ball",
		"legendary": false
	},{
		"name": "Electrode",
		"id": 101,
		"type": [
			"ELECTRIC"
		],
		"atk": 173,
		"def": 173,
		"hp": 155,
		"fastMoves": "Spark,Volt Switch",
		"chargeMoves": "Hyper Beam,Discharge,Thunderbolt,Foul Play",
		"legendary": false
	},{
		"name": "Exeggcute",
		"id": 102,
		"type": [
			"GRASS",
			"PSYCHIC"
		],
		"atk": 107,
		"def": 125,
		"hp": 155,
		"fastMoves": "Confusion,Bullet Seed",
		"chargeMoves": "Seed Bomb,Ancient Power,Psychic",
		"legendary": false
	},{
		"name": "Alolan Exeggutor",
		"id": 103,
		"type": [
			"GRASS",
			"PSYCHIC"
		],
		"atk": 230,
		"def": 153,
		"hp": 216,
		"fastMoves": "Dragon Tail,Bullet Seed",
		"chargeMoves": "Seed Bomb,Dragon Pulse,Solar Beam",
		"legendary": false
	},{
		"name": "Exeggutor",
		"id": 103,
		"type": [
			"GRASS",
			"DRAGON"
		],
		"atk": 233,
		"def": 149,
		"hp": 216,
		"fastMoves": "Confusion,Bullet Seed,Extrasensory",
		"chargeMoves": "Seed Bomb,Psychic,Solar Beam",
		"legendary": false
	},{
		"name": "Cubone",
		"id": 104,
		"type": [
			"GROUND"
		],
		"atk": 90,
		"def": 144,
		"hp": 137,
		"fastMoves": "Mud-Slap,Rock Smash",
		"chargeMoves": "Dig,Bone Club,Bulldoze,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Alolan Marowak",
		"id": 105,
		"type": [
			"FIRE",
			"GHOST"
		],
		"atk": 144,
		"def": 186,
		"hp": 155,
		"fastMoves": "Rock Smash,Hex,Fire Spin",
		"chargeMoves": "Flame Wheel,Shadow Ball,Bone Club,Fire Blast",
		"legendary": false
	},{
		"name": "Marowak",
		"id": 105,
		"type": [
			"GROUND"
		],
		"atk": 144,
		"def": 186,
		"hp": 155,
		"fastMoves": "Mud-Slap,Rock Smash",
		"chargeMoves": "Dig,Earthquake,Bone Club,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Hitmonlee",
		"id": 106,
		"type": [
			"FIGHTING"
		],
		"atk": 224,
		"def": 181,
		"hp": 137,
		"fastMoves": "Low Kick,Rock Smash",
		"chargeMoves": "Stone Edge,Low Sweep,Close Combat,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Hitmonchan",
		"id": 107,
		"type": [
			"FIGHTING"
		],
		"atk": 193,
		"def": 197,
		"hp": 137,
		"fastMoves": "Bullet Punch,Counter",
		"chargeMoves": "Ice Punch,Thunder Punch,Fire Punch,Close Combat,Power-Up Punch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Lickitung",
		"id": 108,
		"type": [
			"NORMAL"
		],
		"atk": 108,
		"def": 137,
		"hp": 207,
		"fastMoves": "Lick,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Power Whip,Stomp,Body Slam (legacy)",
		"legendary": false
	},{
		"name": "Koffing",
		"id": 109,
		"type": [
			"POISON"
		],
		"atk": 119,
		"def": 141,
		"hp": 120,
		"fastMoves": "Tackle,Infestation",
		"chargeMoves": "Dark Pulse,Sludge,Sludge Bomb",
		"legendary": false
	},{
		"name": "Weezing",
		"id": 110,
		"type": [
			"POISON"
		],
		"atk": 174,
		"def": 197,
		"hp": 163,
		"fastMoves": "Tackle,Infestation",
		"chargeMoves": "Dark Pulse,Shadow Ball,Thunderbolt,Sludge Bomb",
		"legendary": false
	},{
		"name": "Galarian Weezing",
		"id": 110,
		"type": [
			"POISON",
			"FAIRY"
		],
		"atk": 174,
		"def": 197,
		"hp": 163,
		"fastMoves": "Tackle",
		"chargeMoves": "Hyper Beam,Sludge,Play Rough,Overheat",
		"legendary": false
	},{
		"name": "Rhyhorn",
		"id": 111,
		"type": [
			"GROUND",
			"ROCK"
		],
		"atk": 140,
		"def": 127,
		"hp": 190,
		"fastMoves": "Mud-Slap,Rock Smash",
		"chargeMoves": "Bulldoze,Horn Attack,Stomp",
		"legendary": false
	},{
		"name": "Rhydon",
		"id": 112,
		"type": [
			"GROUND",
			"ROCK"
		],
		"atk": 222,
		"def": 171,
		"hp": 233,
		"fastMoves": "Mud-Slap,Rock Smash",
		"chargeMoves": "Earthquake,Stone Edge,Surf",
		"legendary": false
	},{
		"name": "Chansey",
		"id": 113,
		"type": [
			"NORMAL"
		],
		"atk": 60,
		"def": 128,
		"hp": 487,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Dazzling Gleam,Psychic",
		"legendary": false
	},{
		"name": "Tangela",
		"id": 114,
		"type": [
			"GRASS"
		],
		"atk": 183,
		"def": 169,
		"hp": 163,
		"fastMoves": "Vine Whip,Infestation",
		"chargeMoves": "Sludge Bomb,Solar Beam,Grass Knot",
		"legendary": false
	},{
		"name": "Kangaskhan",
		"id": 115,
		"type": [
			"NORMAL"
		],
		"atk": 181,
		"def": 165,
		"hp": 233,
		"fastMoves": "Low Kick,Mud-Slap",
		"chargeMoves": "Earthquake,Outrage,Crunch,Power-Up Punch",
		"legendary": false
	},{
		"name": "Horsea",
		"id": 116,
		"type": [
			"WATER"
		],
		"atk": 129,
		"def": 103,
		"hp": 102,
		"fastMoves": "Water Gun,Bubble",
		"chargeMoves": "Flash Cannon,Bubble Beam,Dragon Pulse",
		"legendary": false
	},{
		"name": "Seadra",
		"id": 117,
		"type": [
			"WATER"
		],
		"atk": 187,
		"def": 156,
		"hp": 146,
		"fastMoves": "Dragon Breath,Water Gun",
		"chargeMoves": "Dragon Pulse,Hydro Pump,Aurora Beam",
		"legendary": false
	},{
		"name": "Goldeen",
		"id": 118,
		"type": [
			"WATER"
		],
		"atk": 123,
		"def": 110,
		"hp": 128,
		"fastMoves": "Peck,Mud Shot",
		"chargeMoves": "Aqua Tail,Water Pulse,Horn Attack",
		"legendary": false
	},{
		"name": "Seaking",
		"id": 119,
		"type": [
			"WATER"
		],
		"atk": 175,
		"def": 147,
		"hp": 190,
		"fastMoves": "Peck,Waterfall",
		"chargeMoves": "Megahorn,Ice Beam,Water Pulse",
		"legendary": false
	},{
		"name": "Staryu",
		"id": 120,
		"type": [
			"WATER"
		],
		"atk": 137,
		"def": 112,
		"hp": 102,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Bubble Beam,Power Gem,Swift",
		"legendary": false
	},{
		"name": "Starmie",
		"id": 121,
		"type": [
			"WATER",
			"PSYCHIC"
		],
		"atk": 210,
		"def": 184,
		"hp": 155,
		"fastMoves": "Water Gun,Hidden Power",
		"chargeMoves": "Ice Beam,Power Gem,Thunder,Hydro Pump,Psychic",
		"legendary": false
	},{
		"name": "Mr. Mime",
		"id": 122,
		"type": [
			"PSYCHIC",
			"FAIRY"
		],
		"atk": 192,
		"def": 205,
		"hp": 120,
		"fastMoves": "Zen Headbutt,Confusion",
		"chargeMoves": "Psybeam,Shadow Ball,Psychic",
		"legendary": false
	},{
		"name": "Scyther",
		"id": 123,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 218,
		"def": 170,
		"hp": 172,
		"fastMoves": "Fury Cutter,Air Slash",
		"chargeMoves": "Aerial Ace,Night Slash,X-Scissor,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Jynx",
		"id": 124,
		"type": [
			"ICE",
			"PSYCHIC"
		],
		"atk": 223,
		"def": 151,
		"hp": 163,
		"fastMoves": "Frost Breath,Confusion",
		"chargeMoves": "Psyshock,Draining Kiss,Focus Blast,Avalanche",
		"legendary": false
	},{
		"name": "Electabuzz",
		"id": 125,
		"type": [
			"ELECTRIC"
		],
		"atk": 198,
		"def": 158,
		"hp": 163,
		"fastMoves": "Thunder Shock,Low Kick",
		"chargeMoves": "Thunder Punch,Thunder,Thunderbolt,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Magmar",
		"id": 126,
		"type": [
			"FIRE"
		],
		"atk": 206,
		"def": 154,
		"hp": 163,
		"fastMoves": "Karate Chop,Ember",
		"chargeMoves": "Flamethrower,Fire Blast,Fire Punch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Pinsir",
		"id": 127,
		"type": [
			"BUG"
		],
		"atk": 238,
		"def": 182,
		"hp": 163,
		"fastMoves": "Fury Cutter,Bug Bite,Rock Smash",
		"chargeMoves": "Vise Grip,X-Scissor,Close Combat,Superpower",
		"legendary": false
	},{
		"name": "Tauros",
		"id": 128,
		"type": [
			"NORMAL"
		],
		"atk": 198,
		"def": 183,
		"hp": 181,
		"fastMoves": "Tackle,Zen Headbutt",
		"chargeMoves": "Earthquake,Iron Head,Horn Attack",
		"legendary": false
	},{
		"name": "Magikarp",
		"id": 129,
		"type": [
			"WATER"
		],
		"atk": 29,
		"def": 85,
		"hp": 85,
		"fastMoves": "Splash",
		"chargeMoves": "Struggle,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Gyarados",
		"id": 130,
		"type": [
			"WATER",
			"FLYING"
		],
		"atk": 237,
		"def": 186,
		"hp": 216,
		"fastMoves": "Bite,Dragon Breath,Waterfall",
		"chargeMoves": "Twister,Hydro Pump,Outrage,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Lapras",
		"id": 131,
		"type": [
			"WATER",
			"ICE"
		],
		"atk": 165,
		"def": 174,
		"hp": 277,
		"fastMoves": "Frost Breath,Water Gun",
		"chargeMoves": "Blizzard,Hydro Pump,Surf,Skull Bash,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Ditto",
		"id": 132,
		"type": [
			"NORMAL"
		],
		"atk": 91,
		"def": 91,
		"hp": 134,
		"fastMoves": "Transform",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Eevee",
		"id": 133,
		"type": [
			"NORMAL"
		],
		"atk": 104,
		"def": 114,
		"hp": 146,
		"fastMoves": "Quick Attack,Tackle",
		"chargeMoves": "Dig,Swift,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Vaporeon",
		"id": 134,
		"type": [
			"WATER"
		],
		"atk": 205,
		"def": 161,
		"hp": 277,
		"fastMoves": "Water Gun",
		"chargeMoves": "Aqua Tail,Water Pulse,Hydro Pump,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Jolteon",
		"id": 135,
		"type": [
			"ELECTRIC"
		],
		"atk": 232,
		"def": 182,
		"hp": 163,
		"fastMoves": "Thunder Shock,Volt Switch",
		"chargeMoves": "Discharge,Thunder,Thunderbolt,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Flareon",
		"id": 136,
		"type": [
			"FIRE"
		],
		"atk": 246,
		"def": 179,
		"hp": 163,
		"fastMoves": "Ember,Fire Spin",
		"chargeMoves": "Flamethrower,Fire Blast,Overheat,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Porygon",
		"id": 137,
		"type": [
			"NORMAL"
		],
		"atk": 153,
		"def": 136,
		"hp": 163,
		"fastMoves": "Charge Beam,Hidden Power",
		"chargeMoves": "Hyper Beam,Solar Beam,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Omanyte",
		"id": 138,
		"type": [
			"ROCK",
			"WATER"
		],
		"atk": 155,
		"def": 153,
		"hp": 111,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Bubble Beam,Ancient Power,Rock Blast",
		"legendary": false
	},{
		"name": "Omastar",
		"id": 139,
		"type": [
			"ROCK",
			"WATER"
		],
		"atk": 207,
		"def": 201,
		"hp": 172,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Ancient Power,Hydro Pump,Rock Blast",
		"legendary": false
	},{
		"name": "Kabuto",
		"id": 140,
		"type": [
			"ROCK",
			"WATER"
		],
		"atk": 148,
		"def": 140,
		"hp": 102,
		"fastMoves": "Mud Shot,Scratch",
		"chargeMoves": "Aqua Jet,Ancient Power,Rock Tomb",
		"legendary": false
	},{
		"name": "Kabutops",
		"id": 141,
		"type": [
			"ROCK",
			"WATER"
		],
		"atk": 220,
		"def": 186,
		"hp": 155,
		"fastMoves": "Mud Shot,Rock Smash,Waterfall",
		"chargeMoves": "Stone Edge,Ancient Power,Water Pulse",
		"legendary": false
	},{
		"name": "Aerodactyl",
		"id": 142,
		"type": [
			"ROCK",
			"FLYING"
		],
		"atk": 221,
		"def": 159,
		"hp": 190,
		"fastMoves": "Bite,Rock Throw,Steel Wing",
		"chargeMoves": "Hyper Beam,Ancient Power,Rock Slide,Iron Head,Earth Power",
		"legendary": false
	},{
		"name": "Snorlax",
		"id": 143,
		"type": [
			"NORMAL"
		],
		"atk": 190,
		"def": 169,
		"hp": 330,
		"fastMoves": "Lick,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Earthquake,Body Slam,Heavy Slam,Outrage,Skull Bash,Superpower,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Dratini",
		"id": 147,
		"type": [
			"DRAGON"
		],
		"atk": 119,
		"def": 91,
		"hp": 121,
		"fastMoves": "Dragon Breath,Iron Tail",
		"chargeMoves": "Wrap,Aqua Tail,Twister,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Dragonair",
		"id": 148,
		"type": [
			"DRAGON"
		],
		"atk": 163,
		"def": 135,
		"hp": 156,
		"fastMoves": "Dragon Breath,Iron Tail",
		"chargeMoves": "Wrap,Aqua Tail,Dragon Pulse,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Dragonite",
		"id": 149,
		"type": [
			"DRAGON",
			"FLYING"
		],
		"atk": 263,
		"def": 198,
		"hp": 209,
		"fastMoves": "Dragon Breath,Steel Wing,Dragon Tail",
		"chargeMoves": "Hyper Beam,Dragon Claw,Hurricane,Outrage,Draco Meteor (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Mew",
		"id": 151,
		"type": [
			"PSYCHIC"
		],
		"atk": 210,
		"def": 210,
		"hp": 225,
		"fastMoves": "Shadow Claw,Frost Breath,Pound,Cut,Poison Jab,Steel Wing,Rock Smash,Charge Beam,Volt Switch,Dragon Tail,Infestation,Struggle Bug,Snarl,Waterfall",
		"chargeMoves": "Hyper Beam,Dark Pulse,Stone Edge,Flash Cannon,Ice Beam,Blizzard,Low Sweep,Psyshock,Ancient Power,Rock Slide,Thunder,Thunderbolt,Dragon Claw,Dazzling Gleam,Bulldoze,Flame Charge,Psychic,Solar Beam,Focus Blast,Wild Charge,Gyro Ball,Overheat,Grass Knot,Energy Ball,Surf",
		"legendary": false
	},{
		"name": "Chikorita",
		"id": 152,
		"type": [
			"GRASS"
		],
		"atk": 92,
		"def": 122,
		"hp": 128,
		"fastMoves": "Vine Whip,Tackle",
		"chargeMoves": "Body Slam,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Bayleef",
		"id": 153,
		"type": [
			"GRASS"
		],
		"atk": 122,
		"def": 155,
		"hp": 155,
		"fastMoves": "Razor Leaf,Tackle",
		"chargeMoves": "Ancient Power,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Meganium",
		"id": 154,
		"type": [
			"GRASS"
		],
		"atk": 168,
		"def": 202,
		"hp": 190,
		"fastMoves": "Vine Whip,Razor Leaf",
		"chargeMoves": "Earthquake,Petal Blizzard,Solar Beam,Frenzy Plant (Community Day)",
		"legendary": false
	},{
		"name": "Cyndaquil",
		"id": 155,
		"type": [
			"FIRE"
		],
		"atk": 116,
		"def": 93,
		"hp": 118,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Flamethrower,Flame Charge,Swift",
		"legendary": false
	},{
		"name": "Quilava",
		"id": 156,
		"type": [
			"FIRE"
		],
		"atk": 158,
		"def": 126,
		"hp": 151,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Flamethrower,Dig,Flame Charge",
		"legendary": false
	},{
		"name": "Typhlosion",
		"id": 157,
		"type": [
			"FIRE"
		],
		"atk": 223,
		"def": 173,
		"hp": 186,
		"fastMoves": "Ember,Shadow Claw",
		"chargeMoves": "Fire Blast,Solar Beam,Overheat,Blast Burn (Community Day)",
		"legendary": false
	},{
		"name": "Totodile",
		"id": 158,
		"type": [
			"WATER"
		],
		"atk": 117,
		"def": 109,
		"hp": 137,
		"fastMoves": "Scratch,Water Gun",
		"chargeMoves": "Aqua Jet,Water Pulse,Crunch",
		"legendary": false
	},{
		"name": "Croconaw",
		"id": 159,
		"type": [
			"WATER"
		],
		"atk": 150,
		"def": 142,
		"hp": 163,
		"fastMoves": "Scratch,Water Gun",
		"chargeMoves": "Ice Punch,Water Pulse,Crunch",
		"legendary": false
	},{
		"name": "Feraligatr",
		"id": 160,
		"type": [
			"WATER"
		],
		"atk": 205,
		"def": 188,
		"hp": 198,
		"fastMoves": "Bite,Waterfall,Ice Fang",
		"chargeMoves": "Ice Beam,Hydro Pump,Crunch,Hydro Cannon (Community Day)",
		"legendary": false
	},{
		"name": "Sentret",
		"id": 161,
		"type": [
			"NORMAL"
		],
		"atk": 79,
		"def": 73,
		"hp": 111,
		"fastMoves": "Quick Attack,Scratch",
		"chargeMoves": "Dig,Brick Break,Grass Knot",
		"legendary": false
	},{
		"name": "Furret",
		"id": 162,
		"type": [
			"NORMAL"
		],
		"atk": 148,
		"def": 125,
		"hp": 198,
		"fastMoves": "Sucker Punch,Quick Attack",
		"chargeMoves": "Hyper Beam,Dig,Brick Break",
		"legendary": false
	},{
		"name": "Hoothoot",
		"id": 163,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 67,
		"def": 88,
		"hp": 155,
		"fastMoves": "Peck,Feint Attack",
		"chargeMoves": "Aerial Ace,Sky Attack,Night Shade",
		"legendary": false
	},{
		"name": "Noctowl",
		"id": 164,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 145,
		"def": 156,
		"hp": 225,
		"fastMoves": "Wing Attack,Extrasensory",
		"chargeMoves": "Psychic,Sky Attack,Night Shade",
		"legendary": false
	},{
		"name": "Ledyba",
		"id": 165,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 72,
		"def": 118,
		"hp": 120,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Aerial Ace,Swift,Silver Wind",
		"legendary": false
	},{
		"name": "Ledian",
		"id": 166,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 107,
		"def": 179,
		"hp": 146,
		"fastMoves": "Bug Bite,Struggle Bug",
		"chargeMoves": "Aerial Ace,Bug Buzz,Silver Wind",
		"legendary": false
	},{
		"name": "Spinarak",
		"id": 167,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 105,
		"def": 73,
		"hp": 120,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Night Slash,Cross Poison,Signal Beam",
		"legendary": false
	},{
		"name": "Ariados",
		"id": 168,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 161,
		"def": 124,
		"hp": 172,
		"fastMoves": "Poison Sting,Infestation",
		"chargeMoves": "Megahorn,Shadow Sneak,Cross Poison",
		"legendary": false
	},{
		"name": "Crobat",
		"id": 169,
		"type": [
			"POISON",
			"FLYING"
		],
		"atk": 194,
		"def": 178,
		"hp": 198,
		"fastMoves": "Bite,Air Slash",
		"chargeMoves": "Shadow Ball,Sludge Bomb,Air Cutter,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Chinchou",
		"id": 170,
		"type": [
			"WATER",
			"ELECTRIC"
		],
		"atk": 106,
		"def": 97,
		"hp": 181,
		"fastMoves": "Spark,Bubble",
		"chargeMoves": "Bubble Beam,Thunderbolt,Water Pulse",
		"legendary": false
	},{
		"name": "Lanturn",
		"id": 171,
		"type": [
			"WATER",
			"ELECTRIC"
		],
		"atk": 146,
		"def": 137,
		"hp": 268,
		"fastMoves": "Spark,Water Gun,Charge Beam",
		"chargeMoves": "Thunder,Thunderbolt,Hydro Pump",
		"legendary": false
	},{
		"name": "Pichu",
		"id": 172,
		"type": [
			"ELECTRIC"
		],
		"atk": 77,
		"def": 53,
		"hp": 85,
		"fastMoves": "Thunder Shock",
		"chargeMoves": "Thunder Punch,Thunderbolt,Disarming Voice",
		"legendary": false
	},{
		"name": "Cleffa",
		"id": 173,
		"type": [
			"FAIRY"
		],
		"atk": 75,
		"def": 79,
		"hp": 137,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Psyshock,Signal Beam,Grass Knot",
		"legendary": false
	},{
		"name": "Igglybuff",
		"id": 174,
		"type": [
			"NORMAL",
			"FAIRY"
		],
		"atk": 69,
		"def": 32,
		"hp": 207,
		"fastMoves": "Pound,Feint Attack",
		"chargeMoves": "Shadow Ball,Psychic,Wild Charge",
		"legendary": false
	},{
		"name": "Togepi",
		"id": 175,
		"type": [
			"FAIRY"
		],
		"atk": 67,
		"def": 116,
		"hp": 111,
		"fastMoves": "Peck,Hidden Power",
		"chargeMoves": "Psyshock,Ancient Power,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Togetic",
		"id": 176,
		"type": [
			"FAIRY",
			"FLYING"
		],
		"atk": 139,
		"def": 181,
		"hp": 146,
		"fastMoves": "Extrasensory,Hidden Power",
		"chargeMoves": "Aerial Ace,Ancient Power,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Natu",
		"id": 177,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 134,
		"def": 89,
		"hp": 120,
		"fastMoves": "Peck,Quick Attack",
		"chargeMoves": "Drill Peck,Psyshock,Night Shade",
		"legendary": false
	},{
		"name": "Xatu",
		"id": 178,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 192,
		"def": 146,
		"hp": 163,
		"fastMoves": "Feint Attack,Air Slash",
		"chargeMoves": "Aerial Ace,Ominous Wind,Future Sight",
		"legendary": false
	},{
		"name": "Mareep",
		"id": 179,
		"type": [
			"ELECTRIC"
		],
		"atk": 114,
		"def": 79,
		"hp": 146,
		"fastMoves": "Thunder Shock,Tackle",
		"chargeMoves": "Discharge,Thunderbolt,Body Slam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Flaaffy",
		"id": 180,
		"type": [
			"ELECTRIC"
		],
		"atk": 145,
		"def": 109,
		"hp": 172,
		"fastMoves": "Tackle,Charge Beam",
		"chargeMoves": "Discharge,Power Gem,Thunderbolt,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Ampharos",
		"id": 181,
		"type": [
			"ELECTRIC"
		],
		"atk": 211,
		"def": 169,
		"hp": 207,
		"fastMoves": "Charge Beam,Volt Switch",
		"chargeMoves": "Power Gem,Thunder Punch,Thunder,Dragon Pulse (Community Day),Focus Blast,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Bellossom",
		"id": 182,
		"type": [
			"GRASS"
		],
		"atk": 169,
		"def": 186,
		"hp": 181,
		"fastMoves": "Razor Leaf,Acid,Bullet Seed",
		"chargeMoves": "Petal Blizzard,Dazzling Gleam,Leaf Blade,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Marill",
		"id": 183,
		"type": [
			"WATER",
			"FAIRY"
		],
		"atk": 37,
		"def": 93,
		"hp": 172,
		"fastMoves": "Tackle,Bubble",
		"chargeMoves": "Bubble Beam,Aqua Tail,Body Slam",
		"legendary": false
	},{
		"name": "Azumarill",
		"id": 184,
		"type": [
			"WATER",
			"FAIRY"
		],
		"atk": 112,
		"def": 152,
		"hp": 225,
		"fastMoves": "Bubble,Rock Smash",
		"chargeMoves": "Ice Beam,Play Rough,Hydro Pump",
		"legendary": false
	},{
		"name": "Sudowoodo",
		"id": 185,
		"type": [
			"ROCK"
		],
		"atk": 167,
		"def": 176,
		"hp": 172,
		"fastMoves": "Rock Throw,Counter",
		"chargeMoves": "Earthquake,Stone Edge,Rock Slide",
		"legendary": false
	},{
		"name": "Politoed",
		"id": 186,
		"type": [
			"WATER"
		],
		"atk": 174,
		"def": 179,
		"hp": 207,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Blizzard,Hydro Pump,Surf,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Hoppip",
		"id": 187,
		"type": [
			"GRASS",
			"FLYING"
		],
		"atk": 67,
		"def": 94,
		"hp": 111,
		"fastMoves": "Tackle,Bullet Seed",
		"chargeMoves": "Seed Bomb,Dazzling Gleam,Grass Knot",
		"legendary": false
	},{
		"name": "Skiploom",
		"id": 188,
		"type": [
			"GRASS",
			"FLYING"
		],
		"atk": 91,
		"def": 120,
		"hp": 146,
		"fastMoves": "Tackle,Bullet Seed",
		"chargeMoves": "Dazzling Gleam,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Jumpluff",
		"id": 189,
		"type": [
			"GRASS",
			"FLYING"
		],
		"atk": 118,
		"def": 183,
		"hp": 181,
		"fastMoves": "Infestation,Bullet Seed",
		"chargeMoves": "Aerial Ace,Dazzling Gleam,Solar Beam,Energy Ball",
		"legendary": false
	},{
		"name": "Aipom",
		"id": 190,
		"type": [
			"NORMAL"
		],
		"atk": 136,
		"def": 112,
		"hp": 146,
		"fastMoves": "Scratch,Astonish",
		"chargeMoves": "Aerial Ace,Low Sweep,Swift",
		"legendary": false
	},{
		"name": "Sunkern",
		"id": 191,
		"type": [
			"GRASS"
		],
		"atk": 55,
		"def": 55,
		"hp": 102,
		"fastMoves": "Razor Leaf,Cut",
		"chargeMoves": "Seed Bomb,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Sunflora",
		"id": 192,
		"type": [
			"GRASS"
		],
		"atk": 185,
		"def": 135,
		"hp": 181,
		"fastMoves": "Razor Leaf,Bullet Seed",
		"chargeMoves": "Petal Blizzard,Sludge Bomb,Solar Beam",
		"legendary": false
	},{
		"name": "Yanma",
		"id": 193,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 154,
		"def": 94,
		"hp": 163,
		"fastMoves": "Wing Attack,Quick Attack",
		"chargeMoves": "Aerial Ace,Ancient Power,Silver Wind",
		"legendary": false
	},{
		"name": "Wooper",
		"id": 194,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 75,
		"def": 66,
		"hp": 146,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Dig,Mud Bomb,Body Slam",
		"legendary": false
	},{
		"name": "Quagsire",
		"id": 195,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 152,
		"def": 143,
		"hp": 216,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Earthquake,Stone Edge,Sludge Bomb,Acid Spray",
		"legendary": false
	},{
		"name": "Espeon",
		"id": 196,
		"type": [
			"PSYCHIC"
		],
		"atk": 261,
		"def": 175,
		"hp": 163,
		"fastMoves": "Zen Headbutt,Confusion",
		"chargeMoves": "Psybeam,Psychic,Future Sight,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Umbreon",
		"id": 197,
		"type": [
			"DARK"
		],
		"atk": 126,
		"def": 240,
		"hp": 216,
		"fastMoves": "Feint Attack,Snarl",
		"chargeMoves": "Dark Pulse,Foul Play,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Murkrow",
		"id": 198,
		"type": [
			"DARK",
			"FLYING"
		],
		"atk": 175,
		"def": 87,
		"hp": 155,
		"fastMoves": "Peck,Feint Attack",
		"chargeMoves": "Dark Pulse,Drill Peck,Foul Play",
		"legendary": false
	},{
		"name": "Slowking",
		"id": 199,
		"type": [
			"WATER",
			"PSYCHIC"
		],
		"atk": 177,
		"def": 180,
		"hp": 216,
		"fastMoves": "Water Gun,Confusion",
		"chargeMoves": "Blizzard,Fire Blast,Psychic",
		"legendary": false
	},{
		"name": "Misdreavus",
		"id": 200,
		"type": [
			"GHOST"
		],
		"atk": 167,
		"def": 154,
		"hp": 155,
		"fastMoves": "Astonish,Hex",
		"chargeMoves": "Dark Pulse,Shadow Sneak,Ominous Wind",
		"legendary": false
	},{
		"name": "Unown",
		"id": 201,
		"type": [
			"PSYCHIC"
		],
		"atk": 136,
		"def": 91,
		"hp": 134,
		"fastMoves": "Hidden Power",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Wobbuffet",
		"id": 202,
		"type": [
			"PSYCHIC"
		],
		"atk": 60,
		"def": 106,
		"hp": 382,
		"fastMoves": "Splash,Counter,Charm",
		"chargeMoves": "Mirror Coat,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Girafarig",
		"id": 203,
		"type": [
			"NORMAL",
			"PSYCHIC"
		],
		"atk": 182,
		"def": 133,
		"hp": 172,
		"fastMoves": "Tackle,Confusion",
		"chargeMoves": "Thunderbolt,Psychic,Mirror Coat",
		"legendary": false
	},{
		"name": "Pineco",
		"id": 204,
		"type": [
			"BUG"
		],
		"atk": 108,
		"def": 122,
		"hp": 137,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Rock Tomb,Sand Tomb,Gyro Ball",
		"legendary": false
	},{
		"name": "Forretress",
		"id": 205,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 161,
		"def": 205,
		"hp": 181,
		"fastMoves": "Bug Bite,Struggle Bug",
		"chargeMoves": "Earthquake,Rock Tomb,Sand Tomb,Heavy Slam,Mirror Shot",
		"legendary": false
	},{
		"name": "Dunsparce",
		"id": 206,
		"type": [
			"NORMAL"
		],
		"atk": 131,
		"def": 128,
		"hp": 225,
		"fastMoves": "Bite,Astonish",
		"chargeMoves": "Dig,Drill Run,Rock Slide",
		"legendary": false
	},{
		"name": "Gligar",
		"id": 207,
		"type": [
			"GROUND",
			"FLYING"
		],
		"atk": 143,
		"def": 184,
		"hp": 163,
		"fastMoves": "Fury Cutter,Wing Attack",
		"chargeMoves": "Dig,Aerial Ace,Night Slash",
		"legendary": false
	},{
		"name": "Steelix",
		"id": 208,
		"type": [
			"STEEL",
			"GROUND"
		],
		"atk": 148,
		"def": 272,
		"hp": 181,
		"fastMoves": "Dragon Tail,Iron Tail,Thunder Fang",
		"chargeMoves": "Earthquake,Heavy Slam,Crunch",
		"legendary": false
	},{
		"name": "Snubbull",
		"id": 209,
		"type": [
			"FAIRY"
		],
		"atk": 137,
		"def": 85,
		"hp": 155,
		"fastMoves": "Bite,Tackle",
		"chargeMoves": "Dazzling Gleam,Brick Break,Crunch",
		"legendary": false
	},{
		"name": "Granbull",
		"id": 210,
		"type": [
			"FAIRY"
		],
		"atk": 212,
		"def": 131,
		"hp": 207,
		"fastMoves": "Bite,Snarl,Charm",
		"chargeMoves": "Play Rough,Close Combat,Crunch",
		"legendary": false
	},{
		"name": "Qwilfish",
		"id": 211,
		"type": [
			"WATER",
			"POISON"
		],
		"atk": 184,
		"def": 138,
		"hp": 163,
		"fastMoves": "Water Gun,Poison Sting",
		"chargeMoves": "Ice Beam,Aqua Tail,Sludge Wave,Acid Spray,Fell Stinger",
		"legendary": false
	},{
		"name": "Scizor",
		"id": 212,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 236,
		"def": 181,
		"hp": 172,
		"fastMoves": "Fury Cutter,Bullet Punch",
		"chargeMoves": "Night Slash,Iron Head,X-Scissor,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Shuckle",
		"id": 213,
		"type": [
			"BUG",
			"ROCK"
		],
		"atk": 17,
		"def": 396,
		"hp": 85,
		"fastMoves": "Rock Throw,Struggle Bug",
		"chargeMoves": "Stone Edge,Rock Blast,Gyro Ball",
		"legendary": false
	},{
		"name": "Heracross",
		"id": 214,
		"type": [
			"BUG",
			"FIGHTING"
		],
		"atk": 234,
		"def": 179,
		"hp": 190,
		"fastMoves": "Counter,Struggle Bug",
		"chargeMoves": "Megahorn,Earthquake,Close Combat",
		"legendary": false
	},{
		"name": "Sneasel",
		"id": 215,
		"type": [
			"DARK",
			"ICE"
		],
		"atk": 189,
		"def": 146,
		"hp": 146,
		"fastMoves": "Ice Shard,Feint Attack",
		"chargeMoves": "Ice Punch,Avalanche,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Teddiursa",
		"id": 216,
		"type": [
			"NORMAL"
		],
		"atk": 142,
		"def": 93,
		"hp": 155,
		"fastMoves": "Lick,Scratch",
		"chargeMoves": "Cross Chop,Play Rough,Crunch",
		"legendary": false
	},{
		"name": "Ursaring",
		"id": 217,
		"type": [
			"NORMAL"
		],
		"atk": 236,
		"def": 144,
		"hp": 207,
		"fastMoves": "Shadow Claw,Metal Claw,Counter",
		"chargeMoves": "Hyper Beam,Play Rough,Close Combat",
		"legendary": false
	},{
		"name": "Slugma",
		"id": 218,
		"type": [
			"FIRE"
		],
		"atk": 118,
		"def": 71,
		"hp": 120,
		"fastMoves": "Ember,Rock Throw",
		"chargeMoves": "Rock Slide,Flame Charge,Flame Burst",
		"legendary": false
	},{
		"name": "Magcargo",
		"id": 219,
		"type": [
			"FIRE",
			"ROCK"
		],
		"atk": 139,
		"def": 191,
		"hp": 137,
		"fastMoves": "Ember,Rock Throw",
		"chargeMoves": "Stone Edge,Heat Wave,Overheat",
		"legendary": false
	},{
		"name": "Swinub",
		"id": 220,
		"type": [
			"ICE",
			"GROUND"
		],
		"atk": 90,
		"def": 69,
		"hp": 137,
		"fastMoves": "Tackle,Powder Snow",
		"chargeMoves": "Rock Slide,Icy Wind,Body Slam",
		"legendary": false
	},{
		"name": "Piloswine",
		"id": 221,
		"type": [
			"ICE",
			"GROUND"
		],
		"atk": 181,
		"def": 138,
		"hp": 225,
		"fastMoves": "Ice Shard,Powder Snow",
		"chargeMoves": "Stone Edge,Bulldoze,Avalanche",
		"legendary": false
	},{
		"name": "Corsola",
		"id": 222,
		"type": [
			"WATER",
			"ROCK"
		],
		"atk": 118,
		"def": 156,
		"hp": 146,
		"fastMoves": "Tackle,Bubble",
		"chargeMoves": "Bubble Beam,Power Gem,Rock Blast",
		"legendary": false
	},{
		"name": "Remoraid",
		"id": 223,
		"type": [
			"WATER"
		],
		"atk": 127,
		"def": 69,
		"hp": 111,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Water Pulse,Aurora Beam,Rock Blast",
		"legendary": false
	},{
		"name": "Octillery",
		"id": 224,
		"type": [
			"WATER"
		],
		"atk": 197,
		"def": 141,
		"hp": 181,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Gunk Shot,Water Pulse,Aurora Beam,Acid Spray,Octazooka",
		"legendary": false
	},{
		"name": "Delibird",
		"id": 225,
		"type": [
			"ICE",
			"FLYING"
		],
		"atk": 128,
		"def": 90,
		"hp": 128,
		"fastMoves": "Present",
		"chargeMoves": "Ice Punch,Aerial Ace,Icy Wind,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Mantine",
		"id": 226,
		"type": [
			"WATER",
			"FLYING"
		],
		"atk": 148,
		"def": 226,
		"hp": 163,
		"fastMoves": "Wing Attack,Bubble,Bullet Seed",
		"chargeMoves": "Ice Beam,Aerial Ace,Bubble Beam,Water Pulse",
		"legendary": false
	},{
		"name": "Skarmory",
		"id": 227,
		"type": [
			"STEEL",
			"FLYING"
		],
		"atk": 148,
		"def": 226,
		"hp": 163,
		"fastMoves": "Steel Wing,Air Slash",
		"chargeMoves": "Flash Cannon,Brave Bird,Sky Attack",
		"legendary": false
	},{
		"name": "Houndour",
		"id": 228,
		"type": [
			"DARK",
			"FIRE"
		],
		"atk": 152,
		"def": 83,
		"hp": 128,
		"fastMoves": "Ember,Feint Attack",
		"chargeMoves": "Dark Pulse,Flamethrower,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Houndoom",
		"id": 229,
		"type": [
			"DARK",
			"FIRE"
		],
		"atk": 224,
		"def": 144,
		"hp": 181,
		"fastMoves": "Fire Fang,Snarl",
		"chargeMoves": "Flamethrower,Fire Blast,Crunch,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Kingdra",
		"id": 230,
		"type": [
			"WATER",
			"DRAGON"
		],
		"atk": 194,
		"def": 194,
		"hp": 181,
		"fastMoves": "Dragon Breath,Waterfall",
		"chargeMoves": "Blizzard,Hydro Pump,Outrage,Octazooka",
		"legendary": false
	},{
		"name": "Phanpy",
		"id": 231,
		"type": [
			"GROUND"
		],
		"atk": 107,
		"def": 98,
		"hp": 207,
		"fastMoves": "Tackle,Rock Smash",
		"chargeMoves": "Rock Slide,Bulldoze,Body Slam",
		"legendary": false
	},{
		"name": "Donphan",
		"id": 232,
		"type": [
			"GROUND"
		],
		"atk": 214,
		"def": 185,
		"hp": 207,
		"fastMoves": "Tackle,Mud-Slap,Counter,Charm",
		"chargeMoves": "Earthquake,Play Rough,Heavy Slam",
		"legendary": false
	},{
		"name": "Porygon2",
		"id": 233,
		"type": [
			"NORMAL"
		],
		"atk": 198,
		"def": 180,
		"hp": 198,
		"fastMoves": "Charge Beam,Hidden Power,Lock-On",
		"chargeMoves": "Hyper Beam,Solar Beam,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Stantler",
		"id": 234,
		"type": [
			"NORMAL"
		],
		"atk": 192,
		"def": 131,
		"hp": 177,
		"fastMoves": "Tackle,Zen Headbutt",
		"chargeMoves": "Megahorn,Stomp,Wild Charge,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Smeargle",
		"id": 235,
		"type": [
			"NORMAL"
		],
		"atk": 40,
		"def": 83,
		"hp": 146,
		"fastMoves": "N/A",
		"chargeMoves": "N/A",
		"legendary": false
	},{
		"name": "Tyrogue",
		"id": 236,
		"type": [
			"FIGHTING"
		],
		"atk": 64,
		"def": 64,
		"hp": 111,
		"fastMoves": "Tackle,Rock Smash",
		"chargeMoves": "Low Sweep,Rock Slide,Brick Break",
		"legendary": false
	},{
		"name": "Hitmontop",
		"id": 237,
		"type": [
			"FIGHTING"
		],
		"atk": 173,
		"def": 207,
		"hp": 137,
		"fastMoves": "Rock Smash,Counter",
		"chargeMoves": "Stone Edge,Close Combat,Gyro Ball",
		"legendary": false
	},{
		"name": "Smoochum",
		"id": 238,
		"type": [
			"ICE",
			"PSYCHIC"
		],
		"atk": 153,
		"def": 91,
		"hp": 128,
		"fastMoves": "Pound,Powder Snow",
		"chargeMoves": "Ice Punch,Ice Beam,Psyshock",
		"legendary": false
	},{
		"name": "Elekid",
		"id": 239,
		"type": [
			"ELECTRIC"
		],
		"atk": 135,
		"def": 101,
		"hp": 128,
		"fastMoves": "Thunder Shock,Low Kick",
		"chargeMoves": "Discharge,Thunder Punch,Brick Break",
		"legendary": false
	},{
		"name": "Magby",
		"id": 240,
		"type": [
			"FIRE"
		],
		"atk": 151,
		"def": 99,
		"hp": 128,
		"fastMoves": "Karate Chop,Ember",
		"chargeMoves": "Flame Burst,Fire Punch,Brick Break",
		"legendary": false
	},{
		"name": "Miltank",
		"id": 241,
		"type": [
			"NORMAL"
		],
		"atk": 157,
		"def": 193,
		"hp": 216,
		"fastMoves": "Tackle,Zen Headbutt",
		"chargeMoves": "Ice Beam,Thunderbolt,Stomp,Body Slam,Gyro Ball",
		"legendary": false
	},{
		"name": "Blissey",
		"id": 242,
		"type": [
			"NORMAL"
		],
		"atk": 129,
		"def": 169,
		"hp": 496,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Dazzling Gleam,Psychic",
		"legendary": false
	},{
		"name": "Larvitar",
		"id": 246,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 115,
		"def": 93,
		"hp": 137,
		"fastMoves": "Bite,Rock Smash",
		"chargeMoves": "Ancient Power,Stomp,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Pupitar",
		"id": 247,
		"type": [
			"ROCK",
			"GROUND"
		],
		"atk": 155,
		"def": 133,
		"hp": 172,
		"fastMoves": "Bite,Rock Smash",
		"chargeMoves": "Dig,Ancient Power,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Tyranitar",
		"id": 248,
		"type": [
			"ROCK",
			"DARK"
		],
		"atk": 251,
		"def": 207,
		"hp": 225,
		"fastMoves": "Bite,Iron Tail,Smack Down (Community Day)",
		"chargeMoves": "Stone Edge,Fire Blast,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Celebi",
		"id": 251,
		"type": [
			"PSYCHIC",
			"GRASS"
		],
		"atk": 210,
		"def": 210,
		"hp": 225,
		"fastMoves": "Confusion,Charge Beam",
		"chargeMoves": "Hyper Beam,Seed Bomb,Dazzling Gleam,Psychic",
		"legendary": false
	},{
		"name": "Treecko",
		"id": 252,
		"type": [
			"GRASS"
		],
		"atk": 124,
		"def": 94,
		"hp": 120,
		"fastMoves": "Pound,Bullet Seed",
		"chargeMoves": "Aerial Ace,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Grovyle",
		"id": 253,
		"type": [
			"GRASS"
		],
		"atk": 172,
		"def": 120,
		"hp": 137,
		"fastMoves": "Quick Attack,Bullet Seed",
		"chargeMoves": "Aerial Ace,Leaf Blade,Grass Knot",
		"legendary": false
	},{
		"name": "Sceptile",
		"id": 254,
		"type": [
			"GRASS"
		],
		"atk": 223,
		"def": 169,
		"hp": 172,
		"fastMoves": "Fury Cutter,Bullet Seed",
		"chargeMoves": "Earthquake,Aerial Ace,Dragon Claw,Leaf Blade,Frenzy Plant (Community Day)",
		"legendary": false
	},{
		"name": "Torchic",
		"id": 255,
		"type": [
			"FIRE"
		],
		"atk": 130,
		"def": 87,
		"hp": 128,
		"fastMoves": "Ember,Scratch",
		"chargeMoves": "Flamethrower,Rock Tomb,Flame Charge",
		"legendary": false
	},{
		"name": "Combusken",
		"id": 256,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 163,
		"def": 115,
		"hp": 155,
		"fastMoves": "Ember,Peck",
		"chargeMoves": "Flamethrower,Rock Slide,Flame Charge",
		"legendary": false
	},{
		"name": "Blaziken",
		"id": 257,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 240,
		"def": 141,
		"hp": 190,
		"fastMoves": "Counter,Fire Spin",
		"chargeMoves": "Focus Blast,Brave Bird,Overheat,Blast Burn (Community Day),Blaze Kick",
		"legendary": false
	},{
		"name": "Mudkip",
		"id": 258,
		"type": [
			"WATER"
		],
		"atk": 126,
		"def": 93,
		"hp": 137,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Sludge,Dig,Stomp,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Marshtomp",
		"id": 259,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 156,
		"def": 133,
		"hp": 172,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Sludge,Mud Bomb,Surf,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Swampert",
		"id": 260,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 208,
		"def": 175,
		"hp": 225,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Earthquake,Sludge Wave,Surf,Hydro Cannon (Community Day),Muddy Water,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Poochyena",
		"id": 261,
		"type": [
			"DARK"
		],
		"atk": 96,
		"def": 61,
		"hp": 111,
		"fastMoves": "Tackle,Snarl",
		"chargeMoves": "Dig,Poison Fang,Crunch",
		"legendary": false
	},{
		"name": "Mightyena",
		"id": 262,
		"type": [
			"DARK"
		],
		"atk": 171,
		"def": 132,
		"hp": 172,
		"fastMoves": "Bite,Fire Fang,Thunder Fang,Ice Fang",
		"chargeMoves": "Poison Fang,Play Rough,Crunch",
		"legendary": false
	},{
		"name": "Zigzagoon",
		"id": 263,
		"type": [
			"NORMAL"
		],
		"atk": 58,
		"def": 80,
		"hp": 116,
		"fastMoves": "Tackle,Rock Smash",
		"chargeMoves": "Dig,Thunderbolt,Grass Knot",
		"legendary": false
	},{
		"name": "Galarian Zigzagoon",
		"id": 263,
		"type": [
			"DARK",
			"NORMAL"
		],
		"atk": 116,
		"def": 58,
		"hp": 80,
		"fastMoves": "Tackle,Take Down",
		"chargeMoves": "Dig,Body Slam,Swift",
		"legendary": false
	},{
		"name": "Linoone",
		"id": 264,
		"type": [
			"NORMAL"
		],
		"atk": 142,
		"def": 128,
		"hp": 186,
		"fastMoves": "Shadow Claw,Tackle",
		"chargeMoves": "Dig,Thunder,Grass Knot",
		"legendary": false
	},{
		"name": "Galarian Linoone",
		"id": 264,
		"type": [
			"DARK",
			"NORMAL"
		],
		"atk": 186,
		"def": 142,
		"hp": 128,
		"fastMoves": "Snarl,Lick",
		"chargeMoves": "Dig,Body Slam,Gunk Shot",
		"legendary": false
	},{
		"name": "Wurmple",
		"id": 265,
		"type": [
			"BUG"
		],
		"atk": 75,
		"def": 59,
		"hp": 128,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Silcoon",
		"id": 266,
		"type": [
			"BUG"
		],
		"atk": 60,
		"def": 77,
		"hp": 137,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Beautifly",
		"id": 267,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 189,
		"def": 98,
		"hp": 155,
		"fastMoves": "Infestation,Struggle Bug",
		"chargeMoves": "Bug Buzz,Air Cutter,Silver Wind",
		"legendary": false
	},{
		"name": "Cascoon",
		"id": 268,
		"type": [
			"BUG"
		],
		"atk": 60,
		"def": 77,
		"hp": 137,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Dustox",
		"id": 269,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 98,
		"def": 162,
		"hp": 155,
		"fastMoves": "Confusion,Struggle Bug",
		"chargeMoves": "Bug Buzz,Sludge Bomb,Silver Wind",
		"legendary": false
	},{
		"name": "Lotad",
		"id": 270,
		"type": [
			"WATER",
			"GRASS"
		],
		"atk": 71,
		"def": 77,
		"hp": 120,
		"fastMoves": "Razor Leaf,Water Gun",
		"chargeMoves": "Bubble Beam,Energy Ball",
		"legendary": false
	},{
		"name": "Lombre",
		"id": 271,
		"type": [
			"WATER",
			"GRASS"
		],
		"atk": 112,
		"def": 119,
		"hp": 155,
		"fastMoves": "Razor Leaf,Bubble",
		"chargeMoves": "Ice Beam,Bubble Beam,Grass Knot",
		"legendary": false
	},{
		"name": "Ludicolo",
		"id": 272,
		"type": [
			"WATER",
			"GRASS"
		],
		"atk": 173,
		"def": 176,
		"hp": 190,
		"fastMoves": "Razor Leaf,Bubble",
		"chargeMoves": "Ice Beam,Blizzard,Hydro Pump,Solar Beam,Energy Ball",
		"legendary": false
	},{
		"name": "Seedot",
		"id": 273,
		"type": [
			"GRASS"
		],
		"atk": 71,
		"def": 77,
		"hp": 120,
		"fastMoves": "Quick Attack,Bullet Seed",
		"chargeMoves": "Grass Knot,Energy Ball,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Nuzleaf",
		"id": 274,
		"type": [
			"GRASS",
			"DARK"
		],
		"atk": 134,
		"def": 78,
		"hp": 172,
		"fastMoves": "Razor Leaf,Feint Attack",
		"chargeMoves": "Leaf Blade,Grass Knot,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Shiftry",
		"id": 275,
		"type": [
			"GRASS",
			"DARK"
		],
		"atk": 200,
		"def": 121,
		"hp": 207,
		"fastMoves": "Razor Leaf,Feint Attack,Snarl,Bullet Seed (Community Day)",
		"chargeMoves": "Leaf Blade,Hurricane,Foul Play,Leaf Tornado,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Taillow",
		"id": 276,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 106,
		"def": 61,
		"hp": 120,
		"fastMoves": "Peck,Quick Attack",
		"chargeMoves": "Aerial Ace",
		"legendary": false
	},{
		"name": "Swellow",
		"id": 277,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 185,
		"def": 124,
		"hp": 155,
		"fastMoves": "Wing Attack,Steel Wing",
		"chargeMoves": "Aerial Ace,Brave Bird,Sky Attack",
		"legendary": false
	},{
		"name": "Wingull",
		"id": 278,
		"type": [
			"WATER",
			"FLYING"
		],
		"atk": 106,
		"def": 61,
		"hp": 120,
		"fastMoves": "Quick Attack,Water Gun",
		"chargeMoves": "Ice Beam,Water Pulse,Air Cutter",
		"legendary": false
	},{
		"name": "Pelipper",
		"id": 279,
		"type": [
			"WATER",
			"FLYING"
		],
		"atk": 175,
		"def": 174,
		"hp": 155,
		"fastMoves": "Wing Attack,Water Gun",
		"chargeMoves": "Blizzard,Hydro Pump,Hurricane",
		"legendary": false
	},{
		"name": "Ralts",
		"id": 280,
		"type": [
			"PSYCHIC",
			"FAIRY"
		],
		"atk": 79,
		"def": 59,
		"hp": 99,
		"fastMoves": "Confusion,Charge Beam",
		"chargeMoves": "Psyshock,Shadow Sneak,Disarming Voice,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Kirlia",
		"id": 281,
		"type": [
			"PSYCHIC",
			"FAIRY"
		],
		"atk": 117,
		"def": 90,
		"hp": 116,
		"fastMoves": "Confusion,Charge Beam",
		"chargeMoves": "Shadow Sneak,Disarming Voice,Psychic,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Gardevoir",
		"id": 282,
		"type": [
			"PSYCHIC",
			"FAIRY"
		],
		"atk": 237,
		"def": 195,
		"hp": 169,
		"fastMoves": "Confusion,Charge Beam,Charm",
		"chargeMoves": "Shadow Ball,Dazzling Gleam,Psychic,Frustration (Shadow),Return (Shadow),Synchronoise (Community Day)",
		"legendary": false
	},{
		"name": "Surskit",
		"id": 283,
		"type": [
			"BUG",
			"WATER"
		],
		"atk": 93,
		"def": 87,
		"hp": 120,
		"fastMoves": "Bug Bite,Bubble",
		"chargeMoves": "Bubble Beam,Aqua Jet,Signal Beam",
		"legendary": false
	},{
		"name": "Masquerain",
		"id": 284,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 192,
		"def": 150,
		"hp": 172,
		"fastMoves": "Air Slash,Infestation",
		"chargeMoves": "Bubble Beam,Ominous Wind,Air Cutter,Silver Wind",
		"legendary": false
	},{
		"name": "Shroomish",
		"id": 285,
		"type": [
			"GRASS"
		],
		"atk": 74,
		"def": 110,
		"hp": 155,
		"fastMoves": "Tackle,Bullet Seed",
		"chargeMoves": "Seed Bomb,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Breloom",
		"id": 286,
		"type": [
			"GRASS",
			"FIGHTING"
		],
		"atk": 241,
		"def": 144,
		"hp": 155,
		"fastMoves": "Counter,Bullet Seed",
		"chargeMoves": "Seed Bomb,Sludge Bomb,Dynamic Punch",
		"legendary": false
	},{
		"name": "Slakoth",
		"id": 287,
		"type": [
			"NORMAL"
		],
		"atk": 104,
		"def": 92,
		"hp": 155,
		"fastMoves": "Yawn",
		"chargeMoves": "Night Slash,Brick Break,Body Slam",
		"legendary": false
	},{
		"name": "Vigoroth",
		"id": 288,
		"type": [
			"NORMAL"
		],
		"atk": 159,
		"def": 145,
		"hp": 190,
		"fastMoves": "Scratch,Counter",
		"chargeMoves": "Bulldoze,Brick Break,Body Slam",
		"legendary": false
	},{
		"name": "Slaking",
		"id": 289,
		"type": [
			"NORMAL"
		],
		"atk": 290,
		"def": 166,
		"hp": 284,
		"fastMoves": "Yawn",
		"chargeMoves": "Hyper Beam,Earthquake,Play Rough,Body Slam (Community Day)",
		"legendary": false
	},{
		"name": "Nincada",
		"id": 290,
		"type": [
			"BUG",
			"GROUND"
		],
		"atk": 80,
		"def": 126,
		"hp": 104,
		"fastMoves": "Bug Bite,Scratch",
		"chargeMoves": "Aerial Ace,Bug Buzz,Night Slash",
		"legendary": false
	},{
		"name": "Ninjask",
		"id": 291,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 199,
		"def": 112,
		"hp": 156,
		"fastMoves": "Fury Cutter,Metal Claw",
		"chargeMoves": "Aerial Ace,Bug Buzz,Shadow Ball",
		"legendary": false
	},{
		"name": "Shedinja",
		"id": 292,
		"type": [
			"BUG",
			"GHOST"
		],
		"atk": 153,
		"def": 73,
		"hp": 1,
		"fastMoves": "Bug Bite,Shadow Claw",
		"chargeMoves": "Dig,Aerial Ace,Shadow Sneak",
		"legendary": false
	},{
		"name": "Whismur",
		"id": 293,
		"type": [
			"NORMAL"
		],
		"atk": 92,
		"def": 42,
		"hp": 162,
		"fastMoves": "Pound,Astonish",
		"chargeMoves": "Flamethrower,Disarming Voice,Stomp",
		"legendary": false
	},{
		"name": "Loudred",
		"id": 294,
		"type": [
			"NORMAL"
		],
		"atk": 134,
		"def": 81,
		"hp": 197,
		"fastMoves": "Bite,Rock Smash",
		"chargeMoves": "Flamethrower,Disarming Voice,Stomp",
		"legendary": false
	},{
		"name": "Exploud",
		"id": 295,
		"type": [
			"NORMAL"
		],
		"atk": 179,
		"def": 137,
		"hp": 232,
		"fastMoves": "Bite,Astonish",
		"chargeMoves": "Disarming Voice,Fire Blast,Crunch",
		"legendary": false
	},{
		"name": "Makuhita",
		"id": 296,
		"type": [
			"FIGHTING"
		],
		"atk": 99,
		"def": 54,
		"hp": 176,
		"fastMoves": "Tackle,Rock Smash",
		"chargeMoves": "Cross Chop,Low Sweep,Heavy Slam",
		"legendary": false
	},{
		"name": "Hariyama",
		"id": 297,
		"type": [
			"FIGHTING"
		],
		"atk": 209,
		"def": 114,
		"hp": 302,
		"fastMoves": "Bullet Punch,Counter",
		"chargeMoves": "Close Combat,Dynamic Punch,Heavy Slam,Superpower",
		"legendary": false
	},{
		"name": "Azurill",
		"id": 298,
		"type": [
			"NORMAL",
			"FAIRY"
		],
		"atk": 36,
		"def": 71,
		"hp": 137,
		"fastMoves": "Splash,Bubble",
		"chargeMoves": "Ice Beam,Bubble Beam,Body Slam",
		"legendary": false
	},{
		"name": "Nosepass",
		"id": 299,
		"type": [
			"ROCK"
		],
		"atk": 82,
		"def": 215,
		"hp": 102,
		"fastMoves": "Spark,Rock Throw",
		"chargeMoves": "Rock Slide,Thunderbolt,Rock Blast",
		"legendary": false
	},{
		"name": "Skitty",
		"id": 300,
		"type": [
			"NORMAL"
		],
		"atk": 84,
		"def": 79,
		"hp": 137,
		"fastMoves": "Tackle,Feint Attack",
		"chargeMoves": "Dig,Disarming Voice,Wild Charge",
		"legendary": false
	},{
		"name": "Delcatty",
		"id": 301,
		"type": [
			"NORMAL"
		],
		"atk": 132,
		"def": 127,
		"hp": 172,
		"fastMoves": "Zen Headbutt,Feint Attack,Charm",
		"chargeMoves": "Disarming Voice,Play Rough,Wild Charge",
		"legendary": false
	},{
		"name": "Sableye",
		"id": 302,
		"type": [
			"DARK",
			"GHOST"
		],
		"atk": 141,
		"def": 136,
		"hp": 137,
		"fastMoves": "Shadow Claw,Feint Attack",
		"chargeMoves": "Power Gem,Shadow Sneak,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Mawile",
		"id": 303,
		"type": [
			"STEEL",
			"FAIRY"
		],
		"atk": 155,
		"def": 141,
		"hp": 137,
		"fastMoves": "Bite,Fire Fang,Astonish,Ice Fang",
		"chargeMoves": "Vise Grip,Iron Head,Play Rough,Power-Up Punch",
		"legendary": false
	},{
		"name": "Aron",
		"id": 304,
		"type": [
			"STEEL",
			"ROCK"
		],
		"atk": 121,
		"def": 141,
		"hp": 137,
		"fastMoves": "Tackle,Metal Claw",
		"chargeMoves": "Rock Tomb,Iron Head,Body Slam",
		"legendary": false
	},{
		"name": "Lairon",
		"id": 305,
		"type": [
			"STEEL",
			"ROCK"
		],
		"atk": 158,
		"def": 198,
		"hp": 155,
		"fastMoves": "Metal Claw,Iron Tail",
		"chargeMoves": "Rock Slide,Body Slam,Heavy Slam",
		"legendary": false
	},{
		"name": "Aggron",
		"id": 306,
		"type": [
			"STEEL",
			"ROCK"
		],
		"atk": 198,
		"def": 257,
		"hp": 172,
		"fastMoves": "Dragon Tail,Iron Tail,Smack Down",
		"chargeMoves": "Stone Edge,Thunder,Heavy Slam",
		"legendary": false
	},{
		"name": "Meditite",
		"id": 307,
		"type": [
			"FIGHTING",
			"PSYCHIC"
		],
		"atk": 78,
		"def": 107,
		"hp": 102,
		"fastMoves": "Confusion,Rock Smash",
		"chargeMoves": "Ice Punch,Low Sweep,Psyshock",
		"legendary": false
	},{
		"name": "Medicham",
		"id": 308,
		"type": [
			"FIGHTING",
			"PSYCHIC"
		],
		"atk": 121,
		"def": 152,
		"hp": 155,
		"fastMoves": "Psycho Cut,Counter",
		"chargeMoves": "Ice Punch,Psychic,Dynamic Punch,Power-Up Punch",
		"legendary": false
	},{
		"name": "Electrike",
		"id": 309,
		"type": [
			"ELECTRIC"
		],
		"atk": 123,
		"def": 78,
		"hp": 120,
		"fastMoves": "Spark,Quick Attack",
		"chargeMoves": "Discharge,Thunderbolt,Swift",
		"legendary": false
	},{
		"name": "Manectric",
		"id": 310,
		"type": [
			"ELECTRIC"
		],
		"atk": 215,
		"def": 127,
		"hp": 172,
		"fastMoves": "Charge Beam,Snarl",
		"chargeMoves": "Thunder,Flame Burst,Wild Charge",
		"legendary": false
	},{
		"name": "Plusle",
		"id": 311,
		"type": [
			"ELECTRIC"
		],
		"atk": 167,
		"def": 129,
		"hp": 155,
		"fastMoves": "Spark,Quick Attack",
		"chargeMoves": "Discharge,Thunderbolt,Swift,Grass Knot",
		"legendary": false
	},{
		"name": "Minun",
		"id": 312,
		"type": [
			"ELECTRIC"
		],
		"atk": 147,
		"def": 150,
		"hp": 155,
		"fastMoves": "Spark,Quick Attack",
		"chargeMoves": "Discharge,Thunderbolt,Swift,Grass Knot",
		"legendary": false
	},{
		"name": "Volbeat",
		"id": 313,
		"type": [
			"BUG"
		],
		"atk": 143,
		"def": 166,
		"hp": 163,
		"fastMoves": "Tackle,Struggle Bug",
		"chargeMoves": "Bug Buzz,Thunderbolt,Signal Beam",
		"legendary": false
	},{
		"name": "Illumise",
		"id": 314,
		"type": [
			"BUG"
		],
		"atk": 143,
		"def": 166,
		"hp": 163,
		"fastMoves": "Tackle,Struggle Bug",
		"chargeMoves": "Bug Buzz,Dazzling Gleam,Silver Wind",
		"legendary": false
	},{
		"name": "Roselia",
		"id": 315,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 186,
		"def": 131,
		"hp": 137,
		"fastMoves": "Razor Leaf,Poison Jab",
		"chargeMoves": "Petal Blizzard,Dazzling Gleam,Sludge Bomb",
		"legendary": false
	},{
		"name": "Gulpin",
		"id": 316,
		"type": [
			"POISON"
		],
		"atk": 80,
		"def": 99,
		"hp": 172,
		"fastMoves": "Pound,Rock Smash",
		"chargeMoves": "Sludge,Ice Beam,Gunk Shot",
		"legendary": false
	},{
		"name": "Swalot",
		"id": 317,
		"type": [
			"POISON"
		],
		"atk": 140,
		"def": 159,
		"hp": 225,
		"fastMoves": "Rock Smash,Infestation",
		"chargeMoves": "Ice Beam,Sludge Bomb,Gunk Shot,Acid Spray",
		"legendary": false
	},{
		"name": "Carvanha",
		"id": 318,
		"type": [
			"WATER",
			"DARK"
		],
		"atk": 171,
		"def": 39,
		"hp": 128,
		"fastMoves": "Bite,Snarl",
		"chargeMoves": "Poison Fang,Aqua Jet,Crunch",
		"legendary": false
	},{
		"name": "Sharpedo",
		"id": 319,
		"type": [
			"WATER",
			"DARK"
		],
		"atk": 243,
		"def": 83,
		"hp": 172,
		"fastMoves": "Bite,Waterfall",
		"chargeMoves": "Poison Fang,Hydro Pump,Crunch",
		"legendary": false
	},{
		"name": "Wailmer",
		"id": 320,
		"type": [
			"WATER"
		],
		"atk": 136,
		"def": 68,
		"hp": 277,
		"fastMoves": "Water Gun,Splash",
		"chargeMoves": "Water Pulse,Body Slam,Heavy Slam",
		"legendary": false
	},{
		"name": "Wailord",
		"id": 321,
		"type": [
			"WATER"
		],
		"atk": 175,
		"def": 87,
		"hp": 347,
		"fastMoves": "Water Gun,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Blizzard,Surf",
		"legendary": false
	},{
		"name": "Numel",
		"id": 322,
		"type": [
			"FIRE",
			"GROUND"
		],
		"atk": 119,
		"def": 79,
		"hp": 155,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Heat Wave,Bulldoze,Stomp",
		"legendary": false
	},{
		"name": "Camerupt",
		"id": 323,
		"type": [
			"FIRE",
			"GROUND"
		],
		"atk": 194,
		"def": 136,
		"hp": 172,
		"fastMoves": "Ember,Rock Smash",
		"chargeMoves": "Earthquake,Solar Beam,Overheat,Earth Power",
		"legendary": false
	},{
		"name": "Torkoal",
		"id": 324,
		"type": [
			"FIRE"
		],
		"atk": 151,
		"def": 203,
		"hp": 172,
		"fastMoves": "Ember,Fire Spin",
		"chargeMoves": "Earthquake,Solar Beam,Overheat",
		"legendary": false
	},{
		"name": "Spoink",
		"id": 325,
		"type": [
			"PSYCHIC"
		],
		"atk": 125,
		"def": 122,
		"hp": 155,
		"fastMoves": "Splash,Zen Headbutt",
		"chargeMoves": "Psybeam,Shadow Ball,Mirror Coat",
		"legendary": false
	},{
		"name": "Grumpig",
		"id": 326,
		"type": [
			"PSYCHIC"
		],
		"atk": 171,
		"def": 188,
		"hp": 190,
		"fastMoves": "Charge Beam,Extrasensory",
		"chargeMoves": "Shadow Ball,Psychic,Mirror Coat",
		"legendary": false
	},{
		"name": "Spinda",
		"id": 327,
		"type": [
			"NORMAL"
		],
		"atk": 116,
		"def": 116,
		"hp": 155,
		"fastMoves": "Sucker Punch,Psycho Cut",
		"chargeMoves": "Dig,Rock Tomb,Icy Wind",
		"legendary": false
	},{
		"name": "Trapinch",
		"id": 328,
		"type": [
			"GROUND"
		],
		"atk": 162,
		"def": 78,
		"hp": 128,
		"fastMoves": "Mud Shot,Struggle Bug",
		"chargeMoves": "Dig,Sand Tomb,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Vibrava",
		"id": 329,
		"type": [
			"GROUND",
			"DRAGON"
		],
		"atk": 134,
		"def": 99,
		"hp": 137,
		"fastMoves": "Dragon Breath,Mud Shot",
		"chargeMoves": "Bug Buzz,Bulldoze,Sand Tomb,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Flygon",
		"id": 330,
		"type": [
			"GROUND",
			"DRAGON"
		],
		"atk": 205,
		"def": 168,
		"hp": 190,
		"fastMoves": "Mud Shot,Dragon Tail",
		"chargeMoves": "Earthquake,Stone Edge,Dragon Claw,Earth Power (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Cacnea",
		"id": 331,
		"type": [
			"GRASS"
		],
		"atk": 156,
		"def": 74,
		"hp": 137,
		"fastMoves": "Sucker Punch,Poison Sting",
		"chargeMoves": "Seed Bomb,Brick Break,Grass Knot,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Cacturne",
		"id": 332,
		"type": [
			"GRASS",
			"DARK"
		],
		"atk": 221,
		"def": 115,
		"hp": 172,
		"fastMoves": "Sucker Punch,Poison Jab",
		"chargeMoves": "Dark Pulse,Dynamic Punch,Grass Knot,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Swablu",
		"id": 333,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 76,
		"def": 132,
		"hp": 128,
		"fastMoves": "Peck,Astonish",
		"chargeMoves": "Ice Beam,Aerial Ace,Disarming Voice",
		"legendary": false
	},{
		"name": "Altaria",
		"id": 334,
		"type": [
			"DRAGON",
			"FLYING"
		],
		"atk": 141,
		"def": 201,
		"hp": 181,
		"fastMoves": "Dragon Breath,Peck",
		"chargeMoves": "Dragon Pulse,Dazzling Gleam,Sky Attack",
		"legendary": false
	},{
		"name": "Zangoose",
		"id": 335,
		"type": [
			"NORMAL"
		],
		"atk": 222,
		"def": 124,
		"hp": 177,
		"fastMoves": "Fury Cutter,Shadow Claw",
		"chargeMoves": "Dig,Night Slash,Close Combat",
		"legendary": false
	},{
		"name": "Seviper",
		"id": 336,
		"type": [
			"POISON"
		],
		"atk": 196,
		"def": 118,
		"hp": 177,
		"fastMoves": "Poison Jab,Iron Tail",
		"chargeMoves": "Wrap,Poison Fang,Crunch",
		"legendary": false
	},{
		"name": "Lunatone",
		"id": 337,
		"type": [
			"ROCK",
			"PSYCHIC"
		],
		"atk": 178,
		"def": 153,
		"hp": 207,
		"fastMoves": "Rock Throw,Confusion",
		"chargeMoves": "Rock Slide,Moonblast,Psychic",
		"legendary": false
	},{
		"name": "Solrock",
		"id": 338,
		"type": [
			"ROCK",
			"PSYCHIC"
		],
		"atk": 178,
		"def": 153,
		"hp": 207,
		"fastMoves": "Rock Throw,Confusion",
		"chargeMoves": "Rock Slide,Psychic,Solar Beam",
		"legendary": false
	},{
		"name": "Barboach",
		"id": 339,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 93,
		"def": 82,
		"hp": 137,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Ice Beam,Aqua Tail,Mud Bomb",
		"legendary": false
	},{
		"name": "Whiscash",
		"id": 340,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 151,
		"def": 141,
		"hp": 242,
		"fastMoves": "Mud Shot,Water Gun",
		"chargeMoves": "Blizzard,Mud Bomb,Water Pulse",
		"legendary": false
	},{
		"name": "Corphish",
		"id": 341,
		"type": [
			"WATER"
		],
		"atk": 141,
		"def": 99,
		"hp": 125,
		"fastMoves": "Bubble,Rock Smash",
		"chargeMoves": "Vise Grip,Bubble Beam,Aqua Jet",
		"legendary": false
	},{
		"name": "Crawdaunt",
		"id": 342,
		"type": [
			"WATER",
			"DARK"
		],
		"atk": 224,
		"def": 142,
		"hp": 160,
		"fastMoves": "Snarl,Waterfall",
		"chargeMoves": "Vise Grip,Night Slash,Bubble Beam,Crabhammer",
		"legendary": false
	},{
		"name": "Baltoy",
		"id": 343,
		"type": [
			"GROUND",
			"PSYCHIC"
		],
		"atk": 77,
		"def": 124,
		"hp": 120,
		"fastMoves": "Confusion,Extrasensory",
		"chargeMoves": "Dig,Psybeam,Gyro Ball",
		"legendary": false
	},{
		"name": "Claydol",
		"id": 344,
		"type": [
			"GROUND",
			"PSYCHIC"
		],
		"atk": 140,
		"def": 229,
		"hp": 155,
		"fastMoves": "Mud-Slap,Confusion,Extrasensory",
		"chargeMoves": "Earthquake,Psychic,Gyro Ball,Earth Power",
		"legendary": false
	},{
		"name": "Lileep",
		"id": 345,
		"type": [
			"ROCK",
			"GRASS"
		],
		"atk": 105,
		"def": 150,
		"hp": 165,
		"fastMoves": "Acid,Infestation",
		"chargeMoves": "Ancient Power,Grass Knot,Mirror Coat",
		"legendary": false
	},{
		"name": "Cradily",
		"id": 346,
		"type": [
			"ROCK",
			"GRASS"
		],
		"atk": 152,
		"def": 194,
		"hp": 200,
		"fastMoves": "Acid,Infestation,Bullet Seed",
		"chargeMoves": "Stone Edge,Bulldoze,Grass Knot",
		"legendary": false
	},{
		"name": "Anorith",
		"id": 347,
		"type": [
			"ROCK",
			"BUG"
		],
		"atk": 176,
		"def": 100,
		"hp": 128,
		"fastMoves": "Scratch,Struggle Bug",
		"chargeMoves": "Aqua Jet,Ancient Power,Cross Poison",
		"legendary": false
	},{
		"name": "Armaldo",
		"id": 348,
		"type": [
			"ROCK",
			"BUG"
		],
		"atk": 222,
		"def": 174,
		"hp": 181,
		"fastMoves": "Fury Cutter,Struggle Bug",
		"chargeMoves": "Cross Poison,Water Pulse,Rock Blast",
		"legendary": false
	},{
		"name": "Feebas",
		"id": 349,
		"type": [
			"WATER"
		],
		"atk": 29,
		"def": 85,
		"hp": 85,
		"fastMoves": "Tackle,Splash",
		"chargeMoves": "Mirror Coat",
		"legendary": false
	},{
		"name": "Milotic",
		"id": 350,
		"type": [
			"WATER"
		],
		"atk": 192,
		"def": 219,
		"hp": 216,
		"fastMoves": "Dragon Tail,Waterfall",
		"chargeMoves": "Hyper Beam,Blizzard,Surf",
		"legendary": false
	},{
		"name": "Castform Snowy Form",
		"id": 351,
		"type": [
			"ICE"
		],
		"atk": 139,
		"def": 139,
		"hp": 172,
		"fastMoves": "Tackle,Powder Snow",
		"chargeMoves": "Ice Beam,Blizzard,Weather Ball",
		"legendary": false
	},{
		"name": "Castform Sunny Form",
		"id": 351,
		"type": [
			"FIRE"
		],
		"atk": 139,
		"def": 139,
		"hp": 172,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Fire Blast,Solar Beam,Weather Ball",
		"legendary": false
	},{
		"name": "Castform Rainy Form",
		"id": 351,
		"type": [
			"WATER"
		],
		"atk": 139,
		"def": 139,
		"hp": 172,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Thunder,Hydro Pump,Weather Ball",
		"legendary": false
	},{
		"name": "Castform",
		"id": 351,
		"type": [
			"NORMAL"
		],
		"atk": 139,
		"def": 139,
		"hp": 172,
		"fastMoves": "Tackle,Hex",
		"chargeMoves": "Hurricane,Energy Ball,Weather Ball",
		"legendary": false
	},{
		"name": "Shuppet",
		"id": 353,
		"type": [
			"GHOST"
		],
		"atk": 138,
		"def": 65,
		"hp": 127,
		"fastMoves": "Feint Attack,Astonish",
		"chargeMoves": "Shadow Sneak,Ominous Wind,Night Shade,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Banette",
		"id": 354,
		"type": [
			"GHOST"
		],
		"atk": 218,
		"def": 126,
		"hp": 162,
		"fastMoves": "Shadow Claw,Hex",
		"chargeMoves": "Shadow Ball,Thunder,Dazzling Gleam,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Duskull",
		"id": 355,
		"type": [
			"GHOST"
		],
		"atk": 70,
		"def": 162,
		"hp": 85,
		"fastMoves": "Astonish,Hex",
		"chargeMoves": "Shadow Sneak,Ominous Wind,Night Shade,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Dusclops",
		"id": 356,
		"type": [
			"GHOST"
		],
		"atk": 124,
		"def": 234,
		"hp": 120,
		"fastMoves": "Feint Attack,Hex",
		"chargeMoves": "Ice Punch,Shadow Punch,Fire Punch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Tropius",
		"id": 357,
		"type": [
			"GRASS",
			"FLYING"
		],
		"atk": 136,
		"def": 163,
		"hp": 223,
		"fastMoves": "Razor Leaf,Air Slash",
		"chargeMoves": "Aerial Ace,Leaf Blade,Stomp",
		"legendary": false
	},{
		"name": "Chimecho",
		"id": 358,
		"type": [
			"PSYCHIC"
		],
		"atk": 175,
		"def": 170,
		"hp": 181,
		"fastMoves": "Astonish,Extrasensory",
		"chargeMoves": "Psyshock,Shadow Ball,Energy Ball",
		"legendary": false
	},{
		"name": "Absol",
		"id": 359,
		"type": [
			"DARK"
		],
		"atk": 246,
		"def": 120,
		"hp": 163,
		"fastMoves": "Psycho Cut,Snarl",
		"chargeMoves": "Dark Pulse,Megahorn,Thunder,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Wynaut",
		"id": 360,
		"type": [
			"PSYCHIC"
		],
		"atk": 41,
		"def": 86,
		"hp": 216,
		"fastMoves": "Splash,Counter",
		"chargeMoves": "Mirror Coat",
		"legendary": false
	},{
		"name": "Snorunt",
		"id": 361,
		"type": [
			"ICE"
		],
		"atk": 95,
		"def": 95,
		"hp": 137,
		"fastMoves": "Powder Snow,Hex",
		"chargeMoves": "Shadow Ball,Icy Wind,Avalanche",
		"legendary": false
	},{
		"name": "Glalie",
		"id": 362,
		"type": [
			"ICE"
		],
		"atk": 162,
		"def": 162,
		"hp": 190,
		"fastMoves": "Ice Shard,Frost Breath",
		"chargeMoves": "Shadow Ball,Avalanche,Gyro Ball",
		"legendary": false
	},{
		"name": "Spheal",
		"id": 363,
		"type": [
			"ICE",
			"WATER"
		],
		"atk": 95,
		"def": 90,
		"hp": 172,
		"fastMoves": "Water Gun,Rock Smash",
		"chargeMoves": "Water Pulse,Body Slam,Aurora Beam",
		"legendary": false
	},{
		"name": "Sealeo",
		"id": 364,
		"type": [
			"ICE",
			"WATER"
		],
		"atk": 137,
		"def": 132,
		"hp": 207,
		"fastMoves": "Water Gun,Powder Snow",
		"chargeMoves": "Water Pulse,Body Slam,Aurora Beam",
		"legendary": false
	},{
		"name": "Walrein",
		"id": 365,
		"type": [
			"ICE",
			"WATER"
		],
		"atk": 182,
		"def": 176,
		"hp": 242,
		"fastMoves": "Frost Breath,Waterfall",
		"chargeMoves": "Earthquake,Blizzard,Water Pulse",
		"legendary": false
	},{
		"name": "Clamperl",
		"id": 366,
		"type": [
			"WATER"
		],
		"atk": 133,
		"def": 135,
		"hp": 111,
		"fastMoves": "Water Gun",
		"chargeMoves": "Ice Beam,Water Pulse,Body Slam",
		"legendary": false
	},{
		"name": "Huntail",
		"id": 367,
		"type": [
			"WATER"
		],
		"atk": 197,
		"def": 179,
		"hp": 146,
		"fastMoves": "Bite,Water Gun",
		"chargeMoves": "Ice Beam,Aqua Tail,Crunch",
		"legendary": false
	},{
		"name": "Gorebyss",
		"id": 368,
		"type": [
			"WATER"
		],
		"atk": 211,
		"def": 179,
		"hp": 146,
		"fastMoves": "Water Gun,Confusion",
		"chargeMoves": "Draining Kiss,Water Pulse,Psychic",
		"legendary": false
	},{
		"name": "Relicanth",
		"id": 369,
		"type": [
			"WATER",
			"ROCK"
		],
		"atk": 162,
		"def": 203,
		"hp": 225,
		"fastMoves": "Water Gun,Zen Headbutt",
		"chargeMoves": "Aqua Tail,Ancient Power,Hydro Pump",
		"legendary": false
	},{
		"name": "Luvdisc",
		"id": 370,
		"type": [
			"WATER"
		],
		"atk": 81,
		"def": 128,
		"hp": 125,
		"fastMoves": "Water Gun,Splash",
		"chargeMoves": "Aqua Jet,Draining Kiss,Water Pulse",
		"legendary": false
	},{
		"name": "Bagon",
		"id": 371,
		"type": [
			"DRAGON"
		],
		"atk": 134,
		"def": 93,
		"hp": 128,
		"fastMoves": "Bite,Ember",
		"chargeMoves": "Flamethrower,Twister,Crunch,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Shelgon",
		"id": 372,
		"type": [
			"DRAGON"
		],
		"atk": 172,
		"def": 155,
		"hp": 163,
		"fastMoves": "Dragon Breath,Ember",
		"chargeMoves": "Flamethrower,Twister,Dragon Pulse,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Salamence",
		"id": 373,
		"type": [
			"DRAGON",
			"FLYING"
		],
		"atk": 277,
		"def": 168,
		"hp": 216,
		"fastMoves": "Bite,Fire Fang,Dragon Tail",
		"chargeMoves": "Fire Blast,Hydro Pump,Outrage (Community Day),Draco Meteor,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Beldum",
		"id": 374,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 96,
		"def": 132,
		"hp": 120,
		"fastMoves": "Take Down",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Metang",
		"id": 375,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 138,
		"def": 176,
		"hp": 155,
		"fastMoves": "Metal Claw,Zen Headbutt",
		"chargeMoves": "Psyshock,Psychic,Gyro Ball",
		"legendary": false
	},{
		"name": "Metagross",
		"id": 376,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 257,
		"def": 228,
		"hp": 190,
		"fastMoves": "Bullet Punch,Zen Headbutt",
		"chargeMoves": "Earthquake,Flash Cannon,Psychic,Meteor Mash (Community Day)",
		"legendary": false
	},{
		"name": "Jirachi",
		"id": 385,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 210,
		"def": 210,
		"hp": 225,
		"fastMoves": "Confusion,Charge Beam",
		"chargeMoves": "Dazzling Gleam,Psychic,Doom Desire",
		"legendary": false
	},{
		"name": "Turtwig",
		"id": 387,
		"type": [
			"GRASS"
		],
		"atk": 119,
		"def": 110,
		"hp": 146,
		"fastMoves": "Razor Leaf,Tackle",
		"chargeMoves": "Seed Bomb,Body Slam,Energy Ball,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Grotle",
		"id": 388,
		"type": [
			"GRASS"
		],
		"atk": 157,
		"def": 143,
		"hp": 181,
		"fastMoves": "Bite,Razor Leaf",
		"chargeMoves": "Solar Beam,Body Slam,Energy Ball,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Torterra",
		"id": 389,
		"type": [
			"GRASS",
			"GROUND"
		],
		"atk": 202,
		"def": 188,
		"hp": 216,
		"fastMoves": "Bite,Razor Leaf",
		"chargeMoves": "Earthquake,Stone Edge,Solar Beam,Sand Tomb,Frenzy Plant (Community Day),Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Chimchar",
		"id": 390,
		"type": [
			"FIRE"
		],
		"atk": 113,
		"def": 86,
		"hp": 127,
		"fastMoves": "Ember,Scratch",
		"chargeMoves": "Flame Wheel,Flamethrower,Flame Charge",
		"legendary": false
	},{
		"name": "Monferno",
		"id": 391,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 158,
		"def": 105,
		"hp": 162,
		"fastMoves": "Ember,Rock Smash",
		"chargeMoves": "Flame Wheel,Flamethrower,Low Sweep",
		"legendary": false
	},{
		"name": "Infernape",
		"id": 392,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 222,
		"def": 151,
		"hp": 183,
		"fastMoves": "Rock Smash,Fire Spin",
		"chargeMoves": "Flamethrower,Solar Beam,Close Combat,Blast Burn (Community Day)",
		"legendary": false
	},{
		"name": "Piplup",
		"id": 393,
		"type": [
			"WATER"
		],
		"atk": 112,
		"def": 102,
		"hp": 142,
		"fastMoves": "Pound,Bubble",
		"chargeMoves": "Drill Peck,Bubble Beam,Icy Wind",
		"legendary": false
	},{
		"name": "Prinplup",
		"id": 394,
		"type": [
			"WATER"
		],
		"atk": 150,
		"def": 139,
		"hp": 162,
		"fastMoves": "Metal Claw,Bubble",
		"chargeMoves": "Bubble Beam,Hydro Pump,Icy Wind",
		"legendary": false
	},{
		"name": "Empoleon",
		"id": 395,
		"type": [
			"WATER",
			"STEEL"
		],
		"atk": 210,
		"def": 186,
		"hp": 197,
		"fastMoves": "Metal Claw,Waterfall",
		"chargeMoves": "Flash Cannon,Blizzard,Hydro Pump,Hydro Cannon (Community Day)",
		"legendary": false
	},{
		"name": "Starly",
		"id": 396,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 101,
		"def": 58,
		"hp": 120,
		"fastMoves": "Quick Attack,Tackle",
		"chargeMoves": "Aerial Ace,Brave Bird",
		"legendary": false
	},{
		"name": "Staravia",
		"id": 397,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 142,
		"def": 94,
		"hp": 146,
		"fastMoves": "Wing Attack,Quick Attack",
		"chargeMoves": "Heat Wave,Aerial Ace,Brave Bird",
		"legendary": false
	},{
		"name": "Staraptor",
		"id": 398,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 234,
		"def": 140,
		"hp": 198,
		"fastMoves": "Wing Attack,Quick Attack",
		"chargeMoves": "Heat Wave,Close Combat,Brave Bird",
		"legendary": false
	},{
		"name": "Bidoof",
		"id": 399,
		"type": [
			"NORMAL"
		],
		"atk": 80,
		"def": 73,
		"hp": 153,
		"fastMoves": "Tackle,Take Down",
		"chargeMoves": "Hyper Fang,Grass Knot,Crunch",
		"legendary": false
	},{
		"name": "Bibarel",
		"id": 400,
		"type": [
			"NORMAL",
			"WATER"
		],
		"atk": 162,
		"def": 119,
		"hp": 188,
		"fastMoves": "Water Gun,Take Down",
		"chargeMoves": "Hyper Beam,Hyper Fang,Surf",
		"legendary": false
	},{
		"name": "Kricketot",
		"id": 401,
		"type": [
			"BUG"
		],
		"atk": 45,
		"def": 74,
		"hp": 114,
		"fastMoves": "Bug Bite,Struggle Bug",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Kricketune",
		"id": 402,
		"type": [
			"BUG"
		],
		"atk": 160,
		"def": 100,
		"hp": 184,
		"fastMoves": "Fury Cutter,Struggle Bug",
		"chargeMoves": "Aerial Ace,Bug Buzz,X-Scissor",
		"legendary": false
	},{
		"name": "Shinx",
		"id": 403,
		"type": [
			"ELECTRIC"
		],
		"atk": 117,
		"def": 64,
		"hp": 128,
		"fastMoves": "Spark,Tackle",
		"chargeMoves": "Discharge,Thunderbolt,Swift",
		"legendary": false
	},{
		"name": "Luxio",
		"id": 404,
		"type": [
			"ELECTRIC"
		],
		"atk": 159,
		"def": 95,
		"hp": 155,
		"fastMoves": "Bite,Spark",
		"chargeMoves": "Thunderbolt,Wild Charge,Crunch",
		"legendary": false
	},{
		"name": "Luxray",
		"id": 405,
		"type": [
			"ELECTRIC"
		],
		"atk": 232,
		"def": 156,
		"hp": 190,
		"fastMoves": "Spark,Snarl,Hidden Power",
		"chargeMoves": "Hyper Beam,Wild Charge,Crunch",
		"legendary": false
	},{
		"name": "Budew",
		"id": 406,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 91,
		"def": 109,
		"hp": 120,
		"fastMoves": "Razor Leaf,Hidden Power",
		"chargeMoves": "Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Roserade",
		"id": 407,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 243,
		"def": 185,
		"hp": 155,
		"fastMoves": "Razor Leaf,Poison Jab",
		"chargeMoves": "Dazzling Gleam,Sludge Bomb,Solar Beam,Grass Knot",
		"legendary": false
	},{
		"name": "Cranidos",
		"id": 408,
		"type": [
			"ROCK"
		],
		"atk": 218,
		"def": 71,
		"hp": 167,
		"fastMoves": "Zen Headbutt,Take Down",
		"chargeMoves": "Ancient Power,Rock Tomb,Bulldoze",
		"legendary": false
	},{
		"name": "Rampardos",
		"id": 409,
		"type": [
			"ROCK"
		],
		"atk": 295,
		"def": 109,
		"hp": 219,
		"fastMoves": "Zen Headbutt,Smack Down",
		"chargeMoves": "Flamethrower,Rock Slide,Outrage",
		"legendary": false
	},{
		"name": "Shieldon",
		"id": 410,
		"type": [
			"ROCK",
			"STEEL"
		],
		"atk": 76,
		"def": 195,
		"hp": 102,
		"fastMoves": "Tackle,Iron Tail",
		"chargeMoves": "Ancient Power,Rock Tomb,Heavy Slam",
		"legendary": false
	},{
		"name": "Bastiodon",
		"id": 411,
		"type": [
			"ROCK",
			"STEEL"
		],
		"atk": 94,
		"def": 286,
		"hp": 155,
		"fastMoves": "Iron Tail,Smack Down",
		"chargeMoves": "Flamethrower,Stone Edge,Flash Cannon",
		"legendary": false
	},{
		"name": "Burmy Plant Cloak",
		"id": 412,
		"type": [
			"BUG"
		],
		"atk": 53,
		"def": 83,
		"hp": 120,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Burmy Sandy Cloak",
		"id": 412,
		"type": [
			"BUG"
		],
		"atk": 53,
		"def": 83,
		"hp": 120,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Burmy Trash Cloak",
		"id": 412,
		"type": [
			"BUG"
		],
		"atk": 53,
		"def": 83,
		"hp": 120,
		"fastMoves": "Bug Bite,Tackle",
		"chargeMoves": "Struggle",
		"legendary": false
	},{
		"name": "Wormadam Plant Cloak",
		"id": 413,
		"type": [
			"BUG",
			"GRASS"
		],
		"atk": 141,
		"def": 180,
		"hp": 155,
		"fastMoves": "Bug Bite,Confusion",
		"chargeMoves": "Psybeam,Bug Buzz,Energy Ball",
		"legendary": false
	},{
		"name": "Wormadam Sandy Cloak",
		"id": 413,
		"type": [
			"BUG",
			"GROUND"
		],
		"atk": 141,
		"def": 180,
		"hp": 155,
		"fastMoves": "Bug Bite,Confusion",
		"chargeMoves": "Psybeam,Bug Buzz,Bulldoze",
		"legendary": false
	},{
		"name": "Wormadam Trash Cloak",
		"id": 413,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 127,
		"def": 175,
		"hp": 155,
		"fastMoves": "Bug Bite,Confusion",
		"chargeMoves": "Psybeam,Bug Buzz,Iron Head",
		"legendary": false
	},{
		"name": "Mothim",
		"id": 414,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 185,
		"def": 98,
		"hp": 172,
		"fastMoves": "Bug Bite,Air Slash",
		"chargeMoves": "Psybeam,Aerial Ace,Bug Buzz",
		"legendary": false
	},{
		"name": "Combee",
		"id": 415,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 59,
		"def": 83,
		"hp": 102,
		"fastMoves": "Bug Bite",
		"chargeMoves": "Bug Buzz",
		"legendary": false
	},{
		"name": "Vespiquen",
		"id": 416,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 149,
		"def": 190,
		"hp": 172,
		"fastMoves": "Fury Cutter,Bug Bite,Poison Sting,Air Slash",
		"chargeMoves": "Bug Buzz,Power Gem,X-Scissor,Fell Stinger",
		"legendary": false
	},{
		"name": "Pachirisu",
		"id": 417,
		"type": [
			"ELECTRIC"
		],
		"atk": 94,
		"def": 172,
		"hp": 155,
		"fastMoves": "Spark,Volt Switch",
		"chargeMoves": "Thunder Punch,Thunder,Thunderbolt",
		"legendary": false
	},{
		"name": "Buizel",
		"id": 418,
		"type": [
			"WATER"
		],
		"atk": 132,
		"def": 67,
		"hp": 146,
		"fastMoves": "Quick Attack,Water Gun",
		"chargeMoves": "Aqua Jet,Water Pulse,Swift",
		"legendary": false
	},{
		"name": "Floatzel",
		"id": 419,
		"type": [
			"WATER"
		],
		"atk": 221,
		"def": 114,
		"hp": 198,
		"fastMoves": "Water Gun,Waterfall",
		"chargeMoves": "Aqua Jet,Hydro Pump,Swift",
		"legendary": false
	},{
		"name": "Cherubi",
		"id": 420,
		"type": [
			"GRASS"
		],
		"atk": 108,
		"def": 92,
		"hp": 128,
		"fastMoves": "Tackle,Bullet Seed",
		"chargeMoves": "Petal Blizzard,Seed Bomb,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Cherrim Sunshine Form",
		"id": 421,
		"type": [
			"GRASS"
		],
		"atk": 170,
		"def": 153,
		"hp": 172,
		"fastMoves": "Razor Leaf,Bullet Seed",
		"chargeMoves": "Hyper Beam,Dazzling Gleam,Solar Beam,Weather Ball",
		"legendary": false
	},{
		"name": "Cherrim Overcast Form",
		"id": 421,
		"type": [
			"GRASS"
		],
		"atk": 170,
		"def": 153,
		"hp": 172,
		"fastMoves": "Razor Leaf,Bullet Seed",
		"chargeMoves": "Hyper Beam,Dazzling Gleam,Solar Beam",
		"legendary": false
	},{
		"name": "Shellos East Sea",
		"id": 422,
		"type": [
			"WATER"
		],
		"atk": 103,
		"def": 105,
		"hp": 183,
		"fastMoves": "Mud-Slap,Hidden Power",
		"chargeMoves": "Mud Bomb,Water Pulse,Body Slam",
		"legendary": false
	},{
		"name": "Shellos West Sea",
		"id": 422,
		"type": [
			"WATER"
		],
		"atk": 103,
		"def": 105,
		"hp": 183,
		"fastMoves": "Mud-Slap,Hidden Power",
		"chargeMoves": "Mud Bomb,Water Pulse,Body Slam",
		"legendary": false
	},{
		"name": "Gastrodon East Sea",
		"id": 423,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 169,
		"def": 143,
		"hp": 244,
		"fastMoves": "Mud-Slap,Hidden Power",
		"chargeMoves": "Water Pulse,Body Slam,Earth Power",
		"legendary": false
	},{
		"name": "Gastrodon West Sea",
		"id": 423,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 169,
		"def": 143,
		"hp": 244,
		"fastMoves": "Mud-Slap,Hidden Power",
		"chargeMoves": "Water Pulse,Body Slam,Earth Power",
		"legendary": false
	},{
		"name": "Ambipom",
		"id": 424,
		"type": [
			"NORMAL"
		],
		"atk": 205,
		"def": 143,
		"hp": 181,
		"fastMoves": "Scratch,Astonish",
		"chargeMoves": "Hyper Beam,Aerial Ace,Low Sweep",
		"legendary": false
	},{
		"name": "Drifloon",
		"id": 425,
		"type": [
			"GHOST",
			"FLYING"
		],
		"atk": 117,
		"def": 80,
		"hp": 207,
		"fastMoves": "Astonish,Hex",
		"chargeMoves": "Ominous Wind,Shadow Ball,Icy Wind",
		"legendary": false
	},{
		"name": "Drifblim",
		"id": 426,
		"type": [
			"GHOST",
			"FLYING"
		],
		"atk": 180,
		"def": 102,
		"hp": 312,
		"fastMoves": "Astonish,Hex",
		"chargeMoves": "Ominous Wind,Shadow Ball,Icy Wind",
		"legendary": false
	},{
		"name": "Buneary",
		"id": 427,
		"type": [
			"NORMAL"
		],
		"atk": 130,
		"def": 105,
		"hp": 146,
		"fastMoves": "Quick Attack,Pound",
		"chargeMoves": "Fire Punch,Swift",
		"legendary": false
	},{
		"name": "Lopunny",
		"id": 428,
		"type": [
			"NORMAL"
		],
		"atk": 156,
		"def": 194,
		"hp": 163,
		"fastMoves": "Low Kick,Pound",
		"chargeMoves": "Hyper Beam,Fire Punch,Focus Blast",
		"legendary": false
	},{
		"name": "Mismagius",
		"id": 429,
		"type": [
			"GHOST"
		],
		"atk": 211,
		"def": 187,
		"hp": 155,
		"fastMoves": "Sucker Punch,Hex",
		"chargeMoves": "Dark Pulse,Shadow Ball,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Honchkrow",
		"id": 430,
		"type": [
			"DARK",
			"FLYING"
		],
		"atk": 243,
		"def": 103,
		"hp": 225,
		"fastMoves": "Peck,Snarl",
		"chargeMoves": "Dark Pulse,Psychic,Brave Bird,Sky Attack",
		"legendary": false
	},{
		"name": "Glameow",
		"id": 431,
		"type": [
			"NORMAL"
		],
		"atk": 109,
		"def": 82,
		"hp": 135,
		"fastMoves": "Quick Attack,Scratch",
		"chargeMoves": "Aerial Ace,Thunderbolt,Play Rough",
		"legendary": false
	},{
		"name": "Purugly",
		"id": 432,
		"type": [
			"NORMAL"
		],
		"atk": 172,
		"def": 133,
		"hp": 174,
		"fastMoves": "Shadow Claw,Scratch",
		"chargeMoves": "Aerial Ace,Thunder,Play Rough",
		"legendary": false
	},{
		"name": "Chingling",
		"id": 433,
		"type": [
			"PSYCHIC"
		],
		"atk": 114,
		"def": 94,
		"hp": 128,
		"fastMoves": "Zen Headbutt,Astonish",
		"chargeMoves": "Wrap,Psyshock,Shadow Ball",
		"legendary": false
	},{
		"name": "Stunky",
		"id": 434,
		"type": [
			"POISON",
			"DARK"
		],
		"atk": 121,
		"def": 90,
		"hp": 160,
		"fastMoves": "Bite,Scratch",
		"chargeMoves": "Flamethrower,Sludge Bomb,Crunch",
		"legendary": false
	},{
		"name": "Skuntank",
		"id": 435,
		"type": [
			"POISON",
			"DARK"
		],
		"atk": 184,
		"def": 132,
		"hp": 230,
		"fastMoves": "Bite,Poison Jab",
		"chargeMoves": "Flamethrower,Sludge Bomb,Crunch",
		"legendary": false
	},{
		"name": "Bronzor",
		"id": 436,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 43,
		"def": 154,
		"hp": 149,
		"fastMoves": "Tackle,Confusion",
		"chargeMoves": "Psyshock,Gyro Ball,Heavy Slam",
		"legendary": false
	},{
		"name": "Bronzong",
		"id": 437,
		"type": [
			"STEEL",
			"PSYCHIC"
		],
		"atk": 161,
		"def": 213,
		"hp": 167,
		"fastMoves": "Confusion,Feint Attack",
		"chargeMoves": "Flash Cannon,Psyshock,Bulldoze,Psychic,Heavy Slam",
		"legendary": false
	},{
		"name": "Bonsly",
		"id": 438,
		"type": [
			"ROCK"
		],
		"atk": 124,
		"def": 133,
		"hp": 137,
		"fastMoves": "Rock Throw,Counter",
		"chargeMoves": "Earthquake,Rock Tomb,Rock Slide",
		"legendary": false
	},{
		"name": "Mime Jr.",
		"id": 439,
		"type": [
			"PSYCHIC",
			"FAIRY"
		],
		"atk": 125,
		"def": 142,
		"hp": 85,
		"fastMoves": "Pound,Confusion",
		"chargeMoves": "Psybeam,Psyshock,Psychic",
		"legendary": false
	},{
		"name": "Happiny",
		"id": 440,
		"type": [
			"NORMAL"
		],
		"atk": 25,
		"def": 77,
		"hp": 225,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Psychic",
		"legendary": false
	},{
		"name": "Chatot",
		"id": 441,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 183,
		"def": 91,
		"hp": 183,
		"fastMoves": "Peck,Steel Wing",
		"chargeMoves": "Heat Wave,Sky Attack,Night Shade",
		"legendary": false
	},{
		"name": "Spiritomb",
		"id": 442,
		"type": [
			"GHOST",
			"DARK"
		],
		"atk": 169,
		"def": 199,
		"hp": 137,
		"fastMoves": "Sucker Punch,Feint Attack",
		"chargeMoves": "Shadow Sneak,Ominous Wind,Shadow Ball",
		"legendary": false
	},{
		"name": "Gible",
		"id": 443,
		"type": [
			"DRAGON",
			"GROUND"
		],
		"atk": 124,
		"def": 84,
		"hp": 151,
		"fastMoves": "Mud Shot,Take Down",
		"chargeMoves": "Dig,Twister,Body Slam",
		"legendary": false
	},{
		"name": "Gabite",
		"id": 444,
		"type": [
			"DRAGON",
			"GROUND"
		],
		"atk": 172,
		"def": 125,
		"hp": 169,
		"fastMoves": "Mud Shot,Take Down",
		"chargeMoves": "Flamethrower,Dig,Twister",
		"legendary": false
	},{
		"name": "Garchomp",
		"id": 445,
		"type": [
			"DRAGON",
			"GROUND"
		],
		"atk": 261,
		"def": 193,
		"hp": 239,
		"fastMoves": "Mud Shot,Dragon Tail",
		"chargeMoves": "Earthquake,Fire Blast,Sand Tomb,Outrage",
		"legendary": false
	},{
		"name": "Munchlax",
		"id": 446,
		"type": [
			"NORMAL"
		],
		"atk": 137,
		"def": 117,
		"hp": 286,
		"fastMoves": "Lick,Tackle",
		"chargeMoves": "Gunk Shot,Bulldoze,Body Slam",
		"legendary": false
	},{
		"name": "Riolu",
		"id": 447,
		"type": [
			"FIGHTING"
		],
		"atk": 127,
		"def": 78,
		"hp": 120,
		"fastMoves": "Quick Attack,Counter",
		"chargeMoves": "Cross Chop,Low Sweep,Brick Break",
		"legendary": false
	},{
		"name": "Lucario",
		"id": 448,
		"type": [
			"FIGHTING",
			"STEEL"
		],
		"atk": 236,
		"def": 144,
		"hp": 172,
		"fastMoves": "Bullet Punch,Counter",
		"chargeMoves": "Flash Cannon,Shadow Ball,Close Combat,Power-Up Punch,Aura Sphere",
		"legendary": false
	},{
		"name": "Hippopotas",
		"id": 449,
		"type": [
			"GROUND"
		],
		"atk": 124,
		"def": 118,
		"hp": 169,
		"fastMoves": "Bite,Tackle",
		"chargeMoves": "Dig,Rock Tomb,Body Slam",
		"legendary": false
	},{
		"name": "Hippowdon",
		"id": 450,
		"type": [
			"GROUND"
		],
		"atk": 201,
		"def": 191,
		"hp": 239,
		"fastMoves": "Bite,Fire Fang,Thunder Fang,Ice Fang",
		"chargeMoves": "Earthquake,Stone Edge,Body Slam,Earth Power",
		"legendary": false
	},{
		"name": "Skorupi",
		"id": 451,
		"type": [
			"POISON",
			"BUG"
		],
		"atk": 93,
		"def": 151,
		"hp": 120,
		"fastMoves": "Poison Sting,Infestation",
		"chargeMoves": "Aqua Tail,Cross Poison,Sludge Bomb",
		"legendary": false
	},{
		"name": "Drapion",
		"id": 452,
		"type": [
			"POISON",
			"DARK"
		],
		"atk": 180,
		"def": 202,
		"hp": 172,
		"fastMoves": "Bite,Poison Sting,Infestation,Ice Fang",
		"chargeMoves": "Aqua Tail,Sludge Bomb,Crunch,Fell Stinger",
		"legendary": false
	},{
		"name": "Croagunk",
		"id": 453,
		"type": [
			"POISON",
			"FIGHTING"
		],
		"atk": 116,
		"def": 76,
		"hp": 134,
		"fastMoves": "Poison Jab,Poison Sting",
		"chargeMoves": "Low Sweep,Sludge Bomb,Brick Break",
		"legendary": false
	},{
		"name": "Toxicroak",
		"id": 454,
		"type": [
			"POISON",
			"FIGHTING"
		],
		"atk": 211,
		"def": 133,
		"hp": 195,
		"fastMoves": "Poison Jab,Counter",
		"chargeMoves": "Sludge Bomb,Mud Bomb,Dynamic Punch",
		"legendary": false
	},{
		"name": "Carnivine",
		"id": 455,
		"type": [
			"GRASS"
		],
		"atk": 187,
		"def": 136,
		"hp": 179,
		"fastMoves": "Bite,Vine Whip",
		"chargeMoves": "Power Whip,Energy Ball,Crunch",
		"legendary": false
	},{
		"name": "Finneon",
		"id": 456,
		"type": [
			"WATER"
		],
		"atk": 96,
		"def": 116,
		"hp": 135,
		"fastMoves": "Pound,Water Gun",
		"chargeMoves": "Ice Beam,Water Pulse,Silver Wind",
		"legendary": false
	},{
		"name": "Lumineon",
		"id": 457,
		"type": [
			"WATER"
		],
		"atk": 142,
		"def": 170,
		"hp": 170,
		"fastMoves": "Water Gun,Waterfall",
		"chargeMoves": "Blizzard,Water Pulse,Silver Wind",
		"legendary": false
	},{
		"name": "Mantyke",
		"id": 458,
		"type": [
			"WATER",
			"FLYING"
		],
		"atk": 105,
		"def": 179,
		"hp": 128,
		"fastMoves": "Tackle,Bubble",
		"chargeMoves": "Ice Beam,Aerial Ace,Water Pulse",
		"legendary": false
	},{
		"name": "Snover",
		"id": 459,
		"type": [
			"GRASS",
			"ICE"
		],
		"atk": 115,
		"def": 105,
		"hp": 155,
		"fastMoves": "Ice Shard,Powder Snow",
		"chargeMoves": "Ice Beam,Stomp,Energy Ball,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Abomasnow",
		"id": 460,
		"type": [
			"GRASS",
			"ICE"
		],
		"atk": 178,
		"def": 158,
		"hp": 207,
		"fastMoves": "Razor Leaf,Powder Snow",
		"chargeMoves": "Blizzard,Energy Ball,Outrage,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Weavile",
		"id": 461,
		"type": [
			"DARK",
			"ICE"
		],
		"atk": 243,
		"def": 171,
		"hp": 172,
		"fastMoves": "Ice Shard,Feint Attack,Snarl",
		"chargeMoves": "Focus Blast,Avalanche,Foul Play,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Magnezone",
		"id": 462,
		"type": [
			"ELECTRIC",
			"STEEL"
		],
		"atk": 238,
		"def": 205,
		"hp": 172,
		"fastMoves": "Spark,Charge Beam",
		"chargeMoves": "Flash Cannon,Wild Charge,Zap Cannon,Mirror Shot,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Lickilicky",
		"id": 463,
		"type": [
			"NORMAL"
		],
		"atk": 161,
		"def": 181,
		"hp": 242,
		"fastMoves": "Lick,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Earthquake,Shadow Ball,Solar Beam,Body Slam (legacy)",
		"legendary": false
	},{
		"name": "Rhyperior",
		"id": 464,
		"type": [
			"GROUND",
			"ROCK"
		],
		"atk": 241,
		"def": 190,
		"hp": 251,
		"fastMoves": "Mud-Slap,Smack Down",
		"chargeMoves": "Earthquake,Stone Edge,Surf,Skull Bash,Superpower,Rock Wrecker (Community Day)",
		"legendary": false
	},{
		"name": "Tangrowth",
		"id": 465,
		"type": [
			"GRASS"
		],
		"atk": 207,
		"def": 184,
		"hp": 225,
		"fastMoves": "Vine Whip,Infestation",
		"chargeMoves": "Ancient Power,Rock Slide,Sludge Bomb,Solar Beam,Power Whip",
		"legendary": false
	},{
		"name": "Electivire",
		"id": 466,
		"type": [
			"ELECTRIC"
		],
		"atk": 249,
		"def": 163,
		"hp": 181,
		"fastMoves": "Thunder Shock,Low Kick",
		"chargeMoves": "Ice Punch,Thunder Punch,Thunder,Wild Charge,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Magmortar",
		"id": 467,
		"type": [
			"FIRE"
		],
		"atk": 247,
		"def": 172,
		"hp": 181,
		"fastMoves": "Karate Chop,Fire Spin",
		"chargeMoves": "Fire Blast,Psychic,Fire Punch,Brick Break,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Yanmega",
		"id": 469,
		"type": [
			"BUG",
			"FLYING"
		],
		"atk": 231,
		"def": 156,
		"hp": 200,
		"fastMoves": "Bug Bite,Wing Attack",
		"chargeMoves": "Aerial Ace,Bug Buzz,Ancient Power",
		"legendary": false
	},{
		"name": "Leafeon",
		"id": 470,
		"type": [
			"GRASS"
		],
		"atk": 216,
		"def": 219,
		"hp": 163,
		"fastMoves": "Razor Leaf,Quick Attack",
		"chargeMoves": "Solar Beam,Leaf Blade,Energy Ball,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Glaceon",
		"id": 471,
		"type": [
			"ICE"
		],
		"atk": 238,
		"def": 205,
		"hp": 163,
		"fastMoves": "Ice Shard,Frost Breath",
		"chargeMoves": "Ice Beam,Icy Wind,Avalanche,Last Resort (Community Day)",
		"legendary": false
	},{
		"name": "Gliscor",
		"id": 472,
		"type": [
			"GROUND",
			"FLYING"
		],
		"atk": 185,
		"def": 222,
		"hp": 181,
		"fastMoves": "Fury Cutter,Wing Attack",
		"chargeMoves": "Earthquake,Aerial Ace,Night Slash,Sand Tomb",
		"legendary": false
	},{
		"name": "Mamoswine",
		"id": 473,
		"type": [
			"ICE",
			"GROUND"
		],
		"atk": 247,
		"def": 146,
		"hp": 242,
		"fastMoves": "Mud-Slap,Powder Snow",
		"chargeMoves": "Stone Edge,Ancient Power (Community Day),Bulldoze,Avalanche",
		"legendary": false
	},{
		"name": "Porygon Z",
		"id": 474,
		"type": [
			"NORMAL"
		],
		"atk": 264,
		"def": 150,
		"hp": 198,
		"fastMoves": "Charge Beam,Hidden Power,Lock-On",
		"chargeMoves": "Hyper Beam,Blizzard,Solar Beam,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Gallade",
		"id": 475,
		"type": [
			"PSYCHIC",
			"FIGHTING"
		],
		"atk": 237,
		"def": 195,
		"hp": 169,
		"fastMoves": "Low Kick,Confusion,Charm",
		"chargeMoves": "Psychic,Leaf Blade,Close Combat,Frustration (Shadow),Return (Shadow),Synchronoise (Community Day)",
		"legendary": false
	},{
		"name": "Probopass",
		"id": 476,
		"type": [
			"ROCK",
			"STEEL"
		],
		"atk": 135,
		"def": 275,
		"hp": 155,
		"fastMoves": "Spark,Rock Throw",
		"chargeMoves": "Rock Slide,Magnet Bomb,Thunderbolt",
		"legendary": false
	},{
		"name": "Dusknoir",
		"id": 477,
		"type": [
			"GHOST"
		],
		"atk": 180,
		"def": 254,
		"hp": 128,
		"fastMoves": "Astonish,Hex",
		"chargeMoves": "Dark Pulse,Ominous Wind,Psychic,Frustration (Shadow),Return (Shadow)",
		"legendary": false
	},{
		"name": "Froslass",
		"id": 478,
		"type": [
			"ICE",
			"GHOST"
		],
		"atk": 171,
		"def": 150,
		"hp": 172,
		"fastMoves": "Powder Snow,Hex",
		"chargeMoves": "Shadow Ball,Avalanche,Crunch",
		"legendary": false
	},{
		"name": "Snivy",
		"id": 495,
		"type": [
			"GRASS"
		],
		"atk": 88,
		"def": 107,
		"hp": 128,
		"fastMoves": "Vine Whip,Tackle",
		"chargeMoves": "Wrap,Seed Bomb,Energy Ball",
		"legendary": false
	},{
		"name": "Servine",
		"id": 496,
		"type": [
			"GRASS"
		],
		"atk": 122,
		"def": 152,
		"hp": 155,
		"fastMoves": "Vine Whip,Iron Tail",
		"chargeMoves": "Wrap,Grass Knot,Leaf Tornado",
		"legendary": false
	},{
		"name": "Serperior",
		"id": 497,
		"type": [
			"GRASS"
		],
		"atk": 161,
		"def": 204,
		"hp": 181,
		"fastMoves": "Vine Whip,Iron Tail",
		"chargeMoves": "Aerial Ace,Grass Knot,Leaf Tornado",
		"legendary": false
	},{
		"name": "Tepig",
		"id": 498,
		"type": [
			"FIRE"
		],
		"atk": 115,
		"def": 85,
		"hp": 163,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Flamethrower,Flame Charge,Body Slam",
		"legendary": false
	},{
		"name": "Pignite",
		"id": 499,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 173,
		"def": 106,
		"hp": 207,
		"fastMoves": "Ember,Tackle",
		"chargeMoves": "Flamethrower,Rock Tomb,Flame Charge",
		"legendary": false
	},{
		"name": "Emboar",
		"id": 500,
		"type": [
			"FIRE",
			"FIGHTING"
		],
		"atk": 235,
		"def": 127,
		"hp": 242,
		"fastMoves": "Low Kick,Ember",
		"chargeMoves": "Heat Wave,Rock Slide,Focus Blast",
		"legendary": false
	},{
		"name": "Oshawott",
		"id": 501,
		"type": [
			"WATER"
		],
		"atk": 117,
		"def": 85,
		"hp": 146,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Night Slash,Aqua Tail,Water Pulse",
		"legendary": false
	},{
		"name": "Dewott",
		"id": 502,
		"type": [
			"WATER"
		],
		"atk": 159,
		"def": 116,
		"hp": 181,
		"fastMoves": "Fury Cutter,Water Gun",
		"chargeMoves": "Aqua Tail,X-Scissor,Water Pulse",
		"legendary": false
	},{
		"name": "Samurott",
		"id": 503,
		"type": [
			"WATER"
		],
		"atk": 212,
		"def": 157,
		"hp": 216,
		"fastMoves": "Fury Cutter,Waterfall",
		"chargeMoves": "Megahorn,Blizzard,Hydro Pump",
		"legendary": false
	},{
		"name": "Patrat",
		"id": 504,
		"type": [
			"NORMAL"
		],
		"atk": 98,
		"def": 73,
		"hp": 128,
		"fastMoves": "Bite,Tackle",
		"chargeMoves": "Dig,Hyper Fang,Grass Knot",
		"legendary": false
	},{
		"name": "Watchog",
		"id": 505,
		"type": [
			"NORMAL"
		],
		"atk": 165,
		"def": 139,
		"hp": 155,
		"fastMoves": "Bite,Low Kick",
		"chargeMoves": "Hyper Fang,Grass Knot,Crunch",
		"legendary": false
	},{
		"name": "Lillipup",
		"id": 506,
		"type": [
			"NORMAL"
		],
		"atk": 107,
		"def": 86,
		"hp": 128,
		"fastMoves": "Tackle,Take Down",
		"chargeMoves": "Dig,Rock Tomb,Thunderbolt",
		"legendary": false
	},{
		"name": "Herdier",
		"id": 507,
		"type": [
			"NORMAL"
		],
		"atk": 145,
		"def": 126,
		"hp": 163,
		"fastMoves": "Lick,Take Down",
		"chargeMoves": "Dig,Thunderbolt,Play Rough",
		"legendary": false
	},{
		"name": "Stoutland",
		"id": 508,
		"type": [
			"NORMAL"
		],
		"atk": 206,
		"def": 182,
		"hp": 198,
		"fastMoves": "Lick,Take Down,Ice Fang",
		"chargeMoves": "Play Rough,Wild Charge,Crunch",
		"legendary": false
	},{
		"name": "Purrloin",
		"id": 509,
		"type": [
			"DARK"
		],
		"atk": 98,
		"def": 73,
		"hp": 121,
		"fastMoves": "Sucker Punch,Scratch",
		"chargeMoves": "Dark Pulse,Night Slash,Play Rough",
		"legendary": false
	},{
		"name": "Liepard",
		"id": 510,
		"type": [
			"DARK"
		],
		"atk": 187,
		"def": 106,
		"hp": 162,
		"fastMoves": "Snarl,Charm",
		"chargeMoves": "Dark Pulse,Play Rough,Gunk Shot",
		"legendary": false
	},{
		"name": "Pansage",
		"id": 511,
		"type": [
			"GRASS"
		],
		"atk": 104,
		"def": 94,
		"hp": 137,
		"fastMoves": "Vine Whip,Scratch",
		"chargeMoves": "Seed Bomb,Energy Ball,Crunch",
		"legendary": false
	},{
		"name": "Simisage",
		"id": 512,
		"type": [
			"GRASS"
		],
		"atk": 206,
		"def": 133,
		"hp": 181,
		"fastMoves": "Bite,Vine Whip",
		"chargeMoves": "Solar Beam,Grass Knot,Crunch",
		"legendary": false
	},{
		"name": "Pansear",
		"id": 513,
		"type": [
			"FIRE"
		],
		"atk": 104,
		"def": 94,
		"hp": 137,
		"fastMoves": "Scratch,Fire Spin",
		"chargeMoves": "Flame Charge,Flame Burst,Crunch",
		"legendary": false
	},{
		"name": "Simisear",
		"id": 514,
		"type": [
			"FIRE"
		],
		"atk": 206,
		"def": 133,
		"hp": 181,
		"fastMoves": "Bite,Fire Spin",
		"chargeMoves": "Flamethrower,Fire Blast,Crunch",
		"legendary": false
	},{
		"name": "Panpour",
		"id": 515,
		"type": [
			"WATER"
		],
		"atk": 104,
		"def": 94,
		"hp": 137,
		"fastMoves": "Scratch,Water Gun",
		"chargeMoves": "Water Pulse,Crunch,Surf",
		"legendary": false
	},{
		"name": "Simipour",
		"id": 516,
		"type": [
			"WATER"
		],
		"atk": 206,
		"def": 133,
		"hp": 181,
		"fastMoves": "Bite,Water Gun",
		"chargeMoves": "Hydro Pump,Crunch,Surf",
		"legendary": false
	},{
		"name": "Pidove",
		"id": 519,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 98,
		"def": 80,
		"hp": 137,
		"fastMoves": "Quick Attack,Air Slash",
		"chargeMoves": "Heat Wave,Aerial Ace,Air Cutter",
		"legendary": false
	},{
		"name": "Tranquill",
		"id": 520,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 144,
		"def": 107,
		"hp": 158,
		"fastMoves": "Steel Wing,Air Slash",
		"chargeMoves": "Heat Wave,Aerial Ace,Sky Attack",
		"legendary": false
	},{
		"name": "Unfezant",
		"id": 521,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 226,
		"def": 146,
		"hp": 190,
		"fastMoves": "Steel Wing,Air Slash",
		"chargeMoves": "Hyper Beam,Heat Wave,Sky Attack",
		"legendary": false
	},{
		"name": "Blitzle",
		"id": 522,
		"type": [
			"ELECTRIC"
		],
		"atk": 118,
		"def": 64,
		"hp": 128,
		"fastMoves": "Spark,Quick Attack",
		"chargeMoves": "Discharge,Thunderbolt,Flame Charge",
		"legendary": false
	},{
		"name": "Zebstrika",
		"id": 523,
		"type": [
			"ELECTRIC"
		],
		"atk": 211,
		"def": 136,
		"hp": 181,
		"fastMoves": "Spark,Low Kick",
		"chargeMoves": "Discharge,Flame Charge,Wild Charge",
		"legendary": false
	},{
		"name": "Roggenrola",
		"id": 524,
		"type": [
			"ROCK"
		],
		"atk": 121,
		"def": 110,
		"hp": 146,
		"fastMoves": "Tackle,Smack Down",
		"chargeMoves": "Stone Edge,Bulldoze,Rock Blast",
		"legendary": false
	},{
		"name": "Boldore",
		"id": 525,
		"type": [
			"ROCK"
		],
		"atk": 174,
		"def": 143,
		"hp": 172,
		"fastMoves": "Mud-Slap,Smack Down",
		"chargeMoves": "Stone Edge,Rock Slide,Bulldoze",
		"legendary": false
	},{
		"name": "Gigalith",
		"id": 526,
		"type": [
			"ROCK"
		],
		"atk": 226,
		"def": 201,
		"hp": 198,
		"fastMoves": "Mud-Slap,Smack Down",
		"chargeMoves": "Rock Slide,Solar Beam,Heavy Slam,Superpower",
		"legendary": false
	},{
		"name": "Woobat",
		"id": 527,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 107,
		"def": 85,
		"hp": 163,
		"fastMoves": "Confusion,Air Slash",
		"chargeMoves": "Aerial Ace,Psyshock,Air Cutter",
		"legendary": false
	},{
		"name": "Swoobat",
		"id": 528,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 161,
		"def": 119,
		"hp": 167,
		"fastMoves": "Confusion,Air Slash",
		"chargeMoves": "Aerial Ace,Psychic,Future Sight",
		"legendary": false
	},{
		"name": "Drilbur",
		"id": 529,
		"type": [
			"GROUND"
		],
		"atk": 154,
		"def": 85,
		"hp": 155,
		"fastMoves": "Scratch,Mud-Slap",
		"chargeMoves": "Dig,Drill Run,Rock Tomb",
		"legendary": false
	},{
		"name": "Excadrill",
		"id": 530,
		"type": [
			"GROUND",
			"STEEL"
		],
		"atk": 255,
		"def": 129,
		"hp": 242,
		"fastMoves": "Metal Claw,Mud-Slap",
		"chargeMoves": "Earthquake,Drill Run,Rock Slide,Iron Head",
		"legendary": false
	},{
		"name": "Audino",
		"id": 531,
		"type": [
			"NORMAL"
		],
		"atk": 114,
		"def": 163,
		"hp": 230,
		"fastMoves": "Pound,Zen Headbutt",
		"chargeMoves": "Hyper Beam,Disarming Voice,Dazzling Gleam",
		"legendary": false
	},{
		"name": "Timburr",
		"id": 532,
		"type": [
			"FIGHTING"
		],
		"atk": 134,
		"def": 87,
		"hp": 181,
		"fastMoves": "Low Kick,Pound",
		"chargeMoves": "Low Sweep,Rock Tomb,Brick Break",
		"legendary": false
	},{
		"name": "Gurdurr",
		"id": 533,
		"type": [
			"FIGHTING"
		],
		"atk": 180,
		"def": 134,
		"hp": 198,
		"fastMoves": "Low Kick,Poison Jab",
		"chargeMoves": "Stone Edge,Low Sweep,Brick Break",
		"legendary": false
	},{
		"name": "Conkeldurr",
		"id": 534,
		"type": [
			"FIGHTING"
		],
		"atk": 243,
		"def": 158,
		"hp": 233,
		"fastMoves": "Poison Jab,Counter",
		"chargeMoves": "Stone Edge,Dynamic Punch,Focus Blast",
		"legendary": false
	},{
		"name": "Tympole",
		"id": 535,
		"type": [
			"WATER"
		],
		"atk": 98,
		"def": 78,
		"hp": 137,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Sludge Wave,Mud Bomb,Water Pulse",
		"legendary": false
	},{
		"name": "Palpitoad",
		"id": 536,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 128,
		"def": 109,
		"hp": 181,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Sludge Wave,Water Pulse,Earth Power",
		"legendary": false
	},{
		"name": "Seismitoad",
		"id": 537,
		"type": [
			"WATER",
			"GROUND"
		],
		"atk": 188,
		"def": 150,
		"hp": 233,
		"fastMoves": "Mud Shot,Bubble",
		"chargeMoves": "Sludge Bomb,Earth Power,Muddy Water",
		"legendary": false
	},{
		"name": "Throh",
		"id": 538,
		"type": [
			"FIGHTING"
		],
		"atk": 172,
		"def": 160,
		"hp": 260,
		"fastMoves": "Low Kick,Zen Headbutt",
		"chargeMoves": "Low Sweep,Body Slam,Focus Blast",
		"legendary": false
	},{
		"name": "Sawk",
		"id": 539,
		"type": [
			"FIGHTING"
		],
		"atk": 231,
		"def": 153,
		"hp": 181,
		"fastMoves": "Low Kick,Poison Jab",
		"chargeMoves": "Low Sweep,Body Slam,Focus Blast",
		"legendary": false
	},{
		"name": "Venipede",
		"id": 543,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 83,
		"def": 99,
		"hp": 102,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Sludge Bomb,Signal Beam,Gyro Ball",
		"legendary": false
	},{
		"name": "Whirlipede",
		"id": 544,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 100,
		"def": 173,
		"hp": 120,
		"fastMoves": "Bug Bite,Poison Sting",
		"chargeMoves": "Sludge Bomb,Signal Beam,Gyro Ball",
		"legendary": false
	},{
		"name": "Scolipede",
		"id": 545,
		"type": [
			"BUG",
			"POISON"
		],
		"atk": 203,
		"def": 175,
		"hp": 155,
		"fastMoves": "Bug Bite,Poison Jab",
		"chargeMoves": "Megahorn,Sludge Bomb,X-Scissor,Gyro Ball",
		"legendary": false
	},{
		"name": "Basculin Red Striped Form",
		"id": 550,
		"type": [
			"WATER"
		],
		"atk": 189,
		"def": 129,
		"hp": 172,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Aqua Jet,Aqua Tail,Muddy Water",
		"legendary": false
	},{
		"name": "Basculin Blue Striped Form",
		"id": 550,
		"type": [
			"WATER"
		],
		"atk": 189,
		"def": 129,
		"hp": 172,
		"fastMoves": "Tackle,Water Gun",
		"chargeMoves": "Aqua Jet,Aqua Tail,Muddy Water",
		"legendary": false
	},{
		"name": "Darumaka",
		"id": 554,
		"type": [
			"FIRE"
		],
		"atk": 153,
		"def": 86,
		"hp": 172,
		"fastMoves": "Tackle,Fire Fang",
		"chargeMoves": "Flame Charge,Fire Punch",
		"legendary": false
	},{
		"name": "Galarian Darumaka",
		"id": 554,
		"type": [
			"ICE"
		],
		"atk": 172,
		"def": 153,
		"hp": 86,
		"fastMoves": "Tackle,Ice Fang",
		"chargeMoves": "Ice Punch,Ice Beam",
		"legendary": false
	},{
		"name": "Darmanitan Standard Mode",
		"id": 555,
		"type": [
			"FIRE"
		],
		"atk": 263,
		"def": 114,
		"hp": 233,
		"fastMoves": "Tackle,Fire Fang",
		"chargeMoves": "Rock Slide,Psychic,Focus Blast,Overheat",
		"legendary": false
	},{
		"name": "Galarian Darmanitan",
		"id": 555,
		"type": [
			"ICE"
		],
		"atk": 233,
		"def": 263,
		"hp": 114,
		"fastMoves": "Tackle,Ice Fang",
		"chargeMoves": "Overheat,Avalanche,Superpower,Ice Punch",
		"legendary": false
	},{
		"name": "Maractus",
		"id": 556,
		"type": [
			"GRASS"
		],
		"atk": 201,
		"def": 130,
		"hp": 181,
		"fastMoves": "Poison Jab,Bullet Seed",
		"chargeMoves": "Aerial Ace,Petal Blizzard,Solar Beam",
		"legendary": false
	},{
		"name": "Dwebble",
		"id": 557,
		"type": [
			"BUG",
			"ROCK"
		],
		"atk": 118,
		"def": 128,
		"hp": 137,
		"fastMoves": "Cut,Smack Down",
		"chargeMoves": "Rock Tomb,X-Scissor,Rock Blast",
		"legendary": false
	},{
		"name": "Crustle",
		"id": 558,
		"type": [
			"BUG",
			"ROCK"
		],
		"atk": 188,
		"def": 200,
		"hp": 172,
		"fastMoves": "Fury Cutter,Smack Down",
		"chargeMoves": "Rock Slide,X-Scissor,Rock Blast",
		"legendary": false
	},{
		"name": "Scraggy",
		"id": 559,
		"type": [
			"DARK",
			"FIGHTING"
		],
		"atk": 132,
		"def": 132,
		"hp": 137,
		"fastMoves": "Feint Attack,Rock Smash",
		"chargeMoves": "Brick Break,Foul Play,Acid Spray",
		"legendary": false
	},{
		"name": "Scrafty",
		"id": 560,
		"type": [
			"DARK",
			"FIGHTING"
		],
		"atk": 163,
		"def": 222,
		"hp": 163,
		"fastMoves": "Counter,Snarl",
		"chargeMoves": "Foul Play,Acid Spray,Power-Up Punch",
		"legendary": false
	},{
		"name": "Sigilyph",
		"id": 561,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 204,
		"def": 167,
		"hp": 176,
		"fastMoves": "Zen Headbutt,Air Slash",
		"chargeMoves": "Psybeam,Ancient Power,Signal Beam,Air Cutter",
		"legendary": false
	},{
		"name": "Yamask",
		"id": 562,
		"type": [
			"GHOST"
		],
		"atk": 95,
		"def": 141,
		"hp": 116,
		"fastMoves": "Zen Headbutt,Astonish",
		"chargeMoves": "Dark Pulse,Ominous Wind,Shadow Ball",
		"legendary": false
	},{
		"name": "Cofagrigus",
		"id": 563,
		"type": [
			"GHOST"
		],
		"atk": 163,
		"def": 237,
		"hp": 151,
		"fastMoves": "Zen Headbutt,Astonish",
		"chargeMoves": "Dark Pulse,Shadow Ball,Psychic",
		"legendary": false
	},{
		"name": "Tirtouga",
		"id": 564,
		"type": [
			"WATER",
			"ROCK"
		],
		"atk": 134,
		"def": 146,
		"hp": 144,
		"fastMoves": "Bite,Water Gun",
		"chargeMoves": "Ancient Power,Body Slam,Surf",
		"legendary": false
	},{
		"name": "Carracosta",
		"id": 565,
		"type": [
			"WATER",
			"ROCK"
		],
		"atk": 192,
		"def": 197,
		"hp": 179,
		"fastMoves": "Rock Throw,Water Gun",
		"chargeMoves": "Ancient Power,Body Slam,Surf",
		"legendary": false
	},{
		"name": "Archen",
		"id": 566,
		"type": [
			"ROCK",
			"FLYING"
		],
		"atk": 213,
		"def": 89,
		"hp": 146,
		"fastMoves": "Wing Attack,Quick Attack",
		"chargeMoves": "Ancient Power,Dragon Claw,Crunch",
		"legendary": false
	},{
		"name": "Archeops",
		"id": 567,
		"type": [
			"ROCK",
			"FLYING"
		],
		"atk": 292,
		"def": 139,
		"hp": 181,
		"fastMoves": "Wing Attack,Steel Wing",
		"chargeMoves": "Ancient Power,Dragon Claw,Crunch",
		"legendary": false
	},{
		"name": "Trubbish",
		"id": 568,
		"type": [
			"POISON"
		],
		"atk": 96,
		"def": 122,
		"hp": 137,
		"fastMoves": "Pound,Take Down",
		"chargeMoves": "Seed Bomb,Gunk Shot",
		"legendary": false
	},{
		"name": "Garbodor",
		"id": 569,
		"type": [
			"POISON"
		],
		"atk": 181,
		"def": 164,
		"hp": 190,
		"fastMoves": "Infestation,Take Down",
		"chargeMoves": "Seed Bomb,Gunk Shot,Body Slam,Acid Spray",
		"legendary": false
	},{
		"name": "Minccino",
		"id": 572,
		"type": [
			"NORMAL"
		],
		"atk": 98,
		"def": 80,
		"hp": 146,
		"fastMoves": "Pound,Charm",
		"chargeMoves": "Aqua Tail,Thunderbolt,Swift",
		"legendary": false
	},{
		"name": "Cinccino",
		"id": 573,
		"type": [
			"NORMAL"
		],
		"atk": 198,
		"def": 130,
		"hp": 181,
		"fastMoves": "Pound,Charm",
		"chargeMoves": "Hyper Beam,Aqua Tail,Thunderbolt",
		"legendary": false
	},{
		"name": "Gothita",
		"id": 574,
		"type": [
			"PSYCHIC"
		],
		"atk": 98,
		"def": 112,
		"hp": 128,
		"fastMoves": "Pound,Confusion",
		"chargeMoves": "Psybeam,Psyshock,Psychic",
		"legendary": false
	},{
		"name": "Gothorita",
		"id": 575,
		"type": [
			"PSYCHIC"
		],
		"atk": 137,
		"def": 153,
		"hp": 155,
		"fastMoves": "Pound,Confusion",
		"chargeMoves": "Psybeam,Psychic,Future Sight",
		"legendary": false
	},{
		"name": "Gothitelle",
		"id": 576,
		"type": [
			"PSYCHIC"
		],
		"atk": 176,
		"def": 205,
		"hp": 172,
		"fastMoves": "Confusion,Charm",
		"chargeMoves": "Rock Slide,Psychic,Future Sight",
		"legendary": false
	},{
		"name": "Solosis",
		"id": 577,
		"type": [
			"PSYCHIC"
		],
		"atk": 170,
		"def": 83,
		"hp": 128,
		"fastMoves": "Zen Headbutt,Hidden Power",
		"chargeMoves": "Psyshock,Thunder,Night Shade",
		"legendary": false
	},{
		"name": "Duosion",
		"id": 578,
		"type": [
			"PSYCHIC"
		],
		"atk": 208,
		"def": 103,
		"hp": 163,
		"fastMoves": "Zen Headbutt,Hidden Power",
		"chargeMoves": "Psyshock,Thunder,Night Shade",
		"legendary": false
	},{
		"name": "Reuniclus",
		"id": 579,
		"type": [
			"PSYCHIC"
		],
		"atk": 214,
		"def": 148,
		"hp": 242,
		"fastMoves": "Zen Headbutt,Hidden Power",
		"chargeMoves": "Shadow Ball,Thunder,Future Sight",
		"legendary": false
	},{
		"name": "Ducklett",
		"id": 580,
		"type": [
			"FLYING",
			"WATER"
		],
		"atk": 158,
		"def": 84,
		"hp": 96,
		"fastMoves": "Water Gun,Wing Attack",
		"chargeMoves": "Aerial Ace,Bubble Beam,Brave Bird",
		"legendary": false
	},{
		"name": "Swanna",
		"id": 581,
		"type": [
			"FLYING",
			"WATER"
		],
		"atk": 181,
		"def": 182,
		"hp": 132,
		"fastMoves": "Water Gun,Air Slash",
		"chargeMoves": "Ice Beam,Bubble Beam,Hurricane",
		"legendary": false
	},{
		"name": "Karrablast",
		"id": 588,
		"type": [
			"BUG"
		],
		"atk": 137,
		"def": 87,
		"hp": 137,
		"fastMoves": "Fury Cutter,Peck",
		"chargeMoves": "Aerial Ace,Drill Run,Signal Beam,X-Scissor",
		"legendary": false
	},{
		"name": "Escavalier",
		"id": 589,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 223,
		"def": 187,
		"hp": 172,
		"fastMoves": "Bug Bite,Counter",
		"chargeMoves": "Megahorn,Aerial Ace,Drill Run,Acid Spray",
		"legendary": false
	},{
		"name": "Foongus",
		"id": 590,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 97,
		"def": 91,
		"hp": 170,
		"fastMoves": "Feint Attack,Astonish",
		"chargeMoves": "Body Slam,Grass Knot,Energy Ball",
		"legendary": false
	},{
		"name": "Amoonguss",
		"id": 591,
		"type": [
			"GRASS",
			"POISON"
		],
		"atk": 155,
		"def": 139,
		"hp": 249,
		"fastMoves": "Feint Attack,Astonish",
		"chargeMoves": "Sludge Bomb,Grass Knot,Foul Play",
		"legendary": false
	},{
		"name": "Alomomola",
		"id": 594,
		"type": [
			"WATER"
		],
		"atk": 138,
		"def": 131,
		"hp": 338,
		"fastMoves": "Hidden Power,Waterfall",
		"chargeMoves": "Blizzard,Hydro Pump,Psychic",
		"legendary": false
	},{
		"name": "Joltik",
		"id": 595,
		"type": [
			"BUG",
			"ELECTRIC"
		],
		"atk": 110,
		"def": 98,
		"hp": 137,
		"fastMoves": "Sucker Punch,Charge Beam",
		"chargeMoves": "Discharge,Bug Buzz,Cross Poison",
		"legendary": false
	},{
		"name": "Galvantula",
		"id": 596,
		"type": [
			"BUG",
			"ELECTRIC"
		],
		"atk": 201,
		"def": 128,
		"hp": 172,
		"fastMoves": "Fury Cutter,Volt Switch",
		"chargeMoves": "Discharge,Bug Buzz,Cross Poison,Energy Ball",
		"legendary": false
	},{
		"name": "Ferroseed",
		"id": 597,
		"type": [
			"GRASS",
			"STEEL"
		],
		"atk": 82,
		"def": 155,
		"hp": 127,
		"fastMoves": "Tackle,Metal Claw",
		"chargeMoves": "Flash Cannon,Iron Head,Gyro Ball",
		"legendary": false
	},{
		"name": "Ferrothorn",
		"id": 598,
		"type": [
			"GRASS",
			"STEEL"
		],
		"atk": 158,
		"def": 223,
		"hp": 179,
		"fastMoves": "Metal Claw,Bullet Seed",
		"chargeMoves": "Flash Cannon,Thunder,Power Whip,Acid Spray,Mirror Shot",
		"legendary": false
	},{
		"name": "Klink",
		"id": 599,
		"type": [
			"STEEL"
		],
		"atk": 98,
		"def": 121,
		"hp": 120,
		"fastMoves": "Charge Beam,Volt Switch",
		"chargeMoves": "Vise Grip,Discharge,Zap Cannon",
		"legendary": false
	},{
		"name": "Klang",
		"id": 600,
		"type": [
			"STEEL"
		],
		"atk": 150,
		"def": 174,
		"hp": 155,
		"fastMoves": "Thunder Shock,Charge Beam",
		"chargeMoves": "Vise Grip,Thunderbolt,Zap Cannon",
		"legendary": false
	},{
		"name": "Klinklang",
		"id": 601,
		"type": [
			"STEEL"
		],
		"atk": 199,
		"def": 214,
		"hp": 155,
		"fastMoves": "Thunder Shock,Charge Beam",
		"chargeMoves": "Hyper Beam,Flash Cannon,Zap Cannon,Mirror Shot",
		"legendary": false
	},{
		"name": "Litwick",
		"id": 607,
		"type": [
			"GHOST",
			"FIRE"
		],
		"atk": 108,
		"def": 98,
		"hp": 137,
		"fastMoves": "Ember,Astonish",
		"chargeMoves": "Heat Wave,Flame Charge,Flame Burst",
		"legendary": false
	},{
		"name": "Lampent",
		"id": 608,
		"type": [
			"GHOST",
			"FIRE"
		],
		"atk": 169,
		"def": 115,
		"hp": 155,
		"fastMoves": "Ember,Astonish",
		"chargeMoves": "Heat Wave,Flame Burst,Energy Ball",
		"legendary": false
	},{
		"name": "Chandelure",
		"id": 609,
		"type": [
			"GHOST",
			"FIRE"
		],
		"atk": 271,
		"def": 182,
		"hp": 155,
		"fastMoves": "Hex,Fire Spin",
		"chargeMoves": "Shadow Ball,Overheat,Energy Ball",
		"legendary": false
	},{
		"name": "Axew",
		"id": 610,
		"type": [
			"DRAGON"
		],
		"atk": 154,
		"def": 101,
		"hp": 130,
		"fastMoves": "Scratch,Iron Tail",
		"chargeMoves": "Aqua Tail,Dragon Pulse,Dragon Claw",
		"legendary": false
	},{
		"name": "Fraxure",
		"id": 611,
		"type": [
			"DRAGON"
		],
		"atk": 212,
		"def": 123,
		"hp": 165,
		"fastMoves": "Dragon Tail,Iron Tail",
		"chargeMoves": "Night Slash,Aqua Tail,Dragon Claw",
		"legendary": false
	},{
		"name": "Haxorus",
		"id": 612,
		"type": [
			"DRAGON"
		],
		"atk": 284,
		"def": 172,
		"hp": 183,
		"fastMoves": "Counter,Dragon Tail",
		"chargeMoves": "Earthquake,Night Slash,Dragon Claw,Surf",
		"legendary": false
	},{
		"name": "Cubchoo",
		"id": 613,
		"type": [
			"ICE"
		],
		"atk": 128,
		"def": 74,
		"hp": 146,
		"fastMoves": "Powder Snow,Charm",
		"chargeMoves": "Ice Punch,Play Rough,Icy Wind",
		"legendary": false
	},{
		"name": "Beartic",
		"id": 614,
		"type": [
			"ICE"
		],
		"atk": 233,
		"def": 152,
		"hp": 216,
		"fastMoves": "Powder Snow,Charm",
		"chargeMoves": "Ice Punch,Play Rough,Surf",
		"legendary": false
	},{
		"name": "Cryogonal",
		"id": 615,
		"type": [
			"ICE"
		],
		"atk": 190,
		"def": 218,
		"hp": 190,
		"fastMoves": "Ice Shard,Frost Breath",
		"chargeMoves": "Night Slash,Water Pulse,Solar Beam,Aurora Beam",
		"legendary": false
	},{
		"name": "Shelmet",
		"id": 616,
		"type": [
			"BUG"
		],
		"atk": 72,
		"def": 140,
		"hp": 137,
		"fastMoves": "Acid,Infestation",
		"chargeMoves": "Bug Buzz,Signal Beam,Body Slam",
		"legendary": false
	},{
		"name": "Accelgor",
		"id": 617,
		"type": [
			"BUG"
		],
		"atk": 220,
		"def": 120,
		"hp": 190,
		"fastMoves": "Acid,Infestation",
		"chargeMoves": "Bug Buzz,Signal Beam,Focus Blast,Acid Spray",
		"legendary": false
	},{
		"name": "Stunfisk",
		"id": 618,
		"type": [
			"GROUND",
			"ELECTRIC"
		],
		"atk": 144,
		"def": 171,
		"hp": 240,
		"fastMoves": "Thunder Shock,Mud Shot",
		"chargeMoves": "Discharge,Mud Bomb,Muddy Water",
		"legendary": false
	},{
		"name": "Galarian Stunfisk",
		"id": 618,
		"type": [
			"GROUND",
			"STEEL"
		],
		"atk": 240,
		"def": 144,
		"hp": 171,
		"fastMoves": "Mud Shot,Metal Claw",
		"chargeMoves": "Earthquake,Flash Cannon,Muddy Water,Rock Slide",
		"legendary": false
	},{
		"name": "Golett",
		"id": 622,
		"type": [
			"GROUND",
			"GHOST"
		],
		"atk": 127,
		"def": 92,
		"hp": 153,
		"fastMoves": "Mud-Slap,Astonish",
		"chargeMoves": "Shadow Punch,Brick Break,Night Shade",
		"legendary": false
	},{
		"name": "Golurk",
		"id": 623,
		"type": [
			"GROUND",
			"GHOST"
		],
		"atk": 222,
		"def": 154,
		"hp": 205,
		"fastMoves": "Mud-Slap,Astonish",
		"chargeMoves": "Shadow Punch,Dynamic Punch,Earth Power",
		"legendary": false
	},{
		"name": "Rufflet",
		"id": 627,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 150,
		"def": 97,
		"hp": 172,
		"fastMoves": "Wing Attack,Peck",
		"chargeMoves": "Aerial Ace,Rock Tomb,Brave Bird",
		"legendary": false
	},{
		"name": "Braviary",
		"id": 628,
		"type": [
			"NORMAL",
			"FLYING"
		],
		"atk": 232,
		"def": 152,
		"hp": 225,
		"fastMoves": "Steel Wing,Air Slash",
		"chargeMoves": "Heat Wave,Rock Slide,Brave Bird",
		"legendary": false
	},{
		"name": "Heatmor",
		"id": 631,
		"type": [
			"FIRE"
		],
		"atk": 204,
		"def": 129,
		"hp": 198,
		"fastMoves": "Lick,Fire Spin",
		"chargeMoves": "Flamethrower,Thunder Punch,Power-Up Punch",
		"legendary": false
	},{
		"name": "Durant",
		"id": 632,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 217,
		"def": 188,
		"hp": 151,
		"fastMoves": "Bug Bite,Metal Claw",
		"chargeMoves": "Stone Edge,Iron Head,X-Scissor",
		"legendary": false
	},{
		"name": "Deino",
		"id": 633,
		"type": [
			"DARK",
			"DRAGON"
		],
		"atk": 116,
		"def": 93,
		"hp": 141,
		"fastMoves": "Dragon Breath,Tackle",
		"chargeMoves": "Dragon Pulse,Body Slam,Crunch",
		"legendary": false
	},{
		"name": "Zweilous",
		"id": 634,
		"type": [
			"DARK",
			"DRAGON"
		],
		"atk": 159,
		"def": 135,
		"hp": 176,
		"fastMoves": "Bite,Dragon Breath",
		"chargeMoves": "Dark Pulse,Dragon Pulse,Body Slam",
		"legendary": false
	},{
		"name": "Hydreigon",
		"id": 635,
		"type": [
			"DARK",
			"DRAGON"
		],
		"atk": 256,
		"def": 188,
		"hp": 211,
		"fastMoves": "Bite,Dragon Breath",
		"chargeMoves": "Dark Pulse,Flash Cannon,Dragon Pulse",
		"legendary": false
	},{
		"name": "Kyurem",
		"id": 646,
		"type": [
			"DRAGON",
			"ICE"
		],
		"atk": 245,
		"def": 246,
		"hp": 170,
		"fastMoves": "Dragon Breath,Steel Wing",
		"chargeMoves": "Dragon Claw,Blizzard,Draco Meteor",
		"legendary": false
	},{
		"name": "Meltan",
		"id": 808,
		"type": [
			"STEEL"
		],
		"atk": 118,
		"def": 99,
		"hp": 130,
		"fastMoves": "Thunder Shock",
		"chargeMoves": "Flash Cannon,Thunderbolt",
		"legendary": false
	},{
		"name": "Melmetal",
		"id": 809,
		"type": [
			"STEEL"
		],
		"atk": 226,
		"def": 190,
		"hp": 264,
		"fastMoves": "Thunder Shock",
		"chargeMoves": "Hyper Beam,Flash Cannon,Rock Slide,Thunderbolt,Superpower",
		"legendary": false
	},{
		"name": "Obstagoon",
		"id": 862,
		"type": [
			"DARK",
			"NORMAL"
		],
		"atk": 212,
		"def": 180,
		"hp": 194,
		"fastMoves": "Counter,Lick",
		"chargeMoves": "Cross Chop,Night Slash,Hyper Beam,Gunk Shot",
		"legendary": false
	},{
		"name": "Perrserker",
		"id": 863,
		"type": [
			"STEEL"
		],
		"atk": 172,
		"def": 195,
		"hp": 162,
		"fastMoves": "Metal Claw,Shadow Claw",
		"chargeMoves": "Iron Head,Close Combat,Play Rough,Foul Play",
		"legendary": false
	},{
		"name": "Sirfetch'd",
		"id": 865,
		"type": [
			"FIGHTING"
		],
		"atk": 158,
		"def": 248,
		"hp": 176,
		"fastMoves": "Counter,Fury Cutter",
		"chargeMoves": "Close Combat,Brave Bird,Leaf Blade,Night Slash",
		"legendary": false
	},{
		"name": "Articuno",
		"id": 144,
		"type": [
			"ICE",
			"FLYING"
		],
		"atk": 192,
		"def": 236,
		"hp": 207,
		"fastMoves": "Ice Shard,Frost Breath",
		"chargeMoves": "Ice Beam,Blizzard,Ancient Power,Icy Wind,Frustration (Shadow),Return (Shadow)",
		"legendary": true
	},{
		"name": "Zapdos",
		"id": 145,
		"type": [
			"ELECTRIC",
			"FLYING"
		],
		"atk": 253,
		"def": 185,
		"hp": 207,
		"fastMoves": "Charge Beam",
		"chargeMoves": "Drill Peck,Ancient Power,Thunder,Thunderbolt,Zap Cannon,Frustration (Shadow),Return (Shadow)",
		"legendary": true
	},{
		"name": "Moltres",
		"id": 146,
		"type": [
			"FIRE",
			"FLYING"
		],
		"atk": 251,
		"def": 181,
		"hp": 207,
		"fastMoves": "Wing Attack,Fire Spin",
		"chargeMoves": "Heat Wave,Ancient Power,Fire Blast,Overheat,Frustration (Shadow),Return (Shadow)",
		"legendary": true
	},{
		"name": "Armored Mewtwo",
		"id": 150,
		"type": [
			"PSYCHIC"
		],
		"atk": 182,
		"def": 278,
		"hp": 214,
		"fastMoves": "Confusion,Iron Tail",
		"chargeMoves": "Earthquake,Rock Slide,Dynamic Punch,Future Sight",
		"legendary": true
	},{
		"name": "Mewtwo",
		"id": 150,
		"type": [
			"PSYCHIC"
		],
		"atk": 300,
		"def": 182,
		"hp": 214,
		"fastMoves": "Psycho Cut,Confusion",
		"chargeMoves": "Flamethrower,Ice Beam,Thunderbolt,Psychic,Focus Blast",
		"legendary": true
	},{
		"name": "Raikou",
		"id": 243,
		"type": [
			"ELECTRIC"
		],
		"atk": 241,
		"def": 195,
		"hp": 207,
		"fastMoves": "Thunder Shock,Volt Switch",
		"chargeMoves": "Shadow Ball,Thunder,Thunderbolt,Wild Charge",
		"legendary": true
	},{
		"name": "Entei",
		"id": 244,
		"type": [
			"FIRE"
		],
		"atk": 235,
		"def": 171,
		"hp": 251,
		"fastMoves": "Fire Fang,Fire Spin",
		"chargeMoves": "Flamethrower,Iron Head,Fire Blast,Overheat",
		"legendary": true
	},{
		"name": "Suicune",
		"id": 245,
		"type": [
			"WATER"
		],
		"atk": 180,
		"def": 235,
		"hp": 225,
		"fastMoves": "Extrasensory,Snarl,Ice Fang",
		"chargeMoves": "Ice Beam,Bubble Beam,Water Pulse,Hydro Pump",
		"legendary": true
	},{
		"name": "Lugia",
		"id": 249,
		"type": [
			"PSYCHIC",
			"FLYING"
		],
		"atk": 193,
		"def": 310,
		"hp": 235,
		"fastMoves": "Dragon Tail,Extrasensory",
		"chargeMoves": "Hydro Pump,Sky Attack,Future Sight",
		"legendary": true
	},{
		"name": "Ho oh",
		"id": 250,
		"type": [
			"FIRE",
			"FLYING"
		],
		"atk": 239,
		"def": 244,
		"hp": 214,
		"fastMoves": "Steel Wing,Extrasensory,Hidden Power",
		"chargeMoves": "Fire Blast,Solar Beam,Brave Bird",
		"legendary": true
	},{
		"name": "Regirock",
		"id": 377,
		"type": [
			"ROCK"
		],
		"atk": 179,
		"def": 309,
		"hp": 190,
		"fastMoves": "Rock Throw,Rock Smash,Lock-On",
		"chargeMoves": "Stone Edge,Focus Blast,Zap Cannon",
		"legendary": true
	},{
		"name": "Regice",
		"id": 378,
		"type": [
			"ICE"
		],
		"atk": 179,
		"def": 309,
		"hp": 190,
		"fastMoves": "Frost Breath,Rock Smash,Lock-On",
		"chargeMoves": "Earthquake,Blizzard,Focus Blast",
		"legendary": true
	},{
		"name": "Registeel",
		"id": 379,
		"type": [
			"STEEL"
		],
		"atk": 143,
		"def": 285,
		"hp": 190,
		"fastMoves": "Metal Claw,Rock Smash,Lock-On",
		"chargeMoves": "Hyper Beam,Flash Cannon,Focus Blast",
		"legendary": true
	},{
		"name": "Latias",
		"id": 380,
		"type": [
			"DRAGON",
			"PSYCHIC"
		],
		"atk": 228,
		"def": 246,
		"hp": 190,
		"fastMoves": "Dragon Breath,Zen Headbutt,Charm",
		"chargeMoves": "Thunder,Psychic,Outrage",
		"legendary": true
	},{
		"name": "Latios",
		"id": 381,
		"type": [
			"DRAGON",
			"PSYCHIC"
		],
		"atk": 268,
		"def": 212,
		"hp": 190,
		"fastMoves": "Dragon Breath,Zen Headbutt",
		"chargeMoves": "Dragon Claw,Psychic,Solar Beam",
		"legendary": true
	},{
		"name": "Kyogre",
		"id": 382,
		"type": [
			"WATER"
		],
		"atk": 270,
		"def": 228,
		"hp": 205,
		"fastMoves": "Waterfall",
		"chargeMoves": "Blizzard,Thunder,Hydro Pump,Surf",
		"legendary": true
	},{
		"name": "Groudon",
		"id": 383,
		"type": [
			"GROUND"
		],
		"atk": 270,
		"def": 228,
		"hp": 205,
		"fastMoves": "Mud Shot,Dragon Tail",
		"chargeMoves": "Earthquake,Fire Blast,Solar Beam,Fire Punch",
		"legendary": true
	},{
		"name": "Rayquaza",
		"id": 384,
		"type": [
			"DRAGON",
			"FLYING"
		],
		"atk": 284,
		"def": 170,
		"hp": 213,
		"fastMoves": "Dragon Tail,Air Slash",
		"chargeMoves": "Aerial Ace,Ancient Power,Outrage",
		"legendary": true
	},{
		"name": "Deoxys Defense Forme",
		"id": 386,
		"type": [
			"PSYCHIC"
		],
		"atk": 144,
		"def": 330,
		"hp": 137,
		"fastMoves": "Zen Headbutt,Counter",
		"chargeMoves": "Rock Slide,Thunderbolt,Psycho Boost",
		"legendary": true
	},{
		"name": "Deoxys Speed Forme",
		"id": 386,
		"type": [
			"PSYCHIC"
		],
		"atk": 230,
		"def": 218,
		"hp": 137,
		"fastMoves": "Zen Headbutt,Charge Beam",
		"chargeMoves": "Thunderbolt,Swift,Psycho Boost",
		"legendary": true
	},{
		"name": "Deoxys Normal Forme",
		"id": 386,
		"type": [
			"PSYCHIC"
		],
		"atk": 345,
		"def": 115,
		"hp": 137,
		"fastMoves": "Zen Headbutt,Charge Beam",
		"chargeMoves": "Hyper Beam,Zap Cannon,Psycho Boost",
		"legendary": true
	},{
		"name": "Deoxys Attack Forme",
		"id": 386,
		"type": [
			"PSYCHIC"
		],
		"atk": 414,
		"def": 46,
		"hp": 137,
		"fastMoves": "Poison Jab,Zen Headbutt",
		"chargeMoves": "Dark Pulse,Zap Cannon,Psycho Boost",
		"legendary": true
	},{
		"name": "Togekiss",
		"id": 468,
		"type": [
			"FAIRY",
			"FLYING"
		],
		"atk": 225,
		"def": 217,
		"hp": 198,
		"fastMoves": "Air Slash,Hidden Power,Charm",
		"chargeMoves": "Flamethrower,Aerial Ace,Ancient Power,Dazzling Gleam",
		"legendary": true
	},{
		"name": "Uxie",
		"id": 480,
		"type": [
			"PSYCHIC"
		],
		"atk": 156,
		"def": 270,
		"hp": 181,
		"fastMoves": "Confusion,Extrasensory",
		"chargeMoves": "Thunder,Swift,Future Sight",
		"legendary": true
	},{
		"name": "Mesprit",
		"id": 481,
		"type": [
			"PSYCHIC"
		],
		"atk": 212,
		"def": 212,
		"hp": 190,
		"fastMoves": "Confusion,Extrasensory",
		"chargeMoves": "Blizzard,Swift,Future Sight",
		"legendary": true
	},{
		"name": "Azelf",
		"id": 482,
		"type": [
			"PSYCHIC"
		],
		"atk": 270,
		"def": 151,
		"hp": 181,
		"fastMoves": "Confusion,Extrasensory",
		"chargeMoves": "Fire Blast,Swift,Future Sight",
		"legendary": true
	},{
		"name": "Dialga",
		"id": 483,
		"type": [
			"STEEL",
			"DRAGON"
		],
		"atk": 275,
		"def": 211,
		"hp": 205,
		"fastMoves": "Dragon Breath,Metal Claw",
		"chargeMoves": "Iron Head,Thunder,Draco Meteor",
		"legendary": true
	},{
		"name": "Palkia",
		"id": 484,
		"type": [
			"WATER",
			"DRAGON"
		],
		"atk": 280,
		"def": 215,
		"hp": 189,
		"fastMoves": "Dragon Breath,Dragon Tail",
		"chargeMoves": "Fire Blast,Hydro Pump,Draco Meteor",
		"legendary": true
	},{
		"name": "Heatran",
		"id": 485,
		"type": [
			"FIRE",
			"STEEL"
		],
		"atk": 251,
		"def": 213,
		"hp": 209,
		"fastMoves": "Bug Bite,Fire Spin",
		"chargeMoves": "Flamethrower,Stone Edge,Iron Head,Fire Blast",
		"legendary": true
	},{
		"name": "Regigigas",
		"id": 486,
		"type": [
			"NORMAL"
		],
		"atk": 287,
		"def": 210,
		"hp": 221,
		"fastMoves": "Zen Headbutt,Hidden Power",
		"chargeMoves": "Thunder,Focus Blast,Giga Impact",
		"legendary": true
	},{
		"name": "Giratina Altered Forme",
		"id": 487,
		"type": [
			"GHOST",
			"DRAGON"
		],
		"atk": 187,
		"def": 225,
		"hp": 284,
		"fastMoves": "Dragon Breath,Shadow Claw",
		"chargeMoves": "Ancient Power,Shadow Sneak,Dragon Claw",
		"legendary": true
	},{
		"name": "Giratina Origin Forme",
		"id": 487,
		"type": [
			"GHOST",
			"DRAGON"
		],
		"atk": 225,
		"def": 187,
		"hp": 284,
		"fastMoves": "Shadow Claw,Dragon Tail",
		"chargeMoves": "Ominous Wind,Shadow Ball,Dragon Pulse",
		"legendary": true
	},{
		"name": "Cresselia",
		"id": 488,
		"type": [
			"PSYCHIC"
		],
		"atk": 152,
		"def": 258,
		"hp": 260,
		"fastMoves": "Psycho Cut,Confusion",
		"chargeMoves": "Moonblast,Aurora Beam,Future Sight, Grass Knot",
		"legendary": true
	},{
		"name": "Darkrai",
		"id": 491,
		"type": [
			"DARK"
		],
		"atk": 285,
		"def": 198,
		"hp": 172,
		"fastMoves": "Feint Attack,Snarl",
		"chargeMoves": "Dark Pulse,Shadow Ball,Focus Blast",
		"legendary": true
	},{
		"name": "Cobalion",
		"id": 638,
		"type": [
			"STEEL",
			"FIGHTING"
		],
		"atk": 192,
		"def": 229,
		"hp": 209,
		"fastMoves": "Metal Claw,Zen Headbutt",
		"chargeMoves": "Stone Edge,Iron Head,Close Combat",
		"legendary": true
	},{
		"name": "Terrakion",
		"id": 639,
		"type": [
			"ROCK",
			"FIGHTING"
		],
		"atk": 260,
		"def": 192,
		"hp": 209,
		"fastMoves": "Zen Headbutt,Smack Down",
		"chargeMoves": "Earthquake,Rock Slide,Close Combat",
		"legendary": true
	},{
		"name": "Virizion",
		"id": 640,
		"type": [
			"GRASS",
			"FIGHTING"
		],
		"atk": 192,
		"def": 229,
		"hp": 209,
		"fastMoves": "Quick Attack,Zen Headbutt",
		"chargeMoves": "Stone Edge,Leaf Blade,Close Combat",
		"legendary": true
	},{
		"name": "Tornadus Incarnate Forme",
		"id": 641,
		"type": [
			"FLYING"
		],
		"atk": 266,
		"def": 164,
		"hp": 188,
		"fastMoves": "Bite,Air Slash",
		"chargeMoves": "Hyper Beam,Dark Pulse,Hurricane,Grass Knot",
		"legendary": true
	},{
		"name": "Thundurus Incarnate Forme",
		"id": 642,
		"type": [
			"ELECTRIC",
			"FLYING"
		],
		"atk": 266,
		"def": 164,
		"hp": 188,
		"fastMoves": "Thunder Shock,Astonish",
		"chargeMoves": "Thunder Punch,Thunder,Brick Break,Crunch",
		"legendary": true
	},{
		"name": "Reshiram",
		"id": 643,
		"type": [
			"DRAGON",
			"FIRE"
		],
		"atk": 275,
		"def": 211,
		"hp": 205,
		"fastMoves": "Dragon Breath,Fire Fang",
		"chargeMoves": "Stone Edge,Overheat,Crunch,Draco Meteor",
		"legendary": true
	},{
		"name": "Zekrom",
		"id": 644,
		"type": [
			"DRAGON",
			"ELECTRIC"
		],
		"atk": 275,
		"def": 211,
		"hp": 205,
		"fastMoves": "Dragon Breath,Charge Beam",
		"chargeMoves": "Flash Cannon,Wild Charge,Outrage,Crunch",
		"legendary": true
	},{
		"name": "Landorus Incarnate Forme",
		"id": 645,
		"type": [
			"GROUND",
			"FLYING"
		],
		"atk": 261,
		"def": 182,
		"hp": 205,
		"fastMoves": "Mud Shot,Rock Throw",
		"chargeMoves": "Rock Slide,Focus Blast,Outrage,Earth Power",
		"legendary": true
	},{
		"name": "Genesect",
		"id": 649,
		"type": [
			"BUG",
			"STEEL"
		],
		"atk": 252,
		"def": 199,
		"hp": 174,
		"fastMoves": "Fury Cutter,Metal Claw",
		"chargeMoves": "Hyper Beam,Magnet Bomb,X-Scissor",
		"legendary": true
	}
];

var pokemonsMap = {};
pokemons.forEach(
    function(pokemon) {
        let name = pokemon.name.toLowerCase();
        pokemonsMap[name] = pokemon;
    }
);