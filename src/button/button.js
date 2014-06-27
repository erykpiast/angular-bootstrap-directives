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
            'class': 'btn'
        });


        return {
            restrict: 'E',
            replace: true,
            priority: 999, // run before everything else except ng-repeat etc.
            template: function(tElement, tAttrs) {
                var finalAttrs = attrs.concat(
                    {
                        type: uiUtils.ifAttr(tAttrs.type, '', 'button')
                    },
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
                    uiUtils.ifAttr(tAttrs.icon, '<i class="glyphicon glyphicon-' + tAttrs.icon + '"></i>'),
                    uiUtils.ifAttr(tAttrs.label, '<span>' + tAttrs.label + '</span>'),
                    uiUtils.ifAttr(tElement[0].childNodes.length, tElement[0].innerHTML),
                    '</',
                    tag,
                    '>'
                ].join('');

                return template;
            }
        };
    });
