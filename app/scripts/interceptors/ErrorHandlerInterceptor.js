"use strict";

/**
 * General interceptor to handle server request errors.
 */
angular.module("GitHubApp").factory("ErrorHandlerInterceptor", ["$q", function ($q) {

    // this message will appear for a defined amount of time and then vanish again
    var showMessage = function (content) {
        toastr.options.positionClass = "toast-top-full-width";
        toastr.error(content, "Error!");
    };
    return function (promise) {
        return promise.then(function (successResponse) {
                return successResponse;
            },
            // if the message returns unsuccessful we display the error
            function (errorResponse) {
                switch (errorResponse.status) {
                    case 400:
                        showMessage("A required attribute of the API request is missing");
                        break;
                    case 401:
                        showMessage("User is not authorized");
                        break;
                    case 403:
                        showMessage("The request is not allowed");
                        break;
                    case 404:
                        showMessage("A resource could not be accessed");
                        break;
                    case 405:
                        showMessage("The request is not supported");
                        break;
                    case 500:
                        showMessage("While handling the request something went wrong on the server side");
                        break;
                    default:
                        showMessage("Unexpected error");
                }
                return $q.reject(errorResponse.data);
            });
    };
}]);