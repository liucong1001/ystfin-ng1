/**
 * Created by peter on 2017/3/22.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/query',
        {
            controller:"transQuery",
            template:require("./html/query/query.html")
        })
}])

app.controller("transQuery",["$scope",function ($scope) {

    $scope.tableColumns = [
        {template:"{{row.archivesNo}}",title:"流水号", width:20,sortable:true,sorting:true,sortProperty:'archives_no'},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;'/>",title:"卖家照片",width:20},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;'/>",title:"卖家照片",width:20},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;'/>",title:"卖家照片",width:20},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;'/>",title:"卖家照片",width:20}
    ]


}])