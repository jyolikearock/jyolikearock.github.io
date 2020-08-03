'use strict';

// set default global values
var pageSize = 10;

// enables tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Declare app level module which depends on views and core components
var app = angular.module('app', [
  'ngRoute',
  'smart-table',
  'ui.bootstrap',
  'app.pokemons',
  'app.moves',
  'app.movesets',
  'app.types'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/pokemon'});
}]);

app.run(function($rootScope) {
    $rootScope.getIconPath = function(type) {
        return "./icons/" + type.toLowerCase() + ".svg";
    }
});

// for caching objects to and from local storage
function getObject(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setObject(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

// custom smart-table directive for persisting table view across sessions (saves to local storage on client side)
app.directive('stPersist', function () {
  return {
    require: '^stTable',
    link: function (scope, element, attr, ctrl) {
      var nameSpace = attr.stPersist;

      //save the table state every time it changes
      scope.$watch(function () {
        return ctrl.tableState();
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
            localStorage.setItem(nameSpace, JSON.stringify(newValue));
        }
      }, true);

      //fetch the table state when the directive is loaded
      if (localStorage.getItem(nameSpace)) {
        var savedState = JSON.parse(localStorage.getItem(nameSpace));
        var tableState = ctrl.tableState();

        angular.extend(tableState, savedState);
        ctrl.pipe();
      }
    }
  };
});

// custom directive to listen for a broadcast message that prompts a table refresh
app.directive("refreshTable", function(){
    return {
        require:'stTable',
        restrict: "A",
        link:function(scope,elem,attr,table){
            scope.$on("refreshTable", function() {
                table.pipe();
            });
        }
    }
});

// directive for making content slideable
// thanks to https://github.com/EricWVGG/AngularSlideables
app.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.25s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = (attrs.currentState === "true");

            let toggleContent = function() {
                attrs.expanded = !attrs.expanded;
                showContent(0);
            }

            let showContent = function(delay) {
                var content = target.querySelector('.slideable_content');
                if(attrs.expanded) {
                    setTimeout(function() {
                        content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        content.style.border = 0;
                        target.style.height = y + 'px';
                    }, delay);
                } else {
                    target.style.height = '0px';
                }
            }

            showContent(100);
            element.bind('click', toggleContent);
        }
    }
});