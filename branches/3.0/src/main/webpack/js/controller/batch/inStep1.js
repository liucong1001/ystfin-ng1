/**
 * Created by peter on 2016/11/29.
 */
"use strict";
var app = require("../../ngcommon");

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/batch/in/step1",{
        controller:"batchStep1Controller",
        template:require("./html/in/step1.html")
    });
}]);

app.controller("batchStep1Controller",["$scope","$http","$location",function ($scope,$http,$location) {
	$http.get("/batch/staffs").then(function(result){
		$scope.staffs = result.data;
	});
	
	$("#staff_id").focusout(function(){
		$http.post("middleman/findTheContents?agencyStaffId="+$(this).val()).then(function(result){
			$scope.middleMans = result.data;
		});
	});
	
	$("#middleMan_id").focusout(function(){
		$http.get("/dealers/contact/"+$(this).val()).then(function(result){
			$scope.theContact = result.data;
		});
	});
	
	$scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + path;
    };
	
	$scope.error = function () {
        if(!this.theContact){
            return true;
        }
        return false;
    };
    
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step($scope.batch);
        step.$save({step:"step1"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/step2");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };
	
	
}]);