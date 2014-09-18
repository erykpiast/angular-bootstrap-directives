describe('alert directive test', function() {
    var $compile;
    var $rootScope;

    // Load the templates module
    beforeEach(module('templates'));

    beforeEach(module('angular-bootstrap-directives.alert'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));


    var findCloseButton = function(element) {
        return element.find('button');
    };

    it('Should produce warning alert if any parameters were passed', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile('<ui-alert></ui-alert>')($rootScope);

        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains correct classes
        expect(element.hasClass('alert-warning')).toBe(true);
        expect(findCloseButton(element).hasClass('close')).toBe(true);
        expect(findCloseButton(element).hasClass('ng-hide')).toBe(true);
    });

    it('Should produce correct classes for different alert types', function() {

        $rootScope.alerts = [{
            msg: 'Default message'
        }, {
            msg: 'Danger message',
            type: 'danger'
        }, {
            msg: 'Success message',
            type: 'success'
        }];


        var element = $compile('<div><ui-alert ng-repeat="alert in alerts" type="{{alert.type}}"></ui-alert></div>')($rootScope);
        $rootScope.$digest();

        //find all alerts
        var alerts = element.find('.alert');

        // Check that alerts contains correct classes
        expect(alerts.eq(0).hasClass('alert-warning')).toBe(true);
        expect(alerts.eq(1).hasClass('alert-danger')).toBe(true);
        expect(alerts.eq(2).hasClass('alert-success')).toBe(true);
    });

    it('Should produce alert with ngAnimation class', function() {
        var element = $compile('<ui-alert animation="fade-in-out"></ui-alert>')($rootScope);
        $rootScope.$digest();

        //check that alert div has fade-in-out class
        expect(element.hasClass('fade-in-out')).toBe(true);
    });

    it('Should produce alert content', function() {
        var element = $compile('<ui-alert>Test message</ui-alert>')($rootScope);
        $rootScope.$digest();

        //check alert content
        expect(element.find('div[ng-transclude] span').text()).toBe('Test message');
    });

    it('Should show close button', function() {
        var element = $compile('<ui-alert close="true"></ui-alert>')($rootScope);
        $rootScope.$digest();

        expect(findCloseButton(element).hasClass('ng-hide')).toBe(false);
    });

    it('Should fire callback when close button clicked', function() {
        var clicked;
        $rootScope.action = function() {
            clicked = true;
        };

        var element = $compile('<ui-alert type="danger" close="action()"></ui-alert>')($rootScope);
        $rootScope.$digest();

        findCloseButton(element).click();

        expect(clicked).toBe(true);
    });

});
