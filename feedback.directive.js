"use strict";

angular.module("feedback.createFeedback", [
  "ngMessages",
  "ngSanitize",
  "ui.bootstrap",
  "toaster",
  "ng.deviceDetector"
])
.directive("dirCreateFeedback", function ($uibModal) {
    return {
        restrict : "E",
        scope : {
            appName : '@',
            appVersion : '@'
        },
        link     : function (scope, element, attrs) {
            element.text("Feedback");
            element.on("click", function () {
                $uibModal.open({
                    templateUrl: 'bower_components/feedback/modal/modal-feedback.html',
                    controller: "modalCreateFeedbackCtrl",
                    controllerAs: "modalCreateFeedbackCtrl",
                    size : 'lg',
                    resolve: {
                        app_version: function () {
                            return scope.appVersion;
                        },
                        app_name: function () {
                            return scope.appName;
                        }
                    }
                });
            });
        }
    };
});
