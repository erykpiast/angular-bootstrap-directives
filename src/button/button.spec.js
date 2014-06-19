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
        expect(element.html()).toBe('<button type="button" class="btn"></button>');
    });

});