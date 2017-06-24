/**
 * Created by peter on 2017/1/10.
 */
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/account/manager",{
        controller:"accountController",
        template:require("./html/account.html")
    });
}]);

app.controller("accountController",["$scope","$routeParams","$http","$icard","$location",function ($scope,$routeParams,$http,$icard,$location) {
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.filter = {"dealers.id":$routeParams.id};
    $scope.tableColumns = [
        {title:"卡号",template:"{{row.cardNo}}", width:15,thClass:"text-center",tdClass:"text-center"},
        {title:"商户编号",template:"{{row.dealers.loginName}}", width:8,thClass:"text-center",tdClass:"text-center"},
        {title:"商户名称",template:"{{row.dealers.name}}", width:29,thClass:"text-center",tdClass:"text-center"},
        {title:"账户余额",template:"{{row.icCard.balance / 100 | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:8},
        {title:"充值余额",template:"{{row.icCard.recharge / 100 | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:8},
        {title:"赠送余额",template:"{{row.icCard.give / 100 | currency:'￥'}}",thClass:"text-center",tdClass:"text-center", width:8},
        {title:"状态",template:"<ng-convert code='account_status' value='{{row.status}}' ></ng-convert>",thClass:"text-center",tdClass:"text-center", width:8},
        {title:"账户详情",template:"<a href='/ng#/icard/{{row.id}}/details?balance={{row.icCard.balance}}&dealersId={{row.dealers.id}}'>查看</a>",width:8,thClass:"text-center",tdClass:"text-center"},
        {title:"操作",template:"<a href='' ng-if='row.status != 02' ng-click='instance.lossCard(row.dealers.id,row.cardNo)'>挂失</a> <!--<a href='' ng-click='instance.setPwd(row.cardNo)'> 修改密码</a>--> ",width:8,thClass:"text-center",tdClass:"text-center"}
    ]
    $scope.rowClass = function (row) {
        switch(row.status){
            case "01":return "success"
            case "02":return "danger"
            default: return "info"
        }
    }

    $scope.ngTable={
        setPwd:function(cardNo){
            $location.path('/icard/setPwd').search({cardNo:cardNo});
        },
        lossCard:function (delars,cardNo) {
            if(confirm("是否确定挂失此卡片？")){
                $http.post("/icard/cardLoss",{delars:delars,cardNo:cardNo}).then(function () {
                    $scope.ngTable.reload();
                })
            }
        }
    };

}]);