angular.module("feedback.createFeedback")
.service("wsSubmitFeedback", function ($q, Ws, deviceDetector, $http) {
       this.submitFeedback = function (params) {
            var req = {
             method: 'POST',
             url: '/ws/ws.cgi',
             data: { action: 'submitFeedback',
                        objectType : 'feedback',
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
            }
            return $http(req);
        };
    })
;
