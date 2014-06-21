angular
    .module('angular-boostrap-directives.button', [ ])
    .directive('uiButton', function () {
        function Attrs(attrs) {
            angular.extend(this, attrs);
        }

        angular.extend(Attrs.prototype, {
            toString: function() {
                return Object.keys(this).map(function(attr) {
                    return attr + ('undefined' !== typeof this[attr] ? '="' + this[attr] + '"' : '');
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
describe('button directive test', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('angular-boostrap-directives.button'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('Should produce simple button if any parameters were passed', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile('<ui-button></ui-button>')($rootScope);

        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toBe('<button type="button" class="btn" ng-transclude=""></button>');
    });


// label and icon >>
    it('Should produce button with label and icon', function() {
        var element = $compile('<ui-button label="Remove" icon="remove"></ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '<span>Remove</span>' +
        '</button>');
    });

    it('Should produce button with label and icon resolved from scope', function() {
        $rootScope.label = 'Remove';
        $rootScope.icon = 'remove';

        var element = $compile('<ui-button label="{{ label }}" icon="{{ icon }}"></ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '<span class="ng-binding">Remove</span>' +
        '</button>');
        
        delete $rootScope.label;
        delete $rootScope.icon;
    });
// << label and icon


// transclude >>
    it('Should produce simple button with label from transcluded content', function() {
        var element = $compile('<ui-button transclude>Button label</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn" ng-transclude="">' +
            '<span class="ng-scope">Button label</span>' + 
        '</button>');

    });

    it('Should produce button with label and icon from transcluded content', function() {
        $rootScope.label = 'Remove';
        $rootScope.icon = 'remove';

        var element = $compile('<ui-button transclude="true">' +
            '<i class="glyphicon glyphicon-{{ icon }}"></i>' +
            '{{ label }}' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn" ng-transclude="">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '<span class="ng-binding ng-scope">Remove</span>' +
        '</button>');

        delete $rootScope.label;
        delete $rootScope.icon;
    });

    it('Should produce button with span element containing label and icon', function() {
        $rootScope.showSpan = true;

        var element = $compile('<ui-button transclude="true">' +
            '<span ng-if="showSpan">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
                'Remove' +
            '</span>' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn" ng-transclude="">' +
            '<!-- ngIf: showSpan -->' +
                '<span ng-if="showSpan" class="ng-scope">' +
                    '<i class="glyphicon glyphicon-remove"></i>' +
                    'Remove' +
                '</span>' +
            '<!-- end ngIf: showSpan -->' +
        '</button>');
        
        delete $rootScope.showSpan;
    });

    it('Should produce button without content removed by directive evaluated in parent scope', function() {
        $rootScope.showSpan = false;

        var element = $compile('<ui-button transclude="true">' +
            '<span ng-if="showSpan">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
                'Remove' +
            '</span>' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn" ng-transclude="">' +
            '<!-- ngIf: showSpan -->' +
        '</button>');
       
        delete $rootScope.showSpan; 
    });
// << transclude


// size and variant >>
    it('Should produce button with label in default variant and small size', function() {
        var element = $compile('<ui-button variant="default" size="small">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn btn-default btn-sm" ng-transclude="">' +
            '<span class="ng-scope">Remove</span>' +
        '</button>');
    });

    it('Should produce button with label in default variant and small size, when size is passed as variant', function() {
        var element = $compile('<ui-button variant="default sm">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toBe('<button type="button" class="btn btn-default btn-sm" ng-transclude="">' +
            '<span class="ng-scope">Remove</span>' +
        '</button>');
    });
// << size and variant

});
