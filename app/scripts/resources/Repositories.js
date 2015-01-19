"use strict";

/**
 * Manages GitHub repositories data.
 */
angular.module("GitHubApp").factory("Repositories", ["$resource", "Endpoints", function ($resource, Endpoints) {
    return $resource(Endpoints.GIT_HUB_API + "repos", {},
        {
            "getByOwner": {method: "GET", url: Endpoints.GIT_HUB_API + "users/:owner/repos", isArray: true},
            "details": { method: "GET", url: Endpoints.GIT_HUB_API + "repos/:owner/:repo"}
        });
}]);