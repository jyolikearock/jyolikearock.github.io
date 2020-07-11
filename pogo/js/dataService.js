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

    // apply type filter
    applyPokemonTypeFilter(pokemonData);

    // apply max CP and IV options
    pokemonData.forEach(function(pokemon) {
        evaluateStatsWithCpCap(pokemon, maxCp, atkIv, defIv, hpIv);
    });
}

function applyPokemonTypeFilter(pokemonData) {
    pokemons.forEach(
        function(pokemon) {
            if (isPokemonType(pokemon, pokemonTypeFilter)) {
                pokemonData.push(pokemon);
            }
        }
    );
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

function clear(array) {
    while (array.length > 0) {
        array.pop();
    }
}