"use strict";

angular.module("feedback.createFeedback")
.directive("dirCreateFeedback", function ($uibModal) {
    return {
        restrict : "EA",
        link     : function (scope, element, attrs) {
            element.text("Create");
            element.on("click", function () {
                $uibModal.open({
                    templateUrl: 'components/feedback/modal/createfeedback/modal-feedback.html',
                    controller: "MainModalCreateFeedbackCtrl",
                    controllerAs: "MainModalCreateFeedbackCtrl",
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
