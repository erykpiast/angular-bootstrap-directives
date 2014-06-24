// ### button.js >>

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
                    tAttrs.type && {
                        'type': tAttrs.type
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


// ### << button.js



// ### main.js >>

angular
	.module('angular-bootstrap-directives', [
		'angular-bootstrap-directives.button'
	]);


// ### << main.js



// ### utils.js >>

angular
    .module('angular-bootstrap-directives.utils', [ ])
    .factory('uiUtils', function () {
        function Attrs(attrs) {
            angular.extend(this, attrs);
        }

        angular.extend(Attrs.prototype, {
            toString: function() {
                return Object.keys(this).map(function(attr) {
                    // transform attribute ngTransclude to ng-transclude
                    return dasherize(attr) + ('undefined' !== typeof this[attr] ? '="' + this[attr] + '"' : '');
                }, this).join(' ');
            },
            concat: function(/* attrs... */) {
                var attrs = Array.prototype.slice.call(arguments);

                return new Attrs(this._extend.apply(this, [ angular.extend({ }, this) ].concat(attrs)));
            },
            _extend: extendFactory(function(key, srcValue, destValue, destHasKey) {
                if(destHasKey) {
                    switch(key) {
                        case 'class':
                            return destValue + ' ' + srcValue;
                        case 'style':
                            return destValue.replace(/;?$/, ';') + ' ' + srcValue;
                        default:
                            return srcValue;
                    }
                } else {
                    return srcValue;
                }
            })
        });


        function extendFactory(processFn) {
            return function (dest /*, src... */) {
                Array.prototype.slice.call(arguments, 1).forEach(function(src) {
                    if(src && ('object' === typeof src)) {
                        Object.keys(src).forEach(function(key) {
                            dest[key] = processFn(key, src[key], dest[key], dest.hasOwnProperty(key));
                        });
                    }
                });
            
                return dest;
            };
        }


        function filterKeys(obj, fn, context) {
            var res = { };

            Object.keys(obj).forEach(function(key) {
                if(fn.call(context, key)) {
                    res[key] = obj[key];
                }
            });

            return res;
        }


        function ifAttr(condition, ifTrue, ifFalse) {
            if(('undefined' !== typeof condition) && (condition !== 'false')) {
                return ifTrue;
            } else {
                return ifFalse || '';
            }
        }


        function dasherize(s) {
            // @source https://github.com/jprichardson/string.js
            return s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
        }


        return {
            Attrs: Attrs,
            extendFactory: extendFactory,
            filterKeys: filterKeys,
            ifAttr: ifAttr,
            dasherize: dasherize
        };
    });

// ### << utils.js


