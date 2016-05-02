"use strict";

angular.module("feedback.createFeedback", [
  "ngMessages",
  "ngSanitize",
  "ui.bootstrap",
  "toaster",
  "ui.router",
  "pagination-front",
  "ngStorage",
  "ng.deviceDetector"
])
.directive("dirCreateFeedback", function ($uibModal) {
    return {
        restrict : "EA",
        link     : function (scope, element, attrs) {
            element.text("Create");
            element.on("click", function () {
                $uibModal.open({
                    templateUrl: 'bower_components/feedback/modal/createfeedback/modal-feedback.html',
                    controller: "modalCreateFeedbackCtrl",
                    controllerAs: "modalCreateFeedbackCtrl",
                    size : 'lg',
                    resolve: {
                        app_version: function () {
                            return self.appVersion;
                        },
                        app_name: function () {
                            return self.appName;
                        }
                    }
                });
            });
        }
    };
});
