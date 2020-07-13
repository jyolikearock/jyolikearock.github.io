// main function for fetching pokemon data
// all controllers should get pokemon data through this function
// controllers should NOT attempt to modify or access the pokemon data directly
function getPokemonData(pokemonName) {
    let pokemon = pokemonsMap[pokemonName];
    evaluateStatsWithCpCap(pokemon, maxCp, atkIv, defIv, hpIv);
    return pokemon;
}

function updatePokemonData(pokemonData) {
    clear(pokemonData);

    // apply filters
    applyPokemonFilters(pokemonData);

    // evaluate stats using max cp and iv options
    pokemonData.forEach(function(pokemon) {
        evaluateStatsWithCpCap(pokemon, maxCp, atkIv, defIv, hpIv);
    });
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