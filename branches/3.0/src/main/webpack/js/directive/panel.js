/**
 * Created by 扬 on 2016/10/8.
 */
"use strict"
module.exports = function (app) {
    app.directive("ngPanel", function () {
        return {
            template: require("./html/panel.html"),
            transclude: true,
            restrict: "AE",
            replace: true,
            scope: {
                type: "@",
                title: "@",
                footer: "@",
                body: "@"
            }
        }
    })
}
