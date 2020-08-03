var showOptions = true;

var cpCap = parseInt(localStorage.getItem("pogoCpCap"));
if (!cpCap) {
    cpCap = 9999;
}
var showLegendaries = true;

var pokemonTypeFilter = [];
var oneTypeOnly = false;

var moveTypeFilter = "";

// stand-alone controller which is not assigned to a route
// instead, it is used on several pages which require the 'Options' dropdown
app.controller('optionsController', function($scope) {

    $scope.cpCap = cpCap;
    $scope.showLegendaries = showLegendaries;
    $scope.types = types;
    $scope.showOptions = showOptions;

    $scope.getShowOptions = function() {
        return showOptions;
    }

    $scope.toggleOptions = function() {
        showOptions = !showOptions;
        $scope.showOptions = showOptions;
    }

    // for controlling cp cap
    $scope.setCpCap = function(_cpCap) {
        cpCap = _cpCap;
        $scope.cpCap = cpCap;
        localStorage.setItem("pogoCpCap", _cpCap);
    }

    // toggles legendaries
    $scope.setShowLegendaries = function(bool) {
        showLegendaries = bool;
        $scope.showLegendaries = bool;
    }

    // pokemon type filter
    $scope.updatePokemonTypeFilter = function(type) {
        let index = pokemonTypeFilter.indexOf(type);

        // if filter already contains type,
        // change filter type to single-type only (if filter only contains this type)
        // or remove this type from filter
        if (index > -1) {
            if (oneTypeOnly || pokemonTypeFilter.length === 2) {
                pokemonTypeFilter.splice(index, 1);
                oneTypeOnly = false;
            }
            else {
                oneTypeOnly = true;
            }
        }
        // if filter does not contain type,
        // if filter is already full (2 types), clear it, and set it to this type
        // or simply add this type to filter
        else {
            if (pokemonTypeFilter.length === 2 || oneTypeOnly) {
                pokemonTypeFilter = [];
            }
            pokemonTypeFilter.push(type);
            oneTypeOnly = false;
        }
    }

    $scope.isPokemonTypeActive = function(type) {
        return (pokemonTypeFilter.indexOf(type) > -1);
    }

    // move type filter
    $scope.updateMoveTypeFilter = function(type) {
        if (moveTypeFilter === type) {
            moveTypeFilter = "";
        }
        else {
            moveTypeFilter = type;
        }
        console.log("filtering moves with type: " + moveTypeFilter);
    }

    $scope.isMoveTypeActive = function(type) {
        return (moveTypeFilter === type);
    }
})