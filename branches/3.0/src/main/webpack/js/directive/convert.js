/**
 * Created by 扬 on 2016/10/14.
 */
"use strict"
require("angular-resource")
var converts = {}
module.exports = function (app) {
    app.directive("ngConvertSelect",function () {
        return{
            restrict:"A",
            replace:false,
            template:"<option ng-if='defaultText' value='{{defaultValue}}'>{{defaultText}}</option><option ng-repeat='item in convert' value='{{item.code}}'>{{item.name}}</option>",
            scope:{
                code:"@",
                defaultText:"@",
                defaultValue:"@"
            },
            controller:["$scope","$convert",function ($scope,$convert) {
                $convert($scope.code).then(function (data) {
                    $scope.convert = data
                })
            }]
        }
    })
    app.directive("ngConvert", function () {
        return {
            restrict: "AE",
            template: "{{convert[value].name||value}}",
            replace:false,
            scope:{
                code:"@",
                value:"@"
            },
            controller:["$scope","$convert",function($scope,$convert){
                $convert($scope.code).then(function (data) {
                    $scope.convert = data
                })
            }]
        }
    })
    app.factory("$convert",["$http","$q",function ($http,$q) {
        return function (code) {
            var defer = $q.defer()
            if(converts[code]){
                return converts[code]
            }
            else{
                converts[code] = defer.promise
                $http.get("/code/convert/" + code).then(function (res) {
                    defer.resolve(res.data)
                },function (res) {
                    defer.resolve({})
                })
                return defer.promise
            }
        }
        //("/code/convert/:code")
    }])
}

