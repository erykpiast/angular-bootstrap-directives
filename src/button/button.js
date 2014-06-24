angular
    .module('angular-bootstrap-directives.button', [
        'angular-bootstrap-directives.utils'
    ])
    .directive('uiButton', function (uiUtils) {
        var sizes = {
            'extra small': 'xs',
            'small': 'sm',
            'large': 'lg'
        };
        var tag = 'button';
        var attrs = new uiUtils.Attrs({
            'type': 'button',
            'class': 'btn'
        });


        return {
            restrict: 'E',
            replace: true,
            template: function(tElement, tAttrs) {
                var finalAttrs = attrs.concat(
                    tAttrs.variant && {
                        'class': tAttrs.variant.split(' ').map(function(variant) {
                            return 'btn-' + variant;
                        }).join(' ')
                    },
                    tAttrs.size && {
                        'class': 'btn-' + (sizes[tAttrs.size] || tAttrs.size) 
                    });

                var template = [
                    '<',
                    tag,
                    ' ' + finalAttrs,
                    '>',
                    uiUtils.returnIf(tAttrs.icon, '<i class="glyphicon glyphicon-' + tAttrs.icon + '"></i>'),
                    uiUtils.returnIf(tAttrs.label, '<span>' + tAttrs.label + '</span>'),
                    uiUtils.returnIf(tElement[0].childNodes.length, tElement[0].innerHTML),
                    '</',
                    tag,
                    '>'
                ].join('');

                return template;
            }
        };
    });
