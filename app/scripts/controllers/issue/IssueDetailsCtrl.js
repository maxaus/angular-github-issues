"use strict";

/**
 * Controller for GitHub issue details page.
 */
angular.module("GitHubApp")
    .controller("IssueDetailsCtrl", ["$scope", "$routeParams", "IssueService", "UtilsService", function ($scope, $routeParams, IssueService, UtilsService) {

        // Repo owner username
        $scope.owner = $routeParams.owner;
        // Repo name
        $scope.repo = $routeParams.repo;
        // Parameter indicates that issue search request is sent and no response returned yet
        $scope.searchInProgress = true;

        /**
         * Get selected repo details
         */
        IssueService.getIssueDetails($scope.owner, $scope.repo, $routeParams.number).then(function(result) {
            $scope.issue = result;
            $scope.searchInProgress = false;
        }, function(error) {
            $scope.searchInProgress = false;
            if (error.status == 404) {
                $scope.notFound = true;
            } else {
                UtilsService.showMessage("Error while retrieving issue details.", true);
            }
        });

        /**
         * Returns number array of specified length
         * @param n integer number
         * @returns Number array of specified length
         */
        $scope.range = function (n) {
            return new Array(n);
        };
    }]);