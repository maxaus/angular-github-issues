'use strict';

describe('Controller: RepoListCtrl', function () {
    
    

    var RepoListCtrl,
        scope,
        reposServiceMock;
    
    beforeEach(module('GitHubApp'));
    
    beforeEach(function () {
        reposServiceMock = {
            getList: function(owner, repo) {
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

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(reposServiceMock, "getList").andCallThrough();
        RepoListCtrl = $controller('RepoListCtrl', {
            $scope: scope,
            ReposService: reposServiceMock
        });
    }));

    it("RepoListCtrl should be not null", function () {
        expect(!!RepoListCtrl).toBe(true);
        expect(reposServiceMock.getList).toHaveBeenCalled();
    });
});