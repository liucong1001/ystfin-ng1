/**
 * Created by 10973 on 2017/7/17.
 */
/**
 * Created by 扬 on 2016/11/28.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/exchange/order",{
        controller:"codeController",
        template:require("./html/order/code.html")
    })
}])

app.controller("codeController",["$rootScope","$scope","$http","$filter","TransRecord","Order","$location",function ($rootScope,$scope,$http,$filter,TransRecord,Order,$location,) {

    $scope.users=[];
    $scope.createList=[];
    $scope.totalPrice=0;
    $scope.msg="";
    /*费用类型默认选择*/
    $scope.statuses = [
        {value:"0" , text: '请选择'},
    ];
    /*从后台回去费用类型*/
    $http.post('exchange/getTypes').then(function (result) {
        for(var i=0;i<result.data.length;i++){
             var item={
                 value:result.data[i].code,
                 text:result.data[i].name
             };
            $scope.statuses.push(item);
        }

    });

    $scope.showStatus = function(user) {
        var selected = [];
        if(user.type) {
            selected = $filter('filter')($scope.statuses, {value: user.type});
        }
        return selected.length ? selected[0].text : 'Not set';
    };


    /*点击“保存”*/
    $scope.saveUser = function(data, id,allData) {
        // console.log(JSON.parse(JSON.stringify(data)));
        // console.log(data);
        if(data.type=='0'||data.fee==null){
            console.log(data['type']);
            alert("请填写完整后保存！");
        }
        else{
            $scope.totalPrice = 0;
           console.log(data);
            console.log("id++"+id);
            $http.post('/exchange/save', data).then(function (ret) {
                console.log("结果");
                console.log(ret);
                // 计算费用
                for(var i=0;i<$scope.users.length;i++){
                    $scope.totalPrice += parseFloat($scope.users[i]['fee']);
                }


            },function (err) {
                 alert("请检查信息填写是否有误！");
            });

        }


    };
    //校验费用类型选择
    $scope.checkType=function (data) {
      if(data=='0'){
          return "请选择费用类型"
      }
    };
   // 校验金额是否输入
    $scope.checkPrice=function (data) {
        var reg=/^[0-9]+.?[0-9]*$/;
        if(data==null||!reg.test(data)){
            return "请填写正确金额"
        }
    };

    // remove user  移除
    $scope.removeUser = function(index,data) {
        console.log("移除");
        console.log(data);
        $scope.users.splice(index, 1);
        // 移除后计算费用
        $scope.totalPrice = 0;
        for(var i=0;i<$scope.users.length;i++){
            $scope.totalPrice += parseFloat($scope.users[i]['fee']);
        }
    };


    // add user
    $scope.addUser = function(item) {
        $scope.inserted = {
            id:item.id,
            code:item.code,
            codeReplace:item.code,
            // status: null,
            fee: item.fee,
            type:item.type,
            plateNumber:item.plateNumber
            // group: null
        };
        $scope.users.push($scope.inserted);
    };


        //添加一行数据
    $scope.addTable=function(code){
        if(code.length==13){
            console.log("流水号"+code);
            $http.get('exchange/findByCode?code='+code).then(function (result) {
                  var item=result.data;
                  console.log(result.data);
                  if(result.data){

                      if(result.data.orderNo){
                          // alert("该流水号已创建订单！");
                          $scope.msg='该流水号已创建订单！';
                      }else{
                          $scope.addUser(item);
                          $scope.msg='';
                      }
                  }
                  else{
                      $scope.msg='该流水号未录入!';
                      // alert("该流水号未录入!");
                  }

            },function (err) {
                console.log(err);
            })

        }
    } ;
     // 生成订单   order_no  (订单号)
    $scope.createdOrder=function () {
        console.log($scope.users);
        var reg=/^[0-9]+.?[0-9]*$/;
        for(var i=0;i<$scope.users.length;i++){
             if($scope.users[i].type=='0'||$scope.users[i].fee==null||!reg.test($scope.users[i].fee)){
                 alert("请检查订单是否填写完整！");
             }
        }

        $http.post('exchange/createOrder',{items:$scope.users}).then(function (result) {
            alert("成功创建订单！");
            console.log(result.data.id);
            var Id=result.data.id;
            // $location.path('/pay/order/:id/exchangepay').search({newNo: $scope.nextBillNo,});
            $location.path('/pay/'+Id+'/exchangepay/');

        },function (err) {
            console.log(err);
        })



    }

}])