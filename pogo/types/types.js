var focusType = "";
var typeTab = "defending";
var displayedTypes = types.slice();

angular.module('app.types', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/types', {
        templateUrl: 'types/types.html',
        controller: 'typesController'
    })
    .when('/types/:type', {
        templateUrl: 'types/type.html',
        controller: 'typesController'
    });
}])

.controller('typesController', ['$scope', '$location', '$routeParams',
    function($scope, $location, $routeParams) {

        // enable icon tooltips
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        });

        // maintain list of which types to display
        // this is to ensure original datasource will not be mutated when types are filtered
        $scope.displayedTypes = displayedTypes;
        $scope.typeChart = typeChartByEffectiveness;
        $scope.currentTab = typeTab;

        if ($routeParams.type) {
            setType($routeParams.type);
        }

        function setType(type) {
            type = validateType(type);
            if (types.includes(type)) {
                focusType = type;
                $scope.type = type;
            }
            else {
                console.log("%s is not a valid type; going back to all types page");
                goToTypes();
            }
        }

        function validateType(type) {
            return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        }

        function goToTypes() {
            $location.path("/types");
        }

        // for setting displayed tab
        $scope.setTab = function(tab) {
            typeTab = tab;
            $scope.currentTab = typeTab;
        }

        // for filtering types
        $scope.toggleType = function(_type) {
            if (displayedTypes.includes(_type)) {
                console.log("Disabling type", _type);
                displayedTypes.splice(displayedTypes.indexOf(_type), 1);
            }
            else {
                console.log("Enabling type", _type);
                displayedTypes.push(_type);
                displayedTypes.sort();
            }
        }

        $scope.isTypeActive = function(_type) {
            return displayedTypes.includes(_type);
        }

        $scope.selectAllTypes = function() {
            displayedTypes = types.slice();
            $scope.displayedTypes = displayedTypes;
        }

        $scope.clearAllTypes = function() {
            displayedTypes = [];
            $scope.displayedTypes = displayedTypes;
        }
    }
])