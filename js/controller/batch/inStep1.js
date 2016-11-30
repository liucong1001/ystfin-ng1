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

app.controller("batchStep1Controller",["$scope","$http","$location","batchInStep",function ($scope,$http,$location,Step) {
	$http.get("/batch/staffs").then(function(result){
		$scope.staffs = result.data;
	});
	
	$("#staff_id").focusout(function(){
		$http.get("/batch/findTheContacts/"+$(this).val()).then(function(result){
			$scope.middleMans = result.data;
		});
	});
	
	$("#middleMan_id").focusout(function(){
		$http.get("/batch/contact/"+$(this).val()).then(function(result){
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
        var step = new Step({
            staff: $scope.staff,
            theContact: $scope.theContact,
            batchNo:$scope.batchNo
        });
        step.$save({step:"step1"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/step2");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };
	
	
}]);