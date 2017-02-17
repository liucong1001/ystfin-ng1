/**
 * Created by 扬 on 2016/10/8.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step1',{
        controller:"transSellerStep1",
        template:require("./html/seller/sellerStep1.html"),
        resolve: {
            sessionSeller: ["$seller", "$route", function ($seller) {
                return $seller.get("/seller").$promise
            }]
        }
    })
}])

app.controller("transSellerStep1",["$scope","$rootScope","$location","$seller", "$http","$routeParams","$q","sessionSeller",
function($scope, $rootScope,$location,$seller,$http,$routeParams,$q,sessionSeller) {
    $rootScope.subTitle = "原车主录入"

    $scope.tr = sessionSeller

    if(sessionSeller && sessionSeller.theContact){
        $scope.selectedContact = sessionSeller.theContact
    }

    $scope.searchContact= function(key) {
        var d = $q.defer();
        $http.get("/contact/search",{params:{key:key}}).then(function (result) {
            d.resolve(result.data)
        },function () {
            d.reject()
        })
        return d.promise
    }
    $scope.contactList = $scope.searchContact("")

    $scope.onSubmit = function (form) {
        var seller = new $seller({theContact:$scope.selectedContact})
        seller.$save({step:'step1'}).then(function () {
            $location.path("/trans/seller/step2")
        },function (error) {
            $scope.errorMessage = error.data.message
        })
    }

}])
