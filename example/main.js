angular
    .module('angular-bootstrap-directives-example', [
        'angular-bootstrap-directives'
    ])
    .controller('exampleCtrl', function($scope) {
        $scope.dupa = 'Dodaj dupę';
        $scope.dupy = [{
            type: 'warning',
            msg: 'Warning dupa'
        }, {
            type: 'danger',
            msg: 'Danger dupa'
        }, {
            type: 'success',
            msg: 'Warning dupa'
        }];
        $scope.addAlert = function() {
            $scope.dupy.push({
                type: 'success',
                msg: 'Dodana dupa'
            });
        };
        $scope.closeAlert = function(index) {
            $scope.dupy.splice(index, 1);
        };
    });
