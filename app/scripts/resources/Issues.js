"use strict";

/**
 * Manages GitHub issue data.
 */
angular.module("GitHubApp").factory("Issues", ["$resource", "Endpoints", function ($resource, Endpoints) {
    return $resource(Endpoints.GIT_HUB_API + "repos/:owner/:repo/issues", {},
        {
            "list": {method: "GET", isArray: true},
            "details": { method: "GET", url: Endpoints.GIT_HUB_API + "repos/:owner/:repo/issues/:number"}
        });
}]);