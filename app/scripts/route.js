"use strict";

/**
 * Routing configuration of the app.
 */
angular.module("GitHubApp").config([
    "$routeProvider", 
    function ($routeProvider) {
        $routeProvider
            .when("/",
            {
                templateUrl: "/views/issue/issue_list.html",
                controller: "IssueListCtrl"
            })
            .when("/:owner/:repo",
            {
                templateUrl: "/views/issue/issue_list.html",
                controller: "IssueListCtrl"
            })
            .when("/issues/:owner/:repo/:number",
            {
                templateUrl: "/views/issue/issue_details.html",
                controller: "IssueDetailsCtrl"
            }).otherwise(
            {
                redirectTo: "/"
            });
    }
]);
