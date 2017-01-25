/**
 * Created by 扬 on 2016/10/8.
 */
"use strict"

require("angular")
require("angular-route")
require("angular-animate")
require("angular-resource")
require("ng-file-upload")
require("../node_modules/angular-xeditable/dist/css/xeditable.css")
require("angular-xeditable")
require("angular-ui-bootstrap")
require("./lib/inputDropdown")
require("../css/inputDropdownStyles.css")

require("./directive/index")
require("./service/index")
var app = angular.module("sctsApp",["ngRoute","xeditable","ngResource","ngFileUpload","ngAnimate","inputDropdown","ui.bootstrap","ys.ng.ui","ys.ng.service"])

app.run(["editableOptions",function(editableOptions) {
    editableOptions.theme = 'bs3'
}])
app.config(["$locationProvider","$routeProvider", "$httpProvider",function($locationProvider,$routeProvider,$httpProvider){
    //$locationProvider.html5Mode(true)
    $httpProvider.defaults.cache = false
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {}
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0'
}])
app.filter("encodeURI",function(){
    return window.encodeURI
})
module.exports = app