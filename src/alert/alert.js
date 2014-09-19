angular
    .module('angular-bootstrap-directives.alert', ['ngAnimate'])
    .directive('uiAlert', function() {
        return {
            restrict: 'E',
            controller: 'uiAlertController',
            transclude: true,
            replace: true,
            scope: {
                type: '@',
                close: '&',
                animation: '@'
            },
            templateUrl: 'src/alert/alert.template.html'
        };
    })
    .controller('uiAlertController', ['$scope', '$attrs',
        function($scope, $attrs) {
            $scope.closeable = 'close' in $attrs;

            $scope.onClick = function() {
                $scope.close();
            };
        }
    ]);
