/**
 * Created by Administrator on 2017/4/10 0010.
 */
/**
 * Created by Administrator on 2017/3/3 0003.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/page',{
        template:require("./html/archives/page.html"),
        controller:"pageCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("pageCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };

    $scope.tableColumns = [
        {title:"流水号",template:"{{row.archivesNo}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"车牌号",template:"{{row.plateNumber}}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"提档地车管所",template:"{{row.vehicleManage }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"状态",template:"<ng-convert code='archives_status'  value='{{row.status}}' ></ng-convert>",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"到达时间",template:"{{row.arriveTime}}",width:20,thClass:"text-center",tdClass:"text-center"},
        {title:"签收时间",template:"{{row.signTime}}",width:20,thClass:"text-center",tdClass:"text-center"},
        {title:"商户名称",template:"{{row.dealers.name}}",width:10,thClass:"text-center",tdClass:"text-center"}
    ];
    //定义查询对象
    $scope.searchinfo={};
    $scope.SearchDate=function(time){
        $scope.searchinfo.arriveTime=$filter('date')(time,'yyyy-MM-dd ');
        console.log($scope.searchinfo.arriveTime);
        $scope.ngTable.reload();
    };
}]);
