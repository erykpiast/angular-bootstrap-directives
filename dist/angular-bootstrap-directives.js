// ### alert.js >>

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


// ### << alert.js



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


// ### << button.js



// ### main.js >>

angular
	.module('angular-bootstrap-directives', [
		'angular-bootstrap-directives.button',
        'angular-bootstrap-directives.alert'
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



// ### templates.js >>

angular.module('angular-bootstrap-directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/alert/alert.template.html',
    "<div\n" +
    "    class=\"alert {{ animation }}\"\n" +
    "    ng-class=\"[\n" +
    "        'alert-' + (type || 'warning'),\n" +
    "        closeable ? 'alert-dismissable' : null\n" +
    "    ]\"\n" +
    "    role=\"alert\">\n" +
    "    <button\n" +
    "        ng-show=\"closeable\"\n" +
    "        type=\"button\"\n" +
    "        class=\"close\"\n" +
    "        ng-click=\"onClick()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>"
  );

}]);


// ### << templates.js


