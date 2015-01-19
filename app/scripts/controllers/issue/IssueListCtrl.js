"use strict";

/**
 * Controller for the page with GitHub issue list and search form.
 */
angular.module("GitHubApp")
    .controller("IssueListCtrl", ["$scope", "$routeParams", "IssueService", "RepositoryService", "UtilsService", function ($scope, $routeParams, IssueService, RepositoryService, UtilsService) {

        // Repo owner username
        $scope.owner = $routeParams.owner;
        // Repo name
        $scope.repo = $routeParams.repo;
        // Current page
        $scope.currentPage = 1;
        // Selected page size
        $scope.pageSize = 10;
        // Number of pages
        $scope.pageCount = 0;
        // Total issue count
        $scope.totalCount = 0;
        // Possible choices for page size
        $scope.pageSizeOptions = [5, 10, 20];
        // If "next" link in pagination should be disabled
        $scope.nextPageDisabled = ($scope.currentPage == $scope.pageCount);
        // Parameter indicates that issue search request is sent and no response returned yet
        $scope.searchInProgress = false;

        /**
         * Search issues by repository owner name, repo name and pagination parameters.
         */
        $scope.searchIssues = function () {
            $scope.searchInProgress = true;
            $scope.noResults = false;
            $scope.issueList = null;
            // Load repository details first to get current number of issues
            RepositoryService.getRepository($scope.owner, $scope.repo).then(function (repository) {
                $scope.totalCount = repository.open_issues_count;
                $scope.pageCount = Math.ceil($scope.totalCount / $scope.pageSize);
                // Load issue list
                IssueService.getList($scope.owner, $scope.repo, $scope.currentPage, $scope.pageSize).then(function (issueList) {
                    $scope.searchInProgress = false;
                    if (issueList && issueList.length > 0) {
                        $scope.issueList = issueList;
                    } else {
                        $scope.noResults = true
                    }
                }, function(error) {
                    $scope.searchInProgress = false;
                    var message;
                    if (error.status == 404) {
                        message = "Issues not found"
                    } else {
                        message = "Error while retrieving issue list."
                    }
                    UtilsService.showMessage(message, true);
                })
            }, function(error) {
                $scope.searchInProgress = false;
                var message;
                if (error.status == 404) {
                    message = "No repository found."
                } else {
                    message = "Error while retrieving repository details."
                }
                UtilsService.showMessage(message, true);
            });
        };

        // If repo and owner names are present in params, load issue list immediately
        if ($scope.repo && $scope.owner) {
            $scope.searchIssues();
        }

        /**
         * Returns number array of specified length
         * @param n integer number
         * @returns Number array of specified length
         */
        $scope.range = function (n) {
            return new Array(n);
        };

        /**
         * Loads page by specified page number.
         * @param pageNumber page number
         */
        $scope.loadPage = function (pageNumber) {
            $scope.currentPage = pageNumber;
            $scope.searchIssues();
        };

        /**
         * Loads next page of the list. 
         */
        $scope.loadNextPage = function () {
            $scope.currentPage++;
            $scope.searchIssues();
        };

        /**
         * Loads previous page of the list.
         */
        $scope.loadPrevPage = function () {
            $scope.currentPage--;
            $scope.searchIssues();
        };
    }]);
