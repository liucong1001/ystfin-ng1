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
                if(converts[$scope.code]){
                    if(converts[$scope.code].$promise){
                        converts[$scope.code].$promise.then(function (result) {
                            converts[$scope.code] = result
                            $scope.convert = converts[$scope.code]
                        })
                    }else{
                        $scope.convert = converts[$scope.code]
                    }
                    return
                }
                converts[$scope.code] = $convert.get({code:$scope.code},function(result){
                    converts[$scope.code] = result
                    $scope.convert = converts[$scope.code]
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
                if(converts[$scope.code]){
                    if(converts[$scope.code].$promise){
                        converts[$scope.code].$promise.then(function (result) {
                            converts[$scope.code] = result
                            $scope.convert = converts[$scope.code]
                        })
                    }else{
                        $scope.convert = converts[$scope.code]
                    }
                    return
                }
                converts[$scope.code] = $convert.get({code:$scope.code},function(result){
                    converts[$scope.code] = result
                    $scope.convert = converts[$scope.code]
                })
            }]
        }
    })
    app.factory("$convert",["$resource",function ($res) {
        return $res("/code/convert/:code")
    }])
}

