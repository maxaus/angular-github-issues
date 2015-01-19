"use strict";

describe("Service: IssueService", function () {

    var IssueService, issuesMock,
        serviceResponseMock = {
            $promise: {
                then: function () {
                    return {results: []};
                }
            }
        };

    beforeEach(module("GitHubApp"));

    beforeEach(function () {
        issuesMock = {
            list: function () {
                return serviceResponseMock;
            },
            details: function () {
                return serviceResponseMock;
            }
        };

        module(function ($provide) {
            $provide.value("Issues", issuesMock);
        });
    });

    beforeEach(inject(function (_IssueService_) {
        IssueService = _IssueService_;
        spyOn(issuesMock, "list").and.callThrough();
        spyOn(issuesMock, "details").and.callThrough();
    }));

    it("IssueService should be not null", function () {
        expect(!!IssueService).toBeTruthy();
    });

    it("IssueService should have all functions", function () {
        expect(IssueService.getList).toBeDefined();
        expect(IssueService.getIssueDetails).toBeDefined();
    });

    it("IssueService:getList", function () {
        var owner = "owner", repo = "repo", page = 1, pageSize = 10;
        IssueService.getList(owner, repo, page, pageSize);
        expect(issuesMock.list).toHaveBeenCalledWith({owner: owner, repo: repo, page: page, per_page: pageSize});
    });

    it("IssueService:getIssueDetails", function () {
        var owner = "owner", repo = "repo", number = 233;
        IssueService.getIssueDetails(owner, repo, number);
        expect(issuesMock.details).toHaveBeenCalledWith({owner: owner, repo: repo, number: number});
    });
});
