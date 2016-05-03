angular.module("feedback.createFeedback")

    .service("wsFeedback", function ($q, deviceDetector, $http) {
        'use strict';

        var self = this;

        var WsPath = '/datacenter/tools/feedback/ws/';

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

        function operation (opts) {

            if (!~opts.url.indexOf(WsPath)) {
                opts.url = WsPath + opts.url;
            }

            return $http(opts).then(
                treatResult,
                treatError
            );
        }

        angular.forEach(['get', 'post'], function (op) {
            self[op] = function (url, opts) {
                return operation(angular.extend(opts, {
                    url     : url,
                    method  : op
                }));
            };
        });
    })


    .service("wsSubmitFeedback", function ($q, deviceDetector, $http, wsFeedback) {

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

        function get (opts) {
            opts.params.objectType = objectType;

            if (!opts.noTimeout && !opts.timeout) {
                opts.timeout = cancelCreateTimeout(opts.params.action);
            }
            delete opts.noTimeout;

            return wsFeedback.get('ws.cgi', opts);
        }

        function post (opts) {
            opts.data.objectType = objectType;

            if (!opts.noTimeout && !opts.timeout) {
                opts.timeout = cancelCreateTimeout(opts.data.action);
            }
            delete opts.noTimeout;

            return wsFeedback.post('ws.cgi', opts);
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
