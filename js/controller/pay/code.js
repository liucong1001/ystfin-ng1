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

app.controller("codeController",["$rootScope","$scope","$http","$filter","TransRecord","Order","$location","md5","$uibModal", "$log", "$document",function ($rootScope,$scope,$http,$filter,TransRecord,Order,$location,md5,$uibModal, $log, $document) {

    $scope.users=[];
    $scope.createList=[];
    $scope.totalPrice=0;
    $scope.msg="";
    /*费用类型默认选择*/
    $scope.statuses = [
        {value:0 , text: '请选择'},
    ];
    //得到“其他”这项费用的id

    /*从后台回去费用类型*/
    $http.post('chargeItem/findAll').then(function (result) {
         console.log(result);
        for(var i=0;i<result.data.length;i++){
            if(result.data[i].name=="其他"){ $scope.otherId=result.data[i].id}
             var item={
                 text:result.data[i].name,
                 value:result.data[i].id,
                 marketFee:result.data[i].marketFee,
                 otherFee:result.data[i].otherFee,
                 divideFee:result.data[i].divideFee,
             };
            $scope.statuses.push(item);
        }
        console.log("其他"+$scope.otherId);
        console.log("下拉框选择");
        console.log($scope.statuses);
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
        console.log("点击了保存");
        var id=data.type;
        console.log(data.type);
        data.type={
            id:id
        };
        console.log(data);
        if(data.marketFee==null||data.otherFee==null){
            alert("请填写完整后保存！");
        }
        else{
            $scope.totalPrice = 0;
            $http.post('/exchange/save', data).then(function (ret) {
                console.log(ret);
                // 计算费用
                for(var i=0;i<$scope.users.length;i++){
                    $scope.totalPrice += parseFloat($scope.users[i]['marketFee'])+parseFloat($scope.users[i]['otherFee']);
                }
            },function (err) {
                 alert("请检查信息填写是否有误！");
            });
        }
    };

    //校验费用类型选择
    $scope.checkType=function (data) {
        if(data=='0'){
            return "请选择费用类型";
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
        //console.log("移除");
        //console.log(data);
        $scope.users.splice(index, 1);
        // 移除后计算费用
        $scope.totalPrice = 0;
        for(var i=0;i<$scope.users.length;i++){
            $scope.totalPrice += parseFloat($scope.users[i]['fee']);
        }
    };

    // add user 添加
    $scope.addUser = function(item) {
        $scope.inserted = {
            id:item.id,
            code:item.code,
            codeReplace:item.code,
            marketFee: item.marketFee,
            otherFee:item.otherFee,
            divideFee:item.divideFee,
            type:item.type.id,
            plateNumber:item.plateNumber
            // group: null
        };
        for(var i in $scope.users){
            if($scope.users[i].code == $scope.inserted.code){
                $scope.msg='此流水不能重复录入！';
                return;
            }
        }
        $scope.users.push($scope.inserted);
        $scope.msg='';
    };

    //添加一行数据
    $scope.addTable=function(code){
        if(code.length==$scope.otherId){
            console.log("流水号"+code);
            $http.get('exchange/findByCode?code='+code).then(function (result) {
                var item=result.data;

                if(!item.type){
                    item.type={
                        id:0
                    };
                }else{

                }

                if(item.type.id==$scope.otherId){
                    $scope.disablelist=false;
                      $rootScope.leader=true;
                } else {
                    $scope.disablelist=true;
                      $rootScope.leader=true;
                }

                console.log(result.data);
                if(result.data){
                    if(result.data.orderNo){
                      $scope.msg='该流水号已创建订单！';
                    }else{
                      $scope.addUser(item);
                    }
                } else {
                  $scope.msg='该流水号未录入!';
                }
                $scope.code = '';
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
             if($scope.users[i].type=='0'||$scope.users[i].marketFee==null|| $scope.users[i].otherFee==null||!reg.test($scope.users[i].marketFee)||!reg.test($scope.users[i].otherFee)){
                  console.log($scope.users);
                 alert("请检查订单是否填写完整！");
             }
        }
        $http.post('exchange/createOrder',{items:$scope.users}).then(function (result) {
            var Id=result.data.id;
            $location.path('/pay/'+Id+'/exchangepay/');
        },function (err) {
            console.log(err);
        })
    }

    $scope.getPrice=function (data,index) {
        console.log("下拉框改变");
        console.log(data);
        $scope.selectId=data;
       console.log(index);
        if(data==$scope.otherId){
            $scope.disablelist=false;
              $rootScope.leader=true;
        }else{
            console.log("该出现禁用状态了");
            $scope.disablelist=true;
              $rootScope.leader=true;
        }

        for (var i = 0; i < $scope.statuses.length; i++) {
            if($scope.statuses[i].value==data){
                $scope.users[index].marketFee=$scope.statuses[i].marketFee;
                $scope.users[index].otherFee=$scope.statuses[i].otherFee;
                $scope.users[index].divideFee=$scope.statuses[i].divideFee;
            }
        }

    };

    $scope.dis=function () {
        console.log("点击了禁用状态的金额二！！！！");
        $scope.disablelist=false;
    };
    $scope.pass=function (i) {
        console.log("点击pass");
        console.log(rowform.$visible);

        console.log($scope.selectId);
       if($scope.selectId==$scope.otherId){
           $ctrl.open();
           // var pass= prompt("请输入操作密码", "");



           //
           // if (pass=='321')//如果返回的有内容
           //  {
           //       $rootScope.leader=false;
           // }else{
           //     alert("对不起！您的权限不够！");
           // }

       }

    }

    //模态框
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'sm',
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


}])

app.controller("ModalInstanceCtrl",function ($rootScope,$scope,$uibModalInstance, items,md5,$http) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
        console.log("点击ok");
        var pass=$scope.password;
        console.log(pass);
        var password = md5.createHash(pass);
        console.log(password);
        $http.post('exchange/checkPassWord?passWord='+password).then(function (result) {
            console.log(result);
            if(result.data==true){
                $rootScope.leader=false;
            }else{
                alert("对不起！您的权限不够！");
            }

        },function (err) {
            console.log(err.message);
            alert("对不起！您的权限不够！发生错误！");
        });


    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        console.log("点击取消");
    };
})