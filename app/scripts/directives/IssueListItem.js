"use strict";

/**
 * Directive to render issue list item.
 */
angular.module("GitHubApp").directive("issueListItem", [function () {
    return {
        restrict: "E",
        templateUrl: "/views/issue/issue_list_item.html",
        transclude: true,
        scope: {}
    };
}]);