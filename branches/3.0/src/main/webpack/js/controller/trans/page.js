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
        {title:"车管流水号",template:"{{row.code}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"流水号",template:"{{row.archivesNo}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"车牌号",template:"{{row.plateNumber}}",thClass:"text-center",tdClass:"text-center", width:10},
        //{title:"提档地车管所",template:"{{row.vehicleManage }}",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"状态",template:"<ng-convert code='archives_status'  value='{{row.status}}' ></ng-convert>",width:5,thClass:"text-center",tdClass:"text-center"},
        {title:"送出时间",template:"{{row.sendTime}}",width:10,thClass:"text-center",tdClass:"text-center",sortable:true,sorting:true,sortProperty:'sendTime'},
        {title:"到达时间",template:"{{row.arriveTime}}",width:10,thClass:"text-center",tdClass:"text-center",sortable:true,sorting:true,sortProperty:'arriveTime'},
        {title:"签收时间",template:"{{row.signTime}}",width:10,thClass:"text-center",tdClass:"text-center",sortable:true,sorting:true,sortProperty:'signTime'},
        {title:"商户名称",template:"{{row.dealers.loginName}}--{{row.dealers.name}}",width:20,thClass:"text-center",tdClass:"text-center"}
    ];
    //定义查询对象
    $scope.searchinfo={};
    $scope.SearchDate=function(){
        $scope.searchinfo.arriveTime=$filter('date')($scope.arriveTime,'yyyy-MM-dd ');
        $scope.ngTable.reload();
    };
    //已达到,已签收的下拉框默认选择已到达
     $scope.stat='1';

    //搜索按钮查询
    $scope.SearchTime=function(){
        $scope.searchinfo.startTime=$filter('date')($scope.startTime,'yyyy-MM-dd ');
        $scope.searchinfo.endTime=$filter('date')($scope.endTime,'yyyy-MM-dd ');
        $scope.ngTable.reload();
    };
    $scope.datetime={
        startTime:'',
        endTime:'',
        stat:''
    };

    $scope.SelectChange=function(x){
        $scope.ngTable.reload();
    };
    //导出报表web
    $scope.exportOrder = function () {
        $scope.datetime.startTime=$filter('date')($scope.startTime,'yyyy-MM-dd ');
        $scope.datetime.endTime=$filter('date')($scope.endTime,'yyyy-MM-dd ');
        $scope.datetime.stat=$scope.searchinfo.stat;
        $http({
            url: 'archives/export/excel',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            params: $scope.datetime,
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.ms-excel"});
            var objectUrl = URL.createObjectURL(blob);
            var filename="报表"+$scope.datetime.startTime+"-"+ $scope.datetime.endTime+'.xls';
            if (window.navigator.msSaveOrOpenBlob) {// For IE:
                navigator.msSaveBlob(blob, filename);
            }else{ // For other browsers:
                URL.revokeObjectURL(objectUrl);
            }
        }).error(function(data){
            alert(data.message);
        });
    };
}]);
