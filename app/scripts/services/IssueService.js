"use strict";

/**
 * Issue data service.
 */
angular.module("GitHubApp").factory("IssueService", [
    "Issues",
    function (Issues) {
        var issueService = {};

        /**
         * Retrieves list of issues by username and repo name.
         * @param owner repo owner username
         * @param repo repo name
         * @param page page number
         * @param pageSize page size
         * @returns Promised list of issues.
         */
        issueService.getList = function (owner, repo, page, pageSize) {
            return Issues.list({owner: owner, repo: repo, page: page, per_page: pageSize}).$promise;
        };

        /**
         * Retrieves issue details.
         * @param owner repo owner username
         * @param repo repo name
         * @param number issue number
         * @returns Promised issue details.
         */
        issueService.getIssueDetails = function (owner, repo, number) {
            return Issues.details({owner: owner, repo: repo, number: number}).$promise;
        };
        
        return issueService;
    }
]);