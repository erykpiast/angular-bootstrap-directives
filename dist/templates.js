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
