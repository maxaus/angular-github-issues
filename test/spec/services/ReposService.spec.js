'use strict';

describe('Service: ReposService', function () {

    var ReposService, reposMock,
        serviceResponseMock = {
            $promise: {
                then: function () {
                    return {results: []};
                }
            }
        };

    beforeEach(module('GitHubApp'));

    beforeEach(function () {
        reposMock = {
            list: function () {
                return serviceResponseMock;
            },
            details: function (owner, repo) {
                return serviceResponseMock;
            },
            star: function (owner, repo) {
                return serviceResponseMock;
            }
        };

        module(function ($provide) {
            $provide.value("Repos", reposMock);
        });
    });

    beforeEach(inject(function (_ReposService_) {
        ReposService = _ReposService_;
        spyOn(reposMock, "list").and.callThrough();
        spyOn(reposMock, "details").and.callThrough();
        spyOn(reposMock, "star").and.callThrough();
    }));

    it("ReposService should be not null", function () {
        expect(!!ReposService).toBeTruthy();
    });

    it("ReposService should have all functions", function () {
        expect(ReposService.getList).toBeDefined();
        expect(ReposService.getRepoDetails).toBeDefined();
        expect(ReposService.starRepo).toBeDefined();
    });

    it("ReposService:getList", function () {
        ReposService.getList();
        expect(reposMock.list).toHaveBeenCalled();
    });

    it("ReposService:getRepoDetails", function () {
        var owner = "owner", repo = "repo";
        ReposService.getRepoDetails(owner, repo);
        expect(reposMock.details).toHaveBeenCalledWith({owner: owner, repo: repo});
    });

    it("ReposService:starRepo", function () {
        var owner = "owner", repo = "repo";
        ReposService.starRepo(owner, repo);
        expect(reposMock.star).toHaveBeenCalledWith({owner: owner, repo: repo}, {});
    });
});