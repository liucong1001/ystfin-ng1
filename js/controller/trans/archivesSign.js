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
app.controller("archivesSign",["$scope","$location","$rootScope","Archives","$http",function($scope,$params,$rootScope,archives,$http){
    $rootScope.subTitle = "提档档案签收";
    $scope.records ={};
    $scope.status = {};
    $scope.archivesNo = "";
    $scope.Car_archivesNo="";//车管所流水号
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
    //车管所13位流水号
    $scope.AutoSearch_car=function(i){
        if(GetLength(i)==13){
            console.log("车管所流水号"+i);
            var arc = new archives();
            arc.$save({action:"findByCode",code:$scope.Car_archivesNo}).then(function (data) {
                $scope.plateNumber = data.plateNumber;
                getArchives($scope.plateNumber);
            },function (err) {

            });
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
            $scope.plateNumber = "鄂A";
        },function (err) {
            $scope.message = err.data.message;
            $scope.status[record.plateNumber] = {text:"签收失败",css:"danger"}
        });
        $scope.Car_archivesNo = "";
        $("#car_archives_no").focus();
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
    //黄牌标记

    $scope.signYellow=function(x){
        if(confirm("是否确定黄牌标记此车")){
            $http.post('/archives/yellowMark?archivesNo='+x).success(function () {

            })
        }


    }
}])
app.filter('toArray', function () {
    return function (obj, addKey) {
        if (!angular.isObject(obj)) return obj;
        if ( addKey === false ) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
        } else {
            return Object.keys(obj).map(function (key) {
                var value = obj[key];
                return angular.isObject(value) ?
                    Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
                { $key: key, $value: value };
            });
        }
    };
});

