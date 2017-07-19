/**
 * Created by peter on 2017/4/6.
 */

var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/exchange/create',
        {
            controller:"createCodeCtr",
            template:require("./html/order/createCode.html")
        })
}])
app.controller("createCodeCtr",[ "$scope","$http","$location","$rootScope","Archives",function($scope,$http,$params,$rootScope,archives){
    $scope.records = {};
    $scope.status = {};
    $scope.count = 0;
    $scope.AutoSearch=function(i){
        if(GetLength(i)==13){
            if($scope.code){
                var record = {code:$scope.code,payStatus:"01"};
                $scope.status[$scope.code] = {text:"正在录入",css:"default"};
                $http.post("exchange/findByCode?code="+$scope.code).then(
                    function (result) {
                        if(result.data){
                            $scope.records[record.code] = result.data;
                            $scope.status[record.code] = {text:"已录入",css:"success"};
                            $scope.code='';
                        }
                        else {
                            $http.post("exchange/save",record).then(function (ret) {
                                var result = ret.data;
                                $scope.status[record.code] = {text:"录入成功",css:"success"}
                                $scope.count +=1;
                                $scope.records[record.code] = result ;

                                console.log($scope.records);
                                $scope.code='';
                            },function (err) {
                                $scope.message = err.data.message;
                                $scope.status[record.code] = {text:"录入失败",css:"danger"};
                                $scope.code='';
                            });

                        }

                    }
                );

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
    $scope.cancel = function (code) {
        var record = $scope.records[code];
        if($scope.status[code].text == "录入成功"||$scope.status[code].text == "已录入"){
            $scope.status[code] = {text:"正在移除...",css:"default"}
            // record.status = "0";
              console.log(record.id);
               $http.post("exchange/delete/"+record.id).then(function () {
                delete $scope.records[code]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.code] = {text:"移除失败",css:"danger"}
                $scope.message = err.data.message;
            })

        }else{
            delete $scope.records[code]
        }
    }
}])

