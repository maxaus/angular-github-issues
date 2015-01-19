"use strict";

describe("Controller: IssueListCtrl", function () {

    var IssueListCtrl,
        scope,
        routeParams,
        issueServiceMock,
        repositoryServiceMock,
        utilsServiceMock;
    
    beforeEach(module("GitHubApp"));
    
    beforeEach(function () {
        repositoryServiceMock = {
            getRepository: function(owner, repo) {
                return {
                    then: function () {
                    }
                }
            }
        };

        issueServiceMock = {
            getList: function (owner, repo) {
                return {
                    then: function () {
                    }
                }
            }
        };

        utilsServiceMock = {
            showMessage: function (message, isError) {}
        };

        module(function ($provide) {
            $provide.value("IssueService", issueServiceMock);
            $provide.value("RepositoryService", repositoryServiceMock);
            $provide.value("UtilsService", utilsServiceMock);
        })
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        routeParams = {};
        spyOn(repositoryServiceMock, "getRepository").and.callThrough();
        spyOn(issueServiceMock, "getList").and.callThrough();
        spyOn(utilsServiceMock, "showMessage").and.callThrough();
        IssueListCtrl = $controller("IssueListCtrl", {
            $scope: scope,
            $routeParams: routeParams,
            IssueService: issueServiceMock,
            RepositoryService: repositoryServiceMock,
            UtilsService: utilsServiceMock
        });
    }));

    it("IssueListCtrl should be not null", function () {
        expect(!!IssueListCtrl).toBeTruthy();
    });

    it("IssueListCtrl range should be defined", function () {
        expect(scope.range).toBeDefined();
        expect(scope.range(5)).toEqual(new Array(5));
    });

    it("IssueListCtrl: searchIssues", function () {
        scope.searchIssues();
        expect(repositoryServiceMock.getRepository).toHaveBeenCalledWith(scope.owner, scope.repo);
    });

    it("IssueListCtrl: loadPage", function () {
        var page = 3;
        scope.loadPage(page);
        expect(scope.currentPage).toEqual(page);
    });

    it("IssueListCtrl: loadNextPage", function () {
        scope.currentPage = 3;
        scope.loadNextPage();
        expect(scope.currentPage).toEqual(4);
    });

    it("IssueListCtrl: loadPrevPage", function () {
        scope.currentPage = 3;
        scope.loadPrevPage();
        expect(scope.currentPage).toEqual(2);
    });
});