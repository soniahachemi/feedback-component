angular.module("feedback.createFeedback")

    .service("wsSubmitFeedback", function ($q, deviceDetector, $http, Toast) {
        'use strict';

        function treatResult (result) {
            var data = result.data;

            if (data.status !== 200) {
                return treatError(result);
            }

            return data.hasOwnProperty('data') && data.data || data;
        }

        function treatError (rejection) {
            if (rejection.status === -1) {
                return $q.reject();
            }

            var error = (rejection.data && rejection.data.error) || "Unknown error";

            if (rejection.hasOwnProperty('status') && rejection.status > 0) {
                Toast.error(error);
            }

            return $q.reject(error);
        }

        function sendPostReq (opts) {
            return $http(angular.extend(opts, {
                url     : '/datacenter/tools/feedback/ws/ws.cgi',
                method  : 'post'
            }))
            .then(
                treatResult,
                treatError
            );
        }

        var objectType = "feedback",
            timeoutActions = {};

        function cancelCreateTimeout (actionName) {
            if (timeoutActions.hasOwnProperty(actionName) && angular.isFunction(timeoutActions[actionName].resolve())) {
                timeoutActions[actionName].resolve();
                delete timeoutActions[actionName];
            }
            timeoutActions[actionName] = $q.defer();
            return timeoutActions[actionName].promise;
        }

        function post (opts) {
            opts.data.objectType = objectType;

            if (!opts.noTimeout && !opts.timeout) {
                opts.timeout = cancelCreateTimeout(opts.data.action);
            }
            delete opts.noTimeout;

            return sendPostReq(opts);
        }


       this.submitFeedback = function (params) {
           return post({
                data : {
                    action  : 'submitFeedback',
                    url : params.url,
                    message : params.message,
                    screenshot : params.screenshot,
                    browser : deviceDetector.browser,
                    device : deviceDetector.device,
                    os : deviceDetector.os,
                    os_version : deviceDetector.os_version,
                    browser_version : deviceDetector.browser_version,
                    app_name : params.app_name,
                    app_version : params.app_version,
                    type : params.type
                }
            });
        };
    })
;
