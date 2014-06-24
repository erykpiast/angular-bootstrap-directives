describe('button directive test', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('angular-bootstrap-directives.button'));

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
        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope"></button>');
    });


// label and icon >>
    it('Should produce button with label and icon', function() {
        var element = $compile('<ui-button label="Remove" icon="remove"></ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope" label="Remove" icon="remove">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '<span>Remove</span>' +
        '</button>');
    });

    it('Should produce button with label and icon resolved from scope', function() {
        $rootScope.label = 'Remove';
        $rootScope.icon = 'remove';

        var element = $compile('<ui-button label="{{ label }}" icon="{{ icon }}"></ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope" label="Remove" icon="remove">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '<span class="ng-binding">Remove</span>' +
        '</button>');
        
        delete $rootScope.label;
        delete $rootScope.icon;
    });
// << label and icon


// transclude >>
    it('Should produce simple button with label from transcluded content', function() {
        var element = $compile('<ui-button>Button label</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope">' +
            'Button label' + 
        '</button>');

    });

    it('Should produce button with label and icon from transcluded content', function() {
        $rootScope.label = 'Remove';
        $rootScope.icon = 'remove';

        var element = $compile('<ui-button>' +
            '<i class="glyphicon glyphicon-{{ icon }}"></i>' +
            '{{ label }}' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-binding ng-scope">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            'Remove' +
        '</button>');

        delete $rootScope.label;
        delete $rootScope.icon;
    });

    it('Should produce button with span element containing label and icon', function() {
        $rootScope.showSpan = true;

        var element = $compile('<ui-button>' +
            '<span ng-if="showSpan">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
                'Remove' +
            '</span>' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope">' +
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

        var element = $compile('<ui-button>' +
            '<span ng-if="showSpan">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
                'Remove' +
            '</span>' +
        '</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope">' +
            '<!-- ngIf: showSpan -->' +
        '</button>');
       
        delete $rootScope.showSpan; 
    });
// << transclude


// size and variant >>
    it('Should produce button with label in default variant and small size', function() {
        var element = $compile('<ui-button variant="default" size="small">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn btn-default btn-sm ng-scope" variant="default" size="small">' +
            'Remove' +
        '</button>');
    });

    it('Should produce button with label in default variant and small size, when size is passed as variant', function() {
        var element = $compile('<ui-button variant="default sm">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn btn-default btn-sm ng-scope" variant="default sm">' +
            'Remove' +
        '</button>');
    });
// << size and variant

// passing directives down >>
    it('Should produce button with action on click', function() {
        var clicked;

        $rootScope.action = function() { clicked = true; };

        var element = $compile('<ui-button ng-click="action($event)">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope" ng-click="action($event)">' +
            'Remove' +
        '</button>');

        element.click();

        $rootScope.$digest();

        expect(clicked).toBe(true);

        delete $rootScope.action;
    });

    it('Should produce button visible only if some variable in scope', function() {
        $rootScope.visible = true;

        var element = $compile('<ui-button ng-hide="visible">Remove</ui-button>')($rootScope);

        $rootScope.$digest();

        expect(element[0].outerHTML).toBe('<button type="button" class="btn ng-scope ng-hide" ng-hide="visible">' +
            'Remove' +
        '</button>');

        expect(element.attr('class').split(' ').indexOf('ng-hide')).toBeGreaterThan(-1);

        delete $rootScope.visible;
    });
// << passing directives down

});
