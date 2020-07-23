var focusType = "";
var typeTab = "defending";

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

        $scope.typeChartByEffectiveness = typeChartByEffectiveness;
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
    }
])