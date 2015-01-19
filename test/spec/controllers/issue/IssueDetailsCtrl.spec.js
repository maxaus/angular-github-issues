'use strict';

describe('Controller: IssueDetailsCtrl', function () {

    var IssueDetailsCtrl,
        scope,
        routeParams,
        issueServiceMock,
        utilsServiceMock;
    
    beforeEach(module('GitHubApp'));
    
    beforeEach(function () {
        issueServiceMock = {
            getIssueDetails: function (owner, repo) {
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
            $provide.value("UtilsService", utilsServiceMock);
        })
    });
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        routeParams = {
            owner: "owner",
            repo: "repo",
            number: 123
        };
        spyOn(issueServiceMock, "getIssueDetails").and.callThrough();
        spyOn(utilsServiceMock, "showMessage").and.callThrough();
        IssueDetailsCtrl = $controller('IssueDetailsCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            IssueService: issueServiceMock,
            UtilsService: utilsServiceMock
        });
    }));

    it("IssueDetailsCtrl should be not null", function () {
        expect(!!IssueDetailsCtrl).toBeTruthy();
        expect(scope.owner).toEqual(routeParams.owner);
        expect(scope.repo).toEqual(routeParams.repo);
        expect(issueServiceMock.getIssueDetails).toHaveBeenCalledWith(scope.owner, scope.repo, routeParams.number);
    });

    it("IssueDetailsCtrl range should be defined", function () {
        expect(scope.range).toBeDefined();
        expect(scope.range(5)).toEqual(new Array(5));
    });
});
