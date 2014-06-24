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
        var reservedAttrs = [ '$$element', '$attr', 'icon', 'label', 'variant', 'size' ];
        var attrs = new uiUtils.Attrs({
            'type': 'button',
            'class': 'btn'
        });


        return {
            restrict: 'E',
            replace: true,
            template: function(tElement, tAttrs) {
                var attrsToRewrite = attrs.concat(uiUtils.filterKeys(tAttrs, function(key) {
                    return (reservedAttrs.indexOf(key) === -1);
                }), tAttrs.variant && {
                    'class': tAttrs.variant.split(' ').map(function(variant) {
                        return 'btn-' + variant;
                    }).join(' ')
                }, tAttrs.size && {
                    'class': 'btn-' + (sizes[tAttrs.size] || tAttrs.size) 
                });

                var template = [
                    '<',
                    tag,
                    ' ' + attrsToRewrite,
                    '>',
                    uiUtils.returnIf(tElement[0].childNodes.length, tElement[0].innerHTML),
                    uiUtils.returnIf(tAttrs.icon, '<i class="glyphicon glyphicon-' + tAttrs.icon + '"></i>'),
                    uiUtils.returnIf(tAttrs.label, '<span>' + tAttrs.label + '</span>'),
                    '</',
                    tag,
                    '>'
                ].join('');

                return template;
            }
        };
    });
