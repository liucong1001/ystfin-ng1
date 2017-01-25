/**
 * Created by 扬 on 2016/10/24.
 */
"use strict"
module.exports = function (app) {
    app.directive("ngTable", function () {
        return {
            template: require("./html/table.html"),
            restrict: "AE",
            replace: true,
            scope: {
                url: "@",
                columns:"=",
                pageSize:"=",
                filter:"=",
                rowClass:"=",
                instance:"=",
                page:"=",
                idProperty:"@"
            },
            controller:["$scope","$http","$sce",function($scope,$http,$sce){
                if(!$scope.tmplPrefix) $scope.tmplPrefix = "T" + new Date().getTime()
                $scope.idProperty = $scope.idProperty || "id"
                for(var i in $scope.columns){
                    var col = $scope.columns[i]
                    //$tpc.put($scope.tmplPrefix + "-" + i,col.template)
                    if(col.sorting){
                        $scope.sortArray = [col.sortProperty + "," + (col.sortAsc?"asc":"desc"),$scope.idProperty + ",asc"]
                    }
                }
                $scope.sort = function (col) {
                    if(!col.sortable) return
                    for(var i in $scope.columns){
                        $scope.columns[i].sorting = false
                    }
                    col.sortAsc = !col.sortAsc
                    col.sorting = true
                    $scope.sortArray = [col.sortProperty + "," + (col.sortAsc?"asc":"desc")]
                    $scope.sortArray.push($scope.idProperty + ",asc")
                    $scope.goto($scope.page)
                }
                $scope.goto = function (page) {
                    $scope.page = page
                    var params = angular.extend({"p:page":$scope.page,"p:size":$scope.pageSize,"p:sort":$scope.sortArray},$scope.filter)
                    $http({method:"GET",url:$scope.url,params:params}).then(function(result){
                        $scope.totalRows = result.data.totalElements
                        $scope.content = result.data.content
                    },function (err) {

                    })
                }
                $scope.instance = $scope.instance || {}
                $scope.instance.reload = function () {
                    $scope.goto(0)
                }
                $scope.goto($scope.page)
                /*
                $scope.tmpl = function (index) {
                    return $scope.tmplPrefix + "-" + index
                }*/
                $scope.totalPages = function () {
                    return parseInt($scope.totalRows / $scope.pageSize) + ($scope.totalRows % $scope.pageSize?1:0)
                }
                $scope.prev = function () {
                    if($scope.page < 1) return
                    $scope.goto($scope.page-1)
                }
                $scope.next = function () {
                    if($scope.page >= $scope.totalPages() - 1){
                        return
                    }
                    $scope.goto($scope.page+1)
                }
                $scope.pageButtons = function () {
                    var btns = []
                    var total = $scope.totalPages()
                    var start = $scope.page - 4
                    var size = 10
                    if(start < 1){
                        start = 1
                    }
                    if(size + start > total + 1){
                        if(total < 10) {
                            start = 1
                            size = total
                        }else{
                            start = total - 10 + 1
                        }
                    }

                    for(var i = start; i < start + size; i++){
                        btns.push(i)
                    }
                    return btns
                }
            }]
        }
    })
}