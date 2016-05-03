"use strict";

angular.module("feedback.createFeedback")
    .controller("modalCreateFeedbackCtrl", function ($scope, $uibModalInstance, wsSubmitFeedback, Toast, $location, app_version, app_name) {
        var self = this;

        self.message = "";

        self.type="bug";

        // self.screenshot = screenshot to submit. Value is either screenshotDef, screenshotFile or null
        self.screenshot;

        // self.screenshotFile = file uploaded by user
        self.screenshotFile;

        // self.screenshotDef = default screenshot, the one we capture
        self.screenshotDef;

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
            wsSubmitFeedback.submitFeedback({
                'message' : self.message,
                'screenshot' : self.screenshot,
                'url' : $location.absUrl(),
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
;
