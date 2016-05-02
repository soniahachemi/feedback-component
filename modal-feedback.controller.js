"use strict";

angular.module("feedback.createFeedback")
    .controller("modalCreateFeedbackCtrl", function ($scope, $uibModalInstance, wsFeedback, Toast, $location, app_version, app_name) {
        var self = this;

        self.app_version = app_version;
        self.app_name = app_name;

        self.message = "";

        self.type="bug";

        // self.screenshot = screenshot to submit. Value is either screenshotDef, screenshotFile or null
        self.screenshot;

        // self.screenshotFile = file uploaded by user
        self.screenshotFile;

        // self.screenshotDef = default screenshot, the one we capture
        self.screenshotDef;

        self.url = $location.absUrl();

        html2canvas( [ document.body ], {
          onrendered: function(canvas) {
              self.screenshotDef = canvas.toDataURL();
              self.screenshot = self.screenshotDef;
          }
        });

        self.close = function () {
            $uibModalInstance.close();
        };

        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        self.getSelectedFile = function(){
            return $('#selectedFile').val();
        };

        self.submitFeedback = function(){
            wsFeedback.submitFeedback({
                'message' : self.message,
                'screenshot' : self.screenshot,
                'url' : self.url,
                'app_version' : app_version,
                'app_name' : app_name,
                'type' : self.type
            })
            .then( function(id){
                self.close();
                Toast.success("Feedback submited successfully - id : "+id);
            });
        };
    })
    .service("wsSubmitFeedback", function ($q, Ws, deviceDetector, $http) {

        this.submitFeedback = function (params) {
            console.log('ghgjyuj');
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
