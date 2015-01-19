"use strict";

/**
 * Service with various utility functions.
 */
angular.module("GitHubApp").factory("UtilsService", [
    function () {
        var utilsService = {};

        /**
         * Display toastr message on the page
         * @param message message text
         * @param isError if error notification or not
         */
        utilsService.showMessage = function (message, isError) {
            toastr.options.positionClass = "toast-top-full-width";
            if (isError) {
                toastr.error(message);
            } else {
                toastr.success(message);
            }
        };

        return utilsService;
    }
]);
