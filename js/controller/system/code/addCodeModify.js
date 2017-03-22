/**
 * Created by Administrator on 2017/3/10 0010.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon");
var $ = require("jquery");
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/addCodeModify',{
        template:require("./html/addCodeModify.html"),
        controller:"addCodeModifyCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            addCodeinfo:["$http","$route",function ($http,$route) {
                return $http.get("/cod/item/toupd?codemap=" + $route.current.params.codemap+"&"+"code="+$route.current.params.code)
            }]

        }
    })
}]);
app.controller("addCodeModifyCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","addCodeinfo" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,addCodeinfo) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //回退上一页
    $scope.back=function(){
        history.back();
    };
    //档案管理信息
    $scope.addCodeinfo=addCodeinfo.data;
    //保存修改信息
    $scope.save_codeinfo=function(){
        console.log($scope.addCodeinfo);
        $http.post('cod/item/upd',$scope.addCodeinfo).success(function(){
            alert("数据提交成功");
            $scope.back();

        })
    }

}]);