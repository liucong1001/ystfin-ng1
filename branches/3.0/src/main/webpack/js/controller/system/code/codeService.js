/**
 * Created by Administrator on 2017/3/9 0009.
 */
/**
 * Created by Administrator on 2017/3/7 0007.
 */

"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/codeService',{
        template:require("./html/codeService.html"),
        controller:"codeServiceCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("codeServiceCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    }
    //回退上一页
    $scope.back=function(){
        history.back();
    }
    //传递code值
    $scope.codemap=$routeParams.codemap;
    //分页
    $scope.tableColumns = [
        {title:"代码集名称",template:"{{row.codemap}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"代码值",template:"{{row.code}}",thClass:"text-right",tdClass:"text-right", width:10},
        {title:"代码名称",template:"{{row.name}}",width:10,thClass:"text-right",tdClass:"text-right"},
        {title:"",template:"<a href='/ng#/system/addCodeModify?codemap={{row.codemap}}&code={{row.code}}'>修改</a>",width:10,thClass:"text-right",tdClass:"text-right"},
    ]
    $scope.rowClass = function (row) {
        switch(row.type){
            case "01":return "danger text-danger"
            case "02":return "success text-success"
            default: return "info"
        }
    }
    //保存修改信息
    $scope.save_info=function(){
        //alert("修改成功");
        console.log($scope.codeService);
        $http.post('cod/item/save',$scope.codeService).success(function(data){
            alert("数据提交成功");
        })
    }
}])