/**
 * Created by 扬 on 2016/10/24.
 */
"use strict"
var currentUser = {isLoginIn:false}
module.exports = function (app) {
    app.directive("ngHasAnyRole", function () {
        return {
            template: "<ng-transclude ng-if='hasAnyRole()'>",
            restrict: "AE",
            replace: false,
            transclude:true,
            scope: {
                roles:"@"
            },
            controller:["$scope","$http",function($scope,$http){
                $scope.curUser = currentUser
                if(currentUser.$promise){
                    currentUser.$promise.then(function (res) {
                        currentUser = res.data
                        currentUser.isLoginIn = true
                        $scope.curUser = currentUser
                    }, function (err) {
                        currentUser = {isLoginIn: false}
                        $scope.curUser = currentUser
                    })
                }
                else if(!currentUser.isLoginIn) {
                    currentUser.$promise = $http.get("/user/current")
                    currentUser.$promise.then(function (res) {
                        currentUser = res.data
                        currentUser.isLoginIn = true
                        $scope.curUser = currentUser
                    }, function (err) {
                        currentUser = {isLoginIn: false}
                        $scope.curUser = currentUser
                    })
                }
                $scope.hasAnyRole = function () {
                    if(!$scope.roles || !$scope.curUser.isLoginIn) return false
                    var roles = $scope.roles.split(",")
                    for(var i in roles){
                        if(roles[i] === $scope.curUser.type){
                            return true
                        }
                    }
                    return false
                }
            }]
        }
    })
}