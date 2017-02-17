/**
 * Created by 扬 on 2017/2/6.
 */
"use strict"
module.exports = function (app) {
    app.directive("ngImageUpload", function () {
        return {
            template: require("./html/imageUpload.html"),
            transclude: true,
            restrict: "AE",
            replace: true,
            scope: {
                title: "@",
                path:"=",
                uploaded:"&",
                snapshot:"&"
            }
        }
    })
}