// Helper for fetching pokemon data

// given pokemon name, return pokemon
function getPokemon(pokemonName) {
    return pokemonsMap[pokemonName.toLowerCase()];
}

function getPokemonDataWithLevel(pokemonName) {
    let pokemon = pokemonsMap[pokemonName.toLowerCase()];
    evaluateStatsWithLevel(pokemon, level, atkIv, defIv, hpIv);
    return pokemon;
}

// given an array, loads the array with the latest pokemon data
function updateAllPokemon(pokemonData) {
    console.log("Updating pokemon data with cp cap: %d, type filter: %o", cpCap, pokemonTypeFilter);
    clear(pokemonData);

    // apply filters
    applyPokemonFilters(pokemonData);
}

function clear(array) {
    while (array.length > 0) {
        array.pop();
    }
}

function applyPokemonFilters(pokemonData) {
    pokemons.forEach(
        function(pokemon) {
            if (filterPokemon(pokemon)) {
                pokemonData.push(pokemon);
            }
        }
    );
}

function filterPokemon(pokemon) {
    let pass = true;

    // apply type filter
    pass = pass && isPokemonType(pokemon, pokemonTypeFilter);

    // apply legendary filter
    pass = pass && (pokemon.legendary === showLegendaries || showLegendaries);

    return pass;
}

function isPokemonType(pokemon, typesToMatch) {
    if (typesToMatch.length === 0) {
        return true;
    }

    for (let i = 0; i < typesToMatch.length; i++) {
        let type = typesToMatch[i];
        if (!pokemon.type.includes(type)) {
            return false;
        }
        else if (oneTypeOnly && pokemon.type.length > 1) {
            return false;
        }
    }
    return true;
}