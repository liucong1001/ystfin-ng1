/**
 * Created by 扬 on 2016/10/10.
 */
"use strict"
module.exports = function (app) {
    app.directive("ngFocusThis", function () {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                attr.$observe('ngFocusThis', function (newValue) {
                    newValue === "true" && element[0].focus()
                })
            }
        }
    })
}