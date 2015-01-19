'use strict';

describe('Controller: RepoDetailsCtrl', function () {

    var RepoDetailsCtrl,
        scope,
        routeParams,
        reposServiceMock;
    beforeEach(module('GitHubApp'));
    
    beforeEach(function () {
        reposServiceMock = {
            getRepoDetails: function (owner, repo) {
                return {
                    then: function () {
                    }
                }
            },
            starRepo: function(owner, repo) {
                return {
                    then: function () {
                    }
                }
            }
        };

        module(function ($provide) {
            $provide.value("ReposService", reposServiceMock);
        })
    });
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        routeParams = {};
        spyOn(reposServiceMock, "getRepoDetails").andCallThrough();
        spyOn(reposServiceMock, "starRepo").andCallThrough();
        RepoDetailsCtrl = $controller('RepoDetailsCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            ReposService: reposServiceMock
        });
    }));
    

    it("RepoDetailsCtrl should be not null", function () {
        expect(!!RepoDetailsCtrl).toBe(true);
        expect(reposServiceMock.getRepoDetails).toHaveBeenCalled();
    });

    it("RepoDetailsCtrl star repo", function () {
        scope.starRepo();
        expect(reposServiceMock.starRepo).toHaveBeenCalled();
    });
});
