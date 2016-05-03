"use strict";

angular.module("feedback.createFeedback")
.directive("fileread", function () {
    return {
        scope: {
            fileread: "="
        },
        link     : function (scope, element, attrs) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
});
