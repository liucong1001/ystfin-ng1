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
    //获取后台缓存数据
    Step.get({step:"step1"},function(step1,header){
        $scope.step1 = step1
        console.log($scope.step1.staff);
        $scope.staff = $scope.step1.staff;
        $http.get("/batch/findTheContacts/"+$scope.staff).then(function(result){
            $scope.theContacts = result.data;
        });
        $scope.contact = $scope.step1.theContact;
        $http.get("/batch/contact/"+$scope.contact).then(function(result){
            $scope.theContact = result.data;
        });
    })
    //获取所有商户
    $http.get("/batch/staffs").then(function(result){
		$scope.staffs = result.data;
	});
	//选择商户后读取联系人列表
	$scope.getStaff = function(){
        $scope.theContact = '';
        $scope.theContacts = '';
        $scope.contact = '0';
		$http.get("/batch/findTheContacts/"+$scope.staff).then(function(result){
			$scope.theContacts = result.data;
		});
	};
	//获取联系人信息
	$scope.getContact = function(){
		$http.get("/batch/contact/"+$scope.contact).then(function(result){
			$scope.theContact = result.data;
		});
	};
	//显示图片
	$scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + path;
    };
	//判断是否可以下一步
	$scope.error = function () {
        if(!this.theContact){
            return true;
        }
        return false;
    };
    //下一步
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step({
            staff: $scope.staff,
            theContact: $scope.contact,
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