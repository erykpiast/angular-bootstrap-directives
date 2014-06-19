angular
    .module('angular-boostrap-directives.button', [ ])
    .directive('uiButton', function () {
        return {
            restrict: 'E',
            template: '<button type="button" class="btn"></button>'
        };
    });