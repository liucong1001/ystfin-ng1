/**
 * Created by Administrator on 2017/4/10 0010.
 */
var app = require("../../ngcommon");
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/sign',
        {
            controller:"archivesSign",
            template:require("./html/archives/archivesSign.html")
        })
}]);
app.controller("archivesSign",["$scope","$location","$rootScope","Archives",function($scope,$params,$rootScope,archives){
    $rootScope.subTitle = "提档档案签收";
    $scope.records = {};
    $scope.status = {};
    $scope.archivesNo = "";
    $scope.count = 0;
    $scope.plateNumber = "鄂A";
    $scope.AutoSearch=function(i){
       if($scope.plateNumber =="鄂A"){
           if(GetLength(i)==16){
               var arc = new archives();
               arc.$save({action:"findByArchivesNo",archivesNo:$scope.archivesNo}).then(function (data) {
                   $scope.plateNumber = data.plateNumber;
                   getArchives($scope.plateNumber);
               },function (err) {

               });
           }
       }else{
           if(GetLength(i)==8||GetLength(i)==9){
               getArchives($scope.plateNumber);
               $scope.plateNumber ="鄂A";
           }
       }

    };
     //获取字符串长度
    function GetLength(str){
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }

    function getArchives(arg) {
        var record = new archives({plateNumber:arg,status:"3"});
        $scope.status[$scope.plateNumber] = {text:"正在签收",css:"default"};
        record.$save().then(function () {
            $scope.status[record.plateNumber] = {text:"已签收",css:"success"};
            $scope.count +=1;
            $scope.plate_number=false;
            $scope.plateNumber = "鄂A";
        },function (err) {
            $scope.message = err.data.message;
            $scope.status[record.plateNumber] = {text:"签收失败",css:"danger"}
        })
        $scope.records[record.plateNumber] = record;
        $scope.archivesNo = "";
    }
    $scope.cancel = function (plateNumber) {
        var record = $scope.records[plateNumber]
        if($scope.status[plateNumber].text == "已签收"){
            $scope.status[plateNumber] = {text:"正在取消...",css:"default"}
            record.status = "4";
            record.$save().then(function () {
                delete $scope.records[plateNumber]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.plateNumber] = {text:"取消失败",css:"danger"}
            })
        }else{
            delete $scope.records[plateNumber]
        }
    }
    //按照车牌号查询
    $scope.plate_number=false;
    $scope.showPlate=function(){
            $scope.plate_number=true;
    };
}])