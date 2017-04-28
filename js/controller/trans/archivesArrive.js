/**
 * Created by peter on 2017/4/6.
 */

var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/arrive',
        {
            controller:"archivesArrive",
            template:require("./html/archives/archivesArrive.html")
        })
}])
app.controller("archivesArrive",["$scope","$location","$rootScope","Archives",function($scope,$params,$rootScope,archives){
    $rootScope.subTitle = "提档档案录入";
    $scope.records = {};
    $scope.status = {};
    $scope.plateNumber = "鄂A";
    $scope.count = 0;
    $scope.AutoSearch=function(i){
        if(GetLength(i)==8||GetLength(i)==9){
            if($scope.plateNumber){
                var record = new archives({plateNumber:$scope.plateNumber,status:"1"});
                $scope.status[$scope.plateNumber] = {text:"正在录入",css:"default"}
                record.$save().then(function () {
                    $scope.status[record.plateNumber] = {text:"已回档",css:"success"}
                    $scope.count +=1;
                },function (err) {
                    $scope.message = err.data.message;
                    $scope.status[record.plateNumber] = {text:"录入失败",css:"danger"}
                })
                $scope.records[record.plateNumber] = record
                $scope.plateNumber = "鄂A"
            }

        }
    };
     function GetLength(str){
         var realLength = 0, len = str.length, charCode = -1;
         for (var i = 0; i < len; i++) {
             charCode = str.charCodeAt(i);
             if (charCode >= 0 && charCode <= 128) realLength += 1;
             else realLength += 2;
         }
         return realLength;
     }
    $scope.cancel = function (plateNumber) {
        var record = $scope.records[plateNumber]
        if($scope.status[plateNumber].text == "已回档"){
            $scope.status[plateNumber] = {text:"正在移除...",css:"default"}
            record.status = "0";
            record.$save().then(function () {
                delete $scope.records[plateNumber]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.plateNumber] = {text:"移除失败",css:"danger"}
                $scope.message = err.data.message;
            })
        }else{
            delete $scope.records[plateNumber]
        }
    }
}])