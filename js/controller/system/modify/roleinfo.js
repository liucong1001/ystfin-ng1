/**
 * Created by Administrator on 2017/3/17 0017.
 */
/**
 * Created by Administrator on 2017/3/15 0015.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/roleinfo',{
        template:require("./html/roleinfo.html"),
        controller:"roleinfoCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            roleformcheck:["$http","$route",function ($http,$route) {
                return $http.get("/rolee/toadd/" )
            }],
            roleinfo:["$http","$route",function ($http,$route) {
                return $http.get("/rolee/menuList/" + $route.current.params.id)
            }]

        }
    })
}])
app.controller("roleinfoCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http","$route","roleinfo","roleformcheck",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http,$route,roleinfo,roleformcheck) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };

    //修改详情信息
    $scope.roleinfo=roleinfo.data;
    //复选框列表
    $scope.checkboxs=roleformcheck.data;

    //$scope.id=$route.current.params.id;
    //$scope.roleinfo.id=$scope.id;

    //console.log('start');
    console.log(roleinfo.data);
    //
    //console.log($scope.roleinfo.role.name);
    //console.log($scope.roleinfo.role.type);
    //console.log($scope.checkboxs);
    //console.log('end');
    //默认选中的复选框处理

    console.log($scope.roleinfo.idList);
    $scope.isSelected = function(id){
        //console.log($scope.roleinfo.idList);
        //只要返回的结果为true，则对应的checkbox就会被选中，
        return $scope.roleinfo.idList.indexOf(id)!=-1;
    };

    $scope.save_roleinfo=function(){
        //循环遍历选中复选框
        var id_array=new Array();
        $("input[type=checkbox]").each(function(){
            if($(this).is(":checked")){
                id_array.push($(this).attr('id'));
            }
        });
        console.log(id_array);
        $scope.roleinfo.checkbox=id_array;

        console.log($scope.roleinfo);
        $scope.roleinfo.id= $scope.roleinfo.role.id;
        $scope.roleinfo.name= $scope.roleinfo.role.name;
        $scope.roleinfo.type= $scope.roleinfo.role.type;
        //delete $scope.roleinfo.role;
        //delete $scope.roleinfo.idList;

        $http.post('rolee/save',$scope.roleinfo).success(function(data){
            alert("数据提交成功");
            //$scope.back();
            $location.path('system/role');
        })
    }
}]);