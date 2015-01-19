"use strict";

describe("Service: UtilsService", function () {

    var UtilsService;

    beforeEach(module("GitHubApp"));

    beforeEach(inject(function (_UtilsService_) {
        UtilsService = _UtilsService_;
    }));

    it("UtilsService should be not null", function () {
        expect(!!UtilsService).toBeTruthy();
    });

    it("UtilsService should have all functions", function () {
        expect(UtilsService.showMessage).toBeDefined();
    });
});