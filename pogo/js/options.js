var showOptions = true;

var maxCp = 9999;
var atkIv = 15;
var defIv = 15;
var hpIv = 15;
var showLegendaries = true;

var pokemonTypeFilter = [];
var oneTypeOnly = false;

var moveTypeFilter = "";

// stand-alone controller which is not assigned to a route
// instead, it is used on several pages which require the 'Options' dropdown
app.controller('optionsController', function($scope) {

    $scope.maxCp = maxCp;
    $scope.atkIv = atkIv;
    $scope.defIv = defIv;
    $scope.hpIv = hpIv;
    $scope.showLegendaries = showLegendaries;
    $scope.types = types;
    $scope.showOptions = showOptions;

    $scope.toggleOptions = function() {
        showOptions = !showOptions;
        $scope.showOptions = showOptions;
    }

    // set max cp
    $scope.setMaxCp = function(_maxCp) {
        maxCp = _maxCp;
        $scope.maxCp = maxCp;
    }

    // for adjusting ivs
    $scope.setAtkIv = function(iv) {
        atkIv = iv;
        $scope.atkIv = iv;
    }

    $scope.setDefIv = function(iv) {
        defIv = iv;
        $scope.defIv = iv;
    }

    $scope.setHpIv = function(iv) {
        hpIv = iv;
        $scope.hpIv = iv;
    }

    $scope.minIvs = function() {
        $scope.setAtkIv(0);
        $scope.setDefIv(0);
        $scope.setHpIv(0);
    }

    $scope.maxIvs = function() {
        $scope.setAtkIv(15);
        $scope.setDefIv(15);
        $scope.setHpIv(15);
    }

    $scope.validateMaxCp = function() {
        let maxCp = $scope.maxCp;
        if (maxCp < 0) {
            maxCp = 10;
        }
        else if (maxCp > 9999) {
            maxCp = 9999;
        }
        $scope.setMaxCp(maxCp);
    }

    $scope.validateAtkIv = function() {
        let iv = validateIv($scope.atkIv);
        $scope.setAtkIv(iv);
    }

    $scope.validateDefIv = function() {
        let iv = validateIv($scope.defIv);
        $scope.setDefIv(iv);
    }

    $scope.validateHpIv = function() {
        let iv = validateIv($scope.hpIv);
        $scope.setHpIv(iv);
    }

    function validateIv(iv) {
        if (iv < 0) {
            iv = 0;
        }
        else if (iv > 15) {
            iv = 15;
        }
        return iv;
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
    }

    $scope.isMoveTypeActive = function(type) {
        return (moveTypeFilter === type);
    }
})