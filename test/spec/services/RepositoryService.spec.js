"use strict";

describe("Service: RepositoryService", function () {

    var RepositoryService, reposMock,
        serviceResponseMock = {
            $promise: {
                then: function () {
                    return {results: []};
                }
            }
        };

    beforeEach(module("GitHubApp"));

    beforeEach(function () {
        reposMock = {
            getByOwner: function () {
                return serviceResponseMock;
            },
            details: function () {
                return serviceResponseMock;
            }
        };

        module(function ($provide) {
            $provide.value("Repositories", reposMock);
        });
    });

    beforeEach(inject(function (_RepositoryService_) {
        RepositoryService = _RepositoryService_;
        spyOn(reposMock, "getByOwner").and.callThrough();
        spyOn(reposMock, "details").and.callThrough();
    }));

    it("RepositoryService should be not null", function () {
        expect(!!RepositoryService).toBeTruthy();
    });

    it("RepositoryService should have all functions", function () {
        expect(RepositoryService.getByOwner).toBeDefined();
        expect(RepositoryService.getRepository).toBeDefined();
    });

    it("RepositoryService:getByOwner", function () {
        var owner = "owner";
        RepositoryService.getByOwner(owner);
        expect(reposMock.getByOwner).toHaveBeenCalledWith({owner: owner});
    });

    it("RepositoryService:getRepository", function () {
        var owner = "owner", repo = "repo";
        RepositoryService.getRepository(owner, repo);
        expect(reposMock.details).toHaveBeenCalledWith({owner: owner, repo: repo});
    });
});