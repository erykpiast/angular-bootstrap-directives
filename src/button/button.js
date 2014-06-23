angular
    .module('angular-boostrap-directives.button', [ ])
    .directive('uiButton', function () {
        function Attrs(attrs) {
            angular.extend(this, attrs);
        }

        angular.extend(Attrs.prototype, {
            toString: function() {
                return Object.keys(this).map(function(attr) {
                    return this._dasherize(attr) + ('undefined' !== typeof this[attr] ? '="' + this[attr] + '"' : '');
                }, this).join(' ');
            },
            concat: function(attrs) {
                var res = angular.extend({ }, this);

                Object.keys(attrs).map(function(attrName) {
                    var attr = attrs[attrName];

                    if(this.hasOwnProperty(attrName)) {
                        switch(attrName) {
                            case 'class':
                                res[attrName] = this[attrName] + ' ' + attr;

                                break;
                            case 'style':
                                res[attrName] = this[attrName].replace(/;?$/, ';') + ' ' + attr;
                                
                                break;
                            default:
                                res[attrName] = attr;
                        }
                    } else {
                        res[attrName] = attr;
                    }
                }, this);

                return new Attrs(res);
            },
            // transform attribute ngTransclude to ng-transclude
            _dasherize: function(s) {
                // @source https://github.com/jprichardson/string.js
                return s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
            }
        });


        function _filter(obj, fn, context) {
            var res = { };

            Object.keys(obj).forEach(function(key) {
                if(fn.call(context, key)) {
                    res[key] = obj[key];
                }
            });

            return res;
        }


        function _if(condition, ifTrue, ifFalse) {
            if(('undefined' !== typeof condition) && (condition !== 'false')) {
                return ifTrue;
            } else {
                return ifFalse || '';
            }
        }


        var tag = 'button';
        var attrs = new Attrs({
            'type': 'button',
            'class': 'btn'
        });
        var reservedAttrs = [ '$$element', '$attr', 'transclude', 'icon', 'label', 'variant', 'size' ];
        var sizes = {
            'extra small': 'xs',
            'small': 'sm',
            'large': 'lg'
        };

        return {
            restrict: 'E',
            template: function(tElement, tAttrs) {
                var attrsToRewrite = attrs.concat(_filter(tAttrs, function(attr) {
                    return (reservedAttrs.indexOf(attr) === -1);
                }));

                if(tAttrs.variant) {
                    attrsToRewrite = attrsToRewrite.concat({
                        'class': tAttrs.variant.split(' ').map(function(variant) {
                            return 'btn-' + variant;
                        }).join(' ')
                    });
                }

                if(tAttrs.size) {
                    attrsToRewrite = attrsToRewrite.concat({
                        'class': 'btn-' + (sizes[tAttrs.size] || tAttrs.size) 
                    });
                }

                // if transclude option is omitted, but neither icon and label options are set,
                // assume that content should be transcluded
                if(('undefined' === typeof tAttrs.transclude) && !tAttrs.icon && !tAttrs.label) {
                    tAttrs.transclude = 'true';
                }

                return [
                    '<',
                    tag,
                    ' ' + attrsToRewrite,
                    _if(tAttrs.transclude, ' ng-transclude'),
                    '>',
                    _if(tAttrs.icon, '<i class="glyphicon glyphicon-' + tAttrs.icon + '"></i>'),
                    _if(tAttrs.label, '<span>' + tAttrs.label + '</span>'),
                    '</',
                    tag,
                    '>'
                ].join('');
            },
            transclude: true
        };
    });