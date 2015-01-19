"use strict";

/**
 * Repository data service.
 */
angular.module("GitHubApp").factory("RepositoryService", [
    "Repositories",
    function (Repositories) {
        var repositoryService = {};

        /**
         * Retrieves all repositories for the user.
         * @param owner repo owner username
         * @returns Promised repo list.
         */
        repositoryService.getByOwner = function (owner) {
            return Repositories.getByOwner({owner: owner}).$promise;
        };

        /**
         * Retrieve
         * @param owner
         * @param repo
         * @returns {serviceResponseMock.$promise|*|$promise}
         */
        repositoryService.getRepository = function (owner, repo) {
            return Repositories.details({owner: owner, repo: repo}).$promise;
        };

        return repositoryService;
    }
]);
