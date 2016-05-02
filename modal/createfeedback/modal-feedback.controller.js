"use strict";

angular.module("feedback.createFeedback")
    .controller("MainModalCreateFeedbackCtrl", function ($scope, $uibModalInstance, wsFeedback, Toast, $location, app_version, app_name) {
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
    }
);
