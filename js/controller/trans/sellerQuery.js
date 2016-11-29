/**
 * Created by 扬 on 2016/10/24.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/query',{template:require("./html/seller/sellerQuery.html")})
}])

app.controller("transSellerQuery",["$scope","$rootScope","$sce",function ($scope,$rootScope,$sce) {
    $rootScope.subTitle = "原车主查询"
    $scope.tableColumns = [
        {template:"{{row.id}}",title:"id",width:10},
        {template:"{{row.archivesNo}}",title:"流水号", width:20,sortable:true,sorting:true,sortProperty:'archivesNo'},
        {template:"<div ng-convert code='certType' value='{{row.seller.certType}}'></div>",
            title:"证件类型", width:15,sortable:true,sortProperty:'seller.certType'},
        {template:"{{row.status[0]=='1'?'已审核':'未审核'}}",title:"审核状态",widht:10,sortable:true,sortProperty:"status"},
        {template:require("./html/seller/sellerQueryTableButtons.html"),title:"",width:25}
    ]
    $scope.safeHtml = $sce.trustAsHtml
    $scope.imgPopHtml = function (path) {
        return $sce.trustAsHtml("h1llo")
    }
    $scope.rowClass = function (row) {
        return row.status[0] == '1'?'success':''
    }
}])